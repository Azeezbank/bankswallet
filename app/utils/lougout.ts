export const logoutUser = (router: any) => {
  localStorage.removeItem("token");
  router.push("/auth/login");
};