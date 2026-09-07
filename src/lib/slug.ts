export function slugifyOrganizationName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function withRandomSuffix(slug: string) {
  return `${slug || "pharmacy"}-${crypto.randomUUID().slice(0, 8)}`;
}
