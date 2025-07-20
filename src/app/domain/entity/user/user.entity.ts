import { Role } from "@/generated/prisma";
import { CreateUserValidation } from "../validation/user/create-user.validation";

export interface PropsUser {
  id: string;
  name: string;
  phone: string;
  password: string;
  role: "user" | "admin";
}

export class User {
  private constructor(private readonly props: PropsUser) {}

  public static create({ name, phone, password, role }: Omit<PropsUser, "id">, validator: CreateUserValidation): User {
    const props = { name, phone, password, role };
    validator.validate(props);
    return new User({ id: "", name, phone, password, role });
  }

  public static with(props: PropsUser): User {
    return new User(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public get password(): string {
    return this.props.password;
  }

  public get role(): "user" | "admin" {
    return this.props.role;
  }
}
