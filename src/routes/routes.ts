import { ProductController, UserController } from "../controllers";

import { Application } from "express";
import { HealthController } from "../controllers/health-controller";
import { JoiValidation } from "../middleware/joiValidation";
import { LoggerContainer } from "../settings/logger";
import { verify } from "../middleware/verifyToken";

const userController = new UserController();
const productController = new ProductController();
const logger = LoggerContainer.instance.getLogger("Router");
const healthController = new HealthController();

export function attachApplicationRoutes(app: Application) {
    app.use((req, res, next) => {
        logger.debug(`Processing route: ${req.url}`);
        next();
    });

    // Health Controller
    app.get("/health", healthController.getStatus); 

    // Login Actions
    app.post("/v1/user/register", JoiValidation.validateRegisterData ,userController.register);
    app.post("/v1/user/login", JoiValidation.validateLoginData ,userController.login);
    app.get("/v1/user/refreshToken", userController.getTokenByRefreshToken);

    // User Controller
    app.get("/v1/user/me", verify, userController.me);
    app.patch("/v1/user/me", verify, JoiValidation.validateUpdateUserData, userController.updateUserInfo);

    // Trip Controller
    app.post("/v1/trip", verify, JoiValidation.validateTripData, productController.create);
    app.get("/v1/trip", verify, productController.getAll);


}
