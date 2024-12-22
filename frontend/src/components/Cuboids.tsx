import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import {
  Matrix4,
  Color,
  InstancedBufferAttribute,
  Vector3,
  Euler,
  InstancedMesh,
} from "three";
import _ from "lodash";
import "../App.css";
import CuboidMetadata from "./CuboidMetadata";
import { ICuboid } from "../types";

interface ICuboids {
  cuboids: ICuboid[];
}

const Cuboids = ({ cuboids }: ICuboids) => {
  const meshRef = useRef<InstancedMesh>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!meshRef.current) {
      return;
    }

    const mesh = meshRef.current;
    // meshRef.current.layers.set(1); // Attempt to resolve the tooltip, but it doesn't seems to work
    const matrices = new Float32Array(cuboids.length * 16);
    const colors = new Float32Array(cuboids.length * 3);
    const tempMatrix = new Matrix4();

    cuboids.forEach((cuboid, i) => {
      const { positions, dimensions } = cuboid;

      const rotation = cuboid.yaw;
      const [x, y, z] = positions;
      const [width, height, depth] = dimensions;

      tempMatrix.makeTranslation(x, y, z);
      const rotationMatrix = new Matrix4();
      rotationMatrix.makeRotationFromEuler(new Euler(0, 0, rotation));
      tempMatrix.multiply(rotationMatrix);
      tempMatrix.scale(new Vector3(width, height, depth));
      tempMatrix.toArray(matrices, i * 16);

      /*
       * Set colors based on the hovered index for showing extra metadata
       */
      const color =
        hoveredIndex === i ? new Color(1, 0, 0) : new Color(1, 1, 1);

      colors.set(color.toArray(), i * 3);
    });

    mesh.instanceMatrix.array.set(matrices);
    mesh.instanceMatrix.needsUpdate = true;

    mesh.geometry.setAttribute(
      "color",
      new InstancedBufferAttribute(colors, 3)
    );
  }, [cuboids, hoveredIndex]);

  /*
   * TODO: Fix jitter due to layer overlap between cuboids and points
   */
  const handlePointerOut = useCallback(
    _.debounce((e) => {
      if (!e.intersections.length) {
        setHoveredIndex(null);
      }
    }, 500),
    []
  );

  const handlePointerMove = (e: any) => {
    setHoveredIndex(e.instanceId);
  };

  const selectedCuboid = useMemo(() => {
    if (!hoveredIndex) {
      return null;
    }

    return cuboids[hoveredIndex];
  }, [cuboids, hoveredIndex]);

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, cuboids.length]}
        matrixAutoUpdate={false}
        frustumCulled={true}
        onPointerOut={handlePointerOut}
        onPointerMove={handlePointerMove}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors={true} />
      </instancedMesh>
      {!!selectedCuboid && <CuboidMetadata cuboid={selectedCuboid} />}
    </>
  );
};

export default memo(Cuboids);
