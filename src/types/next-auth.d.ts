import { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      organizationId: string;
      organizationName: string;
      branchId: string | null;
      branchName: string | null;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    organizationId: string;
    organizationName: string;
    branchId: string | null;
    branchName: string | null;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    organizationId: string;
    organizationName: string;
    branchId: string | null;
    branchName: string | null;
    role: Role;
  }
}
