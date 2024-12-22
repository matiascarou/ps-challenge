import { useState, useEffect, useCallback } from "react";
import "../App.css";
import { TSceneData } from "../types";
import { mapCuboidsData } from "../utils";
import {
  MIN_CURSOR_VALUE,
  MAX_CURSOR_VALUE,
  PROJECT_NAME,
  BASE_URL,
} from "../constants";
import SceneRenderer from "../components/SceneRenderer";
import { useGetAmountOfFrames } from "../hooks/useGetAmountOfFrames";
import _ from "lodash";

interface IMainSceneProps {
  token: string;
  setToken: (token: string | null) => void;
}

export const MainScene = ({ token, setToken }: IMainSceneProps) => {
  const [sceneCursor, setSceneCursor] = useState<number>(0);
  const [keyedScenes, setKeyedScenes] = useState<
    Record<number, { data: TSceneData | null; loading: boolean }>
  >({});

  const { amountOfFrames, isLoading: isFetchingAmountOfFrames } =
    useGetAmountOfFrames({
      PROJECT_NAME,
      token,
    });

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
  };

  const getSceneData = useCallback(
    async (sceneCursor: number) => {
      if (!keyedScenes[sceneCursor]) {
        try {
          setKeyedScenes((prevState: any) => ({
            ...prevState,
            [sceneCursor]: { data: null, loading: true },
          }));

          const res = await fetch(
            BASE_URL + `${PROJECT_NAME}/frames/${sceneCursor}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!res.ok) {
            return;
          }

          const { data } = await res.json();

          data.cuboids = mapCuboidsData(data.cuboids);

          setKeyedScenes((prevState: any) => ({
            ...prevState,
            [sceneCursor]: { data, loading: false },
          }));
        } catch (error) {
          //
        }
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

  if (isFetchingAmountOfFrames) {
    return <div>Getting frames...</div>;
  }

  return (
    <div
      style={{ position: "relative", width: "100vw", height: "100vh" }}
      className="main-scene-container"
    >
      <div className="inputRange">
        <div>
          <input
            type="range"
            min={0}
            max={amountOfFrames ?? 0}
            value={sceneCursor}
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => e.stopPropagation()}
          />
          <p>Scene: {sceneCursor}</p>
        </div>
        <div>
          <button onClick={handleLogOut} className="input-field">
            Logout
          </button>
        </div>
      </div>

      {!!keyedScenes?.[sceneCursor]?.loading && <div>Loading Frame...</div>}

      {!!keyedScenes?.[sceneCursor]?.data && (
        <SceneRenderer data={keyedScenes[sceneCursor].data} />
      )}
    </div>
  );
};

export default MainScene;
