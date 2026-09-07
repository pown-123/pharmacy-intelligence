export type OrganizationScoped = {
  organizationId: string;
};

export function scopedWhere<T extends object>(
  ctx: OrganizationScoped,
  where?: T
) {
  return {
    ...where,
    organizationId: ctx.organizationId
  };
}
