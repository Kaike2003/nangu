import { DvText } from "decoval";

export class LoginUserDecoval {
  @DvText({ regex: { value: [/^\+2449\d{8}$/] } })
  phone!: string;

  @DvText({ noSpaces: true, number: true, specialChar: true })
  password!: string;
}
