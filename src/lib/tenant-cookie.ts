const BASE =
  process.env.NODE_ENV === "production" ? "workforge.team" : "lvh.me:3000";

export async function setTenantCookie(slug: string) {
  const res = await fetch("/api/set-tenant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
  });

  if (!res.ok) throw new Error("Failed to set tenant cookie");
}

export async function clearTenantCookie() {
  await fetch("/api/set-tenant", { method: "DELETE" });
}

export function getTenantUrl(slug: string, path = "/dashboard") {
  return `http://${slug}.${BASE}${path}`;
}
