import { CreateUserOutputDto } from "../../usecase/user/create-user.usecase";

export class CreateUserPresenter {
  private constructor() {}

  public static presenter(output: CreateUserOutputDto): CreateUserOutputDto {
    return {
      statusCode: output.statusCode,
      body: output.body,
    };
  }
}
