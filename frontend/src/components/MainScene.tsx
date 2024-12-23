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
  const [keyedFrames, setKeyedFrames] = useState<
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
   * TODO: improve retry policy + error handling
   */
  const getSceneData = useCallback(
    async (frameId: number) => {
      if (!keyedFrames[frameId] || keyedFrames?.[frameId]?.failed) {
        try {
          setKeyedFrames((prevState: any) => ({
            ...prevState,
            [frameId]: { data: null, loading: true, failed: false },
          }));

          const res = await CommunicationService.getFramesById({
            frameId,
            token,
          });

          if (!res.ok) {
            setKeyedFrames((prevState: any) => ({
              ...prevState,
              [frameId]: { data: null, loading: false, failed: true },
            }));
            return;
          }

          const { data } = await res.json();

          data.cuboids = mapCuboidsData(data.cuboids);

          setKeyedFrames((prevState: any) => ({
            ...prevState,
            [frameId]: { data, loading: false, failed: false },
          }));
        } catch (error) {
          setKeyedFrames((prevState: any) => ({
            ...prevState,
            [frameId]: { data: null, loading: false, failed: true },
          }));
        }
      }
    },
    [sceneCursor, keyedFrames]
  );

  useEffect(() => {
    getSceneData(sceneCursor);
  }, [sceneCursor, getSceneData]);

  const selectedScene = useMemo(() => {
    return keyedFrames?.[sceneCursor];
  }, [keyedFrames, sceneCursor]);

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
