import { useMemo } from "react";
import { Html } from "@react-three/drei";
import _ from "lodash";
import "../App.css";
import { ICuboid } from "../types";

interface ICuboidMetadata {
  cuboid: ICuboid;
}

const CuboidMetadata = ({ cuboid }: ICuboidMetadata) => {
  if (!cuboid) {
    return;
  }

  const metadata = useMemo(() => {
    const keysToRender = ["uuid", "label", "sensorId"];
    const pickedKeys = _.pick(cuboid, keysToRender);
    return Object.entries(pickedKeys);
  }, [cuboid]);

  return (
    <Html
      position={[
        cuboid.positions[0],
        cuboid.positions[1] + cuboid.dimensions[1] / 2 + 1,
        cuboid.positions[2],
      ]}
    >
      <div className="cuboidMetadata">
        {metadata.map(([key, value], index) => {
          return (
            <p key={`${index}_${value}`}>
              {key}: {value}
            </p>
          );
        })}
      </div>
    </Html>
  );
};

export default CuboidMetadata;
