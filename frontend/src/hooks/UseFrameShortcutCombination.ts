import { useState, useEffect } from "react";

interface UseFrameShortcutCombinationProps {
  min: number;
  max: number;
  setSceneCursor: React.Dispatch<React.SetStateAction<number>>;
}

const UseFrameShortcutCombination = ({
  min,
  max,
  setSceneCursor,
}: UseFrameShortcutCombinationProps) => {
  const [isCombinationKeyPressed, setIsCombinationKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "f") {
        setIsCombinationKeyPressed(true);
      }

      if (isCombinationKeyPressed) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setSceneCursor((prev) => Math.max(prev - 1, min));
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          setSceneCursor((prev) => Math.min(prev + 1, max - 1));
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "f") {
        setIsCombinationKeyPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isCombinationKeyPressed, min, max, setSceneCursor]);
};

export default UseFrameShortcutCombination;
