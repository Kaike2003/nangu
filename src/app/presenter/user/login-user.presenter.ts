import { CreateUserOutputDto } from "../../usecase/user/create-user.usecase";

export class LoginPresenter {
  private constructor() {}

  public static async presenter(output: CreateUserOutputDto) {
    return {
      statusCode: output.statusCode,
      body: output.body,
    };
  }
}
