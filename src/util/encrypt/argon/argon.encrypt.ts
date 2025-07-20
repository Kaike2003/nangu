import argon from "argon2";

export class ArgonEncrypt {
  private constructor() {}

  public static hash(password: string): Promise<string> {
    const hash = argon.hash(password);
    return hash;
  }

  public static verify(hash: string, password: string): Promise<boolean> {
    const verify = argon.verify(hash, password);
    return verify;
  }
}
