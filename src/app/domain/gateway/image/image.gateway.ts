import { IResponse } from "@/util/response/response";

export type TypeImage = {
  filename: string;
  size: number;
  phone: string;
};

export interface ImageGateway {
  create(image: TypeImage[], phone: string): Promise<IResponse<number, string>>;
  getAllImage(): Promise<IResponse<number, TypeImage[] | string>>;
  deleteOneImage(filename: string): Promise<IResponse<number, string>>;
  changeStatus(filename: string): Promise<IResponse<number, string>>;
}
