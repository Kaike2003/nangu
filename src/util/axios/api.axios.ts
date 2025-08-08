import axios from "axios";

const instance = axios.create({
  baseURL: "https://app.smshubangola.com/api",
  headers: {
    accessToken: "giNTJIDtpvzVxo520EpCVposuS4uaBvbIr7k08pyb9UPlRhpU4XyPJwGqruj39nq9UJp4UbH8RYt2vc6sYZLTzUQqkSycmN5JHSR9lNctbOJjcz1VkyhKTP2voLxM6Wyu4qzLmaB1gTwkdHBmh9h6XLc6gXOaAmyNEBAtkzeN1eB2ckT6NDe9ivj9vWuEcoxAO5IUlTkKT9RMK088T25G4oCRN0pgveH3W8U83zKzmv0sdLz2avss1semiFuGA",
  },
});

export default instance;
