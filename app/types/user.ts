import { AuthRoles } from "./auth";

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: AuthRoles;
  createdAt: string;
  updatedAt: string;
}

export interface UserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: AuthRoles;
  createdAt: string;
  updatedAt: string;
}
