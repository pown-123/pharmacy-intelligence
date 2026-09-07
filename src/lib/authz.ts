import { Role } from "@prisma/client";

const roleOrder: Record<Role, number> = {
  STAFF: 1,
  MANAGER: 2,
  OWNER: 3
};

export function hasRoleAtLeast(actual: Role, required: Role) {
  return roleOrder[actual] >= roleOrder[required];
}

export function assertRoleAtLeast(actual: Role, required: Role) {
  if (!hasRoleAtLeast(actual, required)) {
    throw new Error("Insufficient permissions");
  }
}
