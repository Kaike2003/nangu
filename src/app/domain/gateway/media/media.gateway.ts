import { IResponse } from "@/util/response/response";
import { Media } from "../../entity/media/media.entity";

export interface MediaGateway {
  create(media: Media): Promise<IResponse<number, string>>;
}
