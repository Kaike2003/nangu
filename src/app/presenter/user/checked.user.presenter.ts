import { CheckedOutputDto } from "@/app/usecase/user/checked-user.usecase";

export class CheckedUserPresenter {
  private constructor() {}

  public static presenter(output: CheckedOutputDto): CheckedOutputDto {
    return {
      statusCode: output.statusCode,
      body: output.body,
    };
  }
}
