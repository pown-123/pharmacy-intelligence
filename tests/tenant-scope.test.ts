import { describe, expect, it } from "vitest";

import { scopedWhere } from "@/lib/tenant-scope";

describe("tenant scoping", () => {
  it("adds the authenticated organization id to queries", () => {
    expect(scopedWhere({ organizationId: "org-1" }, { name: "Main" })).toEqual({
      organizationId: "org-1",
      name: "Main"
    });
  });

  it("does not allow caller-provided organization id to override the tenant", () => {
    expect(
      scopedWhere(
        { organizationId: "authenticated-org" },
        { organizationId: "attacker-org", id: "branch-1" }
      )
    ).toEqual({
      organizationId: "authenticated-org",
      id: "branch-1"
    });
  });
});
