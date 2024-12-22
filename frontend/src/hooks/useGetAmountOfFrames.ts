import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../constants";

interface UseAmountOfFramesProps {
  PROJECT_NAME: string;
  token: string | null;
}

export const useGetAmountOfFrames = ({
  PROJECT_NAME,
  token,
}: UseAmountOfFramesProps) => {
  const [amountOfFrames, setAmountOfFrames] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAmountOfScenes = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}${PROJECT_NAME}/frames`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res?.ok) {
        console.error("Failed to fetch frames:", res.status, res.statusText);
        return;
      }

      const { amountOfFrames } = await res.json();
      setAmountOfFrames(amountOfFrames);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL, PROJECT_NAME, token]);

  useEffect(() => {
    getAmountOfScenes();
  }, [getAmountOfScenes]);

  return {
    amountOfFrames,
    isLoading,
    refetch: getAmountOfScenes,
  };
};
