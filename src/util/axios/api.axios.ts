import axios from "axios";

const instance = axios.create({
  baseURL: "https://app.smshubangola.com/api",
  headers: {
    accessToken: "Cw6epfx0aZh6c99K6kXnXFjaBfwiniTD5mG4VL7jzD2kWfbu2iTLu20s3nwAIfAg3AsIBk5UcYPUsn89KY1k1xqm8L1URFza4GU8DBVqv4aiAqXpyA9fwsrupxYBCiSiik23WVYPGZ51QziLAx0pb8JsnROzvdDziHNHJwIaRRg4tNAWR0W8gg9WkqIM9akbJnNludGZS33Hmx52xLGs4x4D1OPo5JOaJ0rmYslz2nOr7id07Oa59cPmSmxwIMm",
  },
});

export default instance;
