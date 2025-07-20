export type PropsImage = {
  id: string;
  url: string;
  userId: string;
  published: boolean;
};

export class Image {
  private constructor(private readonly props: PropsImage) {}

  public static create(props: Omit<PropsImage, "id" | "published">, validation: any) {
    return new Image({
      id: "",
      url: props.url,
      userId: props.userId,
      published: false,
    });
  }

  public static with(props: PropsImage) {
    return new Image(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get url(): string {
    return this.props.url;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get published(): boolean {
    return this.props.published;
  }
}
