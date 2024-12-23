import { BASE_URL, PROJECT_NAME } from "../constants";
import { RETRY_POLICY } from "../constants";

interface IGetFramesByIdProps {
  frameId: number;
  token: string;
}

interface ILoginUsersProps {
  username: string;
  password: string;
}

interface IGetAmountOfFramesProps {
  token: string;
}

/*
 * Simple backoff delay in case client hits rate limits
 */
const fetchWithRetries = async (url: string, config: RequestInit) => {
  let index = 0;

  let res = await fetch(url, config);

  if (res.status !== 429) {
    return res;
  }

  while (RETRY_POLICY[index]) {
    await new Promise((resolve) => setTimeout(resolve, RETRY_POLICY[index]));
    res = await fetch(url, config);

    if (res.status !== 429) {
      return res;
    }

    index++;
  }

  return res;
};

/*
 * Not a full implementation, but a simple entity to centralize all the API calls
 * TODO: add query client
 */
export class CommunicationService {
  static getFramesById = async ({ frameId, token }: IGetFramesByIdProps) => {
    const url = BASE_URL + `${PROJECT_NAME}/frames/${frameId}`;
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    return await fetchWithRetries(url, config);
  };
  static loginUser = async ({ username, password }: ILoginUsersProps) => {
    const url = BASE_URL + "auth";
    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    return await fetchWithRetries(url, config);
  };
  static getAmountOfFrames = async ({ token }: IGetAmountOfFramesProps) => {
    const url = `${BASE_URL}${PROJECT_NAME}/frames`;

    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    return await fetchWithRetries(url, config);
  };
}
