import axios from "axios";

const instance = axios.create({
  baseURL: "https://app.smshubangola.com/api",
  headers: {
    accessToken: process.env.SMSHUB as string,
  },
});

export default instance;
