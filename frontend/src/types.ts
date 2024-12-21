export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface Cuboid {
  uuid: string;
  label: string;
  yaw: number;
  stationary: boolean;
  camera_used: number;
  position: [number, number, number];
  dimensions: [number, number, number];
  sibling_id: string;
  sensor_id: number;
}

export type TSceneData = {
  frame_id: number;
  points: number[][];
  cuboids: ICuboid[];
};

export interface ICuboid {
  uuid: string;
  label: string;
  yaw: number;
  stationary: boolean;
  camera_used: number;
  positions: number[];
  dimensions: number[];
  siblingId: string;
  sensorId: number;
}

// Will go in the server side
type TRawCuboidPositions = {
  "position.x": number;
  "position.y": number;
  "position.z": number;
};

type TRawCuboidDimensions = {
  "dimensions.x": number;
  "dimensions.y": number;
  "dimensions.z": number;
};
