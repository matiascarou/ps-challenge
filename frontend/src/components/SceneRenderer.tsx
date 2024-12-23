import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Points from "./Points";
import Cuboids from "./Cuboids";
import { ISelectedScene } from "../types";
import "../App.css";

interface ISceneRendererProps {
  isFetchingAmountOfFrames: boolean;
  selectedScene: ISelectedScene | null;
}

const SceneRenderer = ({
  selectedScene,
  isFetchingAmountOfFrames,
}: ISceneRendererProps) => {
  if (!selectedScene) {
    return;
  }

  if (isFetchingAmountOfFrames) {
    return <div className="sceneLoader">Getting Available Frames...</div>;
  }

  if (selectedScene.loading) {
    return <div className="sceneLoader">Loading Frame...</div>;
  }

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
        <Cuboids cuboids={selectedScene.data.cuboids} />
        <Points points={selectedScene.data.points} />
      </Canvas>
    </div>
  );
};

export default SceneRenderer;
