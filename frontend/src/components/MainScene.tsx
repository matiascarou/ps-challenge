import { useState, useEffect, useCallback, useMemo } from "react";
import "../App.css";
import { ISelectedScene } from "../types";
import { mapCuboidsData } from "../utils";
import { MIN_CURSOR_VALUE, PROJECT_NAME } from "../constants";
import SceneRenderer from "../components/SceneRenderer";
import useGetAmountOfFrames from "../hooks/useGetAmountOfFrames";
import UseFrameShortcutCombination from "../hooks/UseFrameShortcutCombination";
import _ from "lodash";
import { CommunicationService } from "../api/CommunicationService";
import AppHeader from "./AppHeader";

interface IMainSceneProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MainScene = ({ token, setToken }: IMainSceneProps) => {
  const [sceneCursor, setSceneCursor] = useState<number>(0);
  const [keyedScenes, setKeyedScenes] = useState<
    Record<number, ISelectedScene>
  >({});

  const { amountOfFrames, isLoading: isFetchingAmountOfFrames } =
    useGetAmountOfFrames({
      PROJECT_NAME,
      token,
    });

  UseFrameShortcutCombination({
    min: MIN_CURSOR_VALUE,
    max: amountOfFrames,
    setSceneCursor,
  });

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
  };

  /*
   * Get frames data by given cursor
   * TODO: improve retry policy
   */
  const getSceneData = useCallback(
    async (sceneCursor: number) => {
      if (!keyedScenes[sceneCursor]) {
        try {
          setKeyedScenes((prevState: any) => ({
            ...prevState,
            [sceneCursor]: { data: null, loading: true },
          }));

          const res = await CommunicationService.getFramesById({
            sceneCursor,
            token,
          });

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

  const selectedScene = useMemo(() => {
    return keyedScenes?.[sceneCursor];
  }, [keyedScenes, sceneCursor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value >= MIN_CURSOR_VALUE && value <= amountOfFrames) {
      setSceneCursor(value);
    }
  };

  return (
    <div className="main-scene-container">
      <AppHeader
        amountOfFrames={amountOfFrames}
        sceneCursor={sceneCursor}
        handleInputChange={handleInputChange}
        handleLogOut={handleLogOut}
      />

      <SceneRenderer
        selectedScene={selectedScene}
        isFetchingAmountOfFrames={isFetchingAmountOfFrames}
      />
    </div>
  );
};

export default MainScene;
