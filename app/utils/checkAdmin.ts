import prisma from "@/app/Prisma.client";

export async function isAdmin(userId: number) {
  const user = await prisma.users.findUnique({
    where: { d_id: userId },
    select: { role: true },
  });

  if (!user) throw new Error("Failed to select user");
  if (user.role !== "admin") throw new Error("Access denied, Admin Only");

  return true;
}