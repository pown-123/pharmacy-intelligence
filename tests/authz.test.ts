import { Role } from "@prisma/client";
import { describe, expect, it } from "vitest";

import { assertRoleAtLeast, hasRoleAtLeast } from "@/lib/authz";

describe("role authorization", () => {
  it("allows higher roles to satisfy lower requirements", () => {
    expect(hasRoleAtLeast(Role.OWNER, Role.STAFF)).toBe(true);
    expect(hasRoleAtLeast(Role.MANAGER, Role.STAFF)).toBe(true);
  });

  it("rejects lower roles for owner-only actions", () => {
    expect(hasRoleAtLeast(Role.STAFF, Role.OWNER)).toBe(false);
    expect(() => assertRoleAtLeast(Role.STAFF, Role.OWNER)).toThrow(
      "Insufficient permissions"
    );
  });
});
