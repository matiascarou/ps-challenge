import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../constants";
import { CommunicationService } from "../api/CommunicationService";

interface UseAmountOfFramesProps {
  PROJECT_NAME: string;
  token: string | null;
}

const useGetAmountOfFrames = ({
  PROJECT_NAME,
  token,
}: UseAmountOfFramesProps) => {
  const [amountOfFrames, setAmountOfFrames] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getAmountOfScenes = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await CommunicationService.getAmountOfFrames({ token });

      if (!res?.ok) {
        return;
      }

      const { amountOfFrames } = await res.json();
      setAmountOfFrames(amountOfFrames);
    } catch (error: any) {
      setError(error.message);
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
    error,
    refetch: getAmountOfScenes,
  };
};

export default useGetAmountOfFrames;
