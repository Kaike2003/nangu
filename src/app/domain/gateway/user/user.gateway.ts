import { IResponse } from "../../../../util/response/response";
import { User } from "../../entity/user/user.entity";

export interface UserGateway {
  create(
    user: User
  ): Promise<IResponse<number, { id: string; name: string; phone: string; role: "admin" | "user" } | string>>;
  login(
    email: string,
    password: string
  ): Promise<
    IResponse<
      number,
      | {
          user: { id: string; name: string; phone: string; role: "user" };
          token: string;
        }
      | string
    >
  >;
  checked(secret: string): Promise<IResponse<number, string>>;
  resetPassword(phone: string): Promise<IResponse<number, string>>;
  //getAllUser(): Promise<IResponse<number, User[]>>;
  changeProfile(name: string, newPhone: string, oldPhone: string): Promise<IResponse<number, string>>;
  changePassword(newPassword: string, oldPassword: string, phone: string): Promise<IResponse<number, string>>;
}
