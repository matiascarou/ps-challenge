import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Points from "./Points";
import CuboidsTest from "./Cuboids";
import { TSceneData } from "../types";

interface ISceneRenderer {
  data: TSceneData;
}

const SceneRenderer = ({ data }: ISceneRenderer) => {
  return (
    <div>
      <Canvas
        style={{ width: "100vw", height: "100vh", pointerEvents: "auto" }}
      >
        <PerspectiveCamera makeDefault position={[0, -50, 40]} fov={60} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          panSpeed={1}
          zoomSpeed={1}
          rotateSpeed={1}
          minDistance={1}
          maxDistance={200}
        />
        <ambientLight intensity={0.8} />
        <CuboidsTest cuboids={data.cuboids} />
        <Points points={data.points} />
      </Canvas>
    </div>
  );
};

export default SceneRenderer;
