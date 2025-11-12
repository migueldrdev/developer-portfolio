import type { HTMLAttributes } from "astro/types";

export interface Props extends Omit<HTMLAttributes<"input">, "type"> {
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "number"
    | "search"
    | "date";
  placeholder?: string;
  name?: string;
  rows?: string;
}