export interface IResponse<StatusCode, Message> {
  statusCode: StatusCode;
  body: Message;
}
