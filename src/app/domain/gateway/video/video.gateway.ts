import { IResponse } from "@/util/response/response";

export type TypeVideo = {
  filename: string;
  size: number;
  phone: string;
};

export interface VideoGateway {
  create(image: TypeVideo[], phone: string): Promise<IResponse<number, string>>;
  getAllVideo(): Promise<IResponse<number, TypeVideo[] | string>>;
  deleteOneVideo(filename: string): Promise<IResponse<number, string>>;
  changeStatus(filename: string): Promise<IResponse<number, string>>;
}
