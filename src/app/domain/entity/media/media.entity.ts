export type PropsMedia = {
  id: string;
  userId: string;
  video: string[] | string;
  image: string[] | string;
};

export class Media {
  private constructor(private readonly props: PropsMedia) {}

  public static create({ image, video, userId }: Omit<PropsMedia, "id">): Media {
    return new Media({ id: "", image, video, userId });
  }

  public static with(props: PropsMedia) {
    return new Media(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get video(): string | string[] {
    return this.props.video;
  }

  public get image(): string | string[] {
    return this.props.image;
  }

  public get userId(): string {
    return this.props.userId;
  }
}
