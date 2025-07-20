import axios from "axios";

const instance = axios.create({
  baseURL: "https://app.smshub.ao/api",
  headers: {
    accessToken: `W1FBKvmWLShaQVMEj24fZuHhsGjLC2wOmkS2L2vhXhEcq7bZDUU4L9T49JfOCE6q9oBUuUWTxfVjtncRizGCw7Ac2rzzwd3jUVlBo2H8RMQPcaQYcHaGfky4fWNC7RYaWcUDjyQBqjYXV4QwegpQR2Ckurb8UBFDXvtuNtlzBw6MX2V39EqKOaUPIKAE9p7g3nATeqzO2OmEnJ8i2H2fEJMLsQRnN7SFDMWuZxmMhvQgR5jyHUjhAeMTDcSFPeC`,
  },
});

export default instance;
