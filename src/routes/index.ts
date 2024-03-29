import { Application } from "express";
import "../controllers";
import { attachApplicationRoutes } from "./routes";
// import { router } from "./decorators";

export function configureRoutes(app: Application): void {
  // app.use(router);
  attachApplicationRoutes(app);
}
