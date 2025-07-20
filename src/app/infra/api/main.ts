import { ExpressInfra } from "./express/express.infra";
import "dotenv/config";
import "reflect-metadata";

const main = async () => {
  const port: number = Number(4000);
  const express: ExpressInfra = await ExpressInfra.create();
  express.listen(port);
};

main();
