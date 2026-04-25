import api from "@/app/lib/api";

export const checkAuth = async () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    await api.get("/protectedPage/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch {
    localStorage.removeItem("token");
    return false;
  }
};