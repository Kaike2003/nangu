export type PropsVideo = {
  id: string;
  url: string;
  userId: string;
  published: boolean;
};

export class Video {
  private constructor(private readonly props: PropsVideo) {}

  public static create(props: Omit<PropsVideo, "id" | "published">, validation: any) {
    return new Video({
      id: "",
      url: props.url,
      userId: props.userId,
      published: false,
    });
  }

  public static with(props: PropsVideo) {
    return new Video(props);
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
