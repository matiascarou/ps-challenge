import { useEffect, useRef } from "react";
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
    const colors = new Float32Array(points.length * 3); // RGB for each point
    const tempMatrix = new Matrix4();

    // Determine the Z range
    const zValues = points.map((point) => point[2]);

    const minZ = _.min(zValues) ?? 0; // Get the minimum value
    const maxZ = _.max(zValues) ?? 0; // Get the maximum value

    // Define the gradient extremes
    const colorMin = new Color(1, 1, 1); // White
    const colorMax = new Color(1, 1, 0); // Red

    points.forEach((point, i) => {
      tempMatrix.makeTranslation(point[0], point[1], point[2]);
      tempMatrix.toArray(matrices, i * 16);

      const normalizedZ = (point[2] - minZ) / (maxZ - minZ);

      // const color = new Color().setHSL(normalizedZ * 0.7, 1, 0.5); // Hue changes with height
      const color = colorMin.clone().lerp(colorMax, normalizedZ);
      colors.set(color.toArray(), i * 3); // Set RGB values
    });

    mesh.instanceMatrix.array.set(matrices);
    mesh.instanceMatrix.needsUpdate = true;

    // Attach colors
    mesh.geometry.setAttribute(
      "color",
      new InstancedBufferAttribute(colors, 3) // RGB values
    );
  }, [points]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, points.length]} // Geometry, material, and count
      matrixAutoUpdate={false} // Prevent constant updates
      frustumCulled={true} // Cull objects outside the view
    >
      <sphereGeometry args={[0.1, 4, 4]} />
      <meshStandardMaterial vertexColors={true} />
    </instancedMesh>
  );
};

export default InstancedPoints;
