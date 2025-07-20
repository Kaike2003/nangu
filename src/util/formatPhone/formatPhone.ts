import { removeSpace } from "../removeSpace/removeSpace";

export function formatPhone(phone: string): string {
  return "244" + removeSpace(phone);
}
