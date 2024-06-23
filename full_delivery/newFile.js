import { authMiddleware } from "@clerk/nextjs";

//export default clerkMiddleware();
export default authMiddleware({
  publicRoutes: ["/"],
});
