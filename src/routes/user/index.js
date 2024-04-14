import { Router } from "express";
import { userControllers } from "../../controllers/index.js";

import {
  jwtMiddlewares,
  securityMiddlewares,
  validationMiddlewares,
} from "../../middlewares/index.js";

import { check } from "express-validator";
import { validationsHelpers } from "../../helpers/index.js";

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre del usuario es obligatorio").not().isEmpty(),
    check("mail", "El mail del usuario es obligatorio").not().isEmpty(),
    check("mail", "El mail no es un email válido").isEmail(),
    check("mail").custom(validationsHelpers.userValidations.existUser),
    check("phone", "El teléfono es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),

    validationMiddlewares.fieldsValidate,
  ],
  userControllers.postUser
);

router.put("/update", jwtMiddlewares.validatJWT, userControllers.putUser);
router.put("/delete", jwtMiddlewares.validatJWT, userControllers.deleteUser);
router.get(
  "/list",
  jwtMiddlewares.validatJWT,
  securityMiddlewares.isAdmin,
  userControllers.getUsers
);

router.post("/register/auth", userControllers.registerUser);

export default router;
