export const MIN_CURSOR_VALUE = 0;
export const MAX_CURSOR_VALUE = 49;
/*
 * The backend is deployed but vercel's endpoints timeout after 10s for free deployments
 */
// export const BASE_URL = "https://ps-challenge-backend.vercel.app/";
export const BASE_URL = "http://localhost:3000/";
export const PROJECT_NAME = "pandaset-challenge";
export const RETRY_POLICY = [15000, 30000, 60000];
