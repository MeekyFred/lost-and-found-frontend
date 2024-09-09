export enum AuthRoles {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: AuthRoles;
}
