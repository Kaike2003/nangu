import { IValidation } from "@/util/validation/validation";
import { PropsMedia } from "../../media/media.entity";

export class CreateMediaValidation implements IValidation<PropsMedia> {
  private constructor() {}

  public static create() {
    return new CreateMediaValidation();
  }

  public validate(input: Omit<PropsMedia, "id">): void {
    const { image, video, userId } = input;

    if (!userId || typeof userId !== "string") {
      throw new Error("Id do usuário inválido");
    }

    if (!image || (typeof image !== "string" && !Array.isArray(image))) {
      throw new Error("Imagem inválida");
    }

    if (!video || (typeof video !== "string" && !Array.isArray(video))) {
      throw new Error("Video inválido");
    }
  }
}
