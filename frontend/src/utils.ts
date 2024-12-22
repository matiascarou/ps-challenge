import _ from "lodash";

export const mapCursor = (cursor: number) => {
  return cursor.toString().padStart(2, "0");
};

// TODO: make this better & move it to the backend
export const mapCuboidsData = (cuboids: any) => {
  return cuboids.map((cuboid: any) => {
    const keysToOmit = [
      "dimensions.x",
      "dimensions.y",
      "dimensions.z",
      "position.x",
      "position.y",
      "position.z",
      "cuboids.sibling_id",
      "cuboids.sensor_id",
    ];

    const dimensions = [
      cuboid["dimensions.x"],
      cuboid["dimensions.y"],
      cuboid["dimensions.z"],
    ];

    const positions = [
      cuboid["position.x"],
      cuboid["position.y"],
      cuboid["position.z"],
    ];

    return {
      ..._.omit(cuboid, keysToOmit),
      dimensions,
      positions,
      siblingId: cuboid["cuboids.sibling_id"],
      sensorId: cuboid["cuboids.sensor_id"],
      cameraUsed: cuboid["camera_used"],
    };
  });
};
