import axios from "axios";

const instance = axios.create({
  baseURL: "https://app.smshubangola.com/api",
  headers: {
    accessToken: "Yir1Zr5hn29B7EjVG1iH3Hh2nWD6MihFEbJe3fI7BEjYt0RohsFlyFKcbl6FoIRVmDCo0e3USxvAJHBPE7MQPCc55Gd4etft0R96xY5dTg0tvMan9Gajd2XU3JgrEvSpGqEOrXkDlNqTXJAN4xagO9VDVL9N0yU2Lg5H1uzKgjQeOV1bzqz24aUbSXnnLtKN0reFdZcxPGPXjZl0LHsLBt4z70YS3G4hYQsXsbxWTtS9UgDtyaKvz7uq5AeegV1",
  },
});

export default instance;
