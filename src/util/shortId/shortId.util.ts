import ShortUniqueId from "short-unique-id";

export class ShortUniqueIdUtil {
  private constructor() {}

  public static short(length: number) {
    const { randomUUID } = new ShortUniqueId({ length });
    return randomUUID();
  }
}
