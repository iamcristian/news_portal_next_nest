import { Role } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}