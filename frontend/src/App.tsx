import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { TSceneData } from "./types";
import { mapCursor } from "./utils";
import { MIN_CURSOR_VALUE, MAX_CURSOR_VALUE } from "./constants";
import SceneRenderer from "./components/SceneRenderer";
import _ from "lodash";

const App = () => {
  const [sceneCursor, setSceneCursor] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [keyedScenes, setKeyedScenes] = useState<Record<number, TSceneData>>({});

  const getSceneData = useCallback(
    async (sceneCursor: number) => {
      try {
        const paddedCursorValue = mapCursor(sceneCursor);

        if (!keyedScenes[sceneCursor]) {
          const res = await fetch(
            `https://static.scale.com/uploads/pandaset-challenge/frame_${paddedCursorValue}.json`,
            { method: "GET" }
          );

          if (!res.ok) {
            setError("Failed to fetch scene data");
            return;
          }

          const data = await res.json();

          data.cuboids = data.cuboids.map((cuboid: any) => {
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

          setKeyedScenes((prev: any) => ({ ...prev, [sceneCursor]: data }));
        }

        return keyedScenes[sceneCursor];
      } catch (error) {
        console.error("Error fetching scene data:", error);
      }
    },
    [sceneCursor]
  );

  useEffect(() => {
    getSceneData(sceneCursor);
  }, [sceneCursor, getSceneData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value >= MIN_CURSOR_VALUE && value <= MAX_CURSOR_VALUE) {
      setSceneCursor(value);
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div className="mainDiv">
        <input
          type="number"
          value={sceneCursor}
          onChange={(e) => handleInputChange(e)}
          className="input-field"
          onFocus={(e) => e.stopPropagation()} // Stop propagation to Canvas
        />
      </div>
      {!error && !!keyedScenes[sceneCursor] && (
        <SceneRenderer data={keyedScenes[sceneCursor]} />
      )}
    </div>
  );
};

export default App;
