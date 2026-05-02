import dotenv from "dotenv";

let isEnvLoaded = false;

export const loadEnv = () => {
  if (isEnvLoaded) return;

  dotenv.config();
  isEnvLoaded = true;
};
