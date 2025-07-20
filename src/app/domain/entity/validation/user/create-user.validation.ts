import { IValidation } from "@/util/validation/validation";
import { PropsUser } from "../../user/user.entity";
import { phoneProviderRegexes } from "@/util/regex/email/email.regex";

export class CreateUserValidation implements IValidation<PropsUser> {
  private constructor() {}

  public static create() {
    return new CreateUserValidation();
  }

  public validate(input: Omit<PropsUser, "id">): void {
    // const found = phoneProviderRegexes.find(({ regex }) => regex.test(input.phone));

    if (!input.name || typeof input.name !== "string") {
      throw new Error("Nome inválido");
    }

    if (input.name.length <= 4) {
      throw new Error("O nome deve ter mais de 5 caracteres");
    }

    if (input.name.length >= 30) {
      throw new Error("O nome deve ter menos de 30 caracteres");
    }

    if (!input.password || typeof input.password !== "string") {
      throw new Error("A palavra passe inválida");
    }

    if (input.password.length <= 4) {
      throw new Error("A palavra passe deve ter mais de 5 caracteres");
    }

    if (input.password.length >= 30) {
      throw new Error("A palavra passe deve ter menos de 30 caracteres");
    }

    // if (!found) {
    // throw new Error("Provedor desconhecido ou não suportado.");
    // }
  }
}
