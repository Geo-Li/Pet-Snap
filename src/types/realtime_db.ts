import { User } from "@firebase/auth";

export interface MyUser extends Partial<User> {
  userId: string;
  status: "online" | "offline";
}
