import { useEffect, useRef, memo } from "react";
import { Matrix4, Color, InstancedBufferAttribute, InstancedMesh } from "three";
import _ from "lodash";

interface IInstancedPoints {
  points: number[][];
}

const InstancedPoints = ({ points }: IInstancedPoints) => {
  const meshRef = useRef<InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) {
      return;
    }

    const mesh = meshRef.current;
    // meshRef.current.layers.set(1);
    const matrices = new Float32Array(points.length * 16);
    const colors = new Float32Array(points.length * 3);
    const tempMatrix = new Matrix4();

    const zValues = points.map((point) => point[2]);

    const minZ = _.min(zValues) ?? 0;
    const maxZ = _.max(zValues) ?? 0;

    const colorMin = new Color(1, 1, 1);
    const colorMax = new Color(1, 1, 0);

    points.forEach((point, i) => {
      tempMatrix.makeTranslation(point[0], point[1], point[2]);
      tempMatrix.toArray(matrices, i * 16);

      const normalizedZ = (point[2] - minZ) / (maxZ - minZ);

      const color = colorMin.clone().lerp(colorMax, normalizedZ);
      colors.set(color.toArray(), i * 3);
    });

    mesh.instanceMatrix.array.set(matrices);
    mesh.instanceMatrix.needsUpdate = true;

    /*
     * Set color based on height
     */
    mesh.geometry.setAttribute(
      "color",
      new InstancedBufferAttribute(colors, 3)
    );
  }, [points]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, points.length]}
      matrixAutoUpdate={false}
      frustumCulled={true}
    >
      <sphereGeometry args={[0.1, 2, 2]} />
      <meshStandardMaterial vertexColors={true} />
    </instancedMesh>
  );
};

export default memo(InstancedPoints);
