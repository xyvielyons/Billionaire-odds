import "better-auth";

declare module "better-auth" {
  interface UserAdditionalFields {
    role: string;
  }
}
