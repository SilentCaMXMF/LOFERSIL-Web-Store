export interface User {
  id: string;
  email: string;
  password: string; // hashed
  role: "customer" | "admin";
  createdAt: Date;
}