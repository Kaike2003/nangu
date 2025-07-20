export interface IValidation<Input> {
  validate(input: Input): void;
}
