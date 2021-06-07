const express = require('express');
const adminRouter = express.Router();
const authController = require("../../controllers/backend/authController.js");
const userController = require("../../controllers/backend/userController.js");
const courseController = require("../../controllers/backend/courseController.js");

adminRouter.use("/users/create", userController.addUser);
adminRouter.use("/users/createUser", userController.createUser);
adminRouter.use("/users/Password/:id", userController.Pass);
adminRouter.use('/users/changePassword',userController.Changepass);
adminRouter.use("/users/updateUser", userController.updateUser);
adminRouter.use("/users/edit/:id", userController.editUser);
adminRouter.use("/users/show/:id", userController.showUser);
adminRouter.use("/users/delete/:id", userController.deleteUser);
adminRouter.use("/users/", userController.getUsers);


adminRouter.use("/courses/create", courseController.addCourse);
adminRouter.use("/courses/createCourses", courseController.createCourse);
adminRouter.use("/courses/updateCourse", courseController.updateCourse);
adminRouter.use("/courses/edit/:id", courseController.editCourse);
adminRouter.use('/courses/delete/:id',courseController.deleteCourse);
adminRouter.use("/courses/show/:id", courseController.showCourses);
adminRouter.use("/courses/", courseController.getCourses);




adminRouter.use("/dashboard", authController.dashboard);
adminRouter.use("/login", authController.login);
adminRouter.use("/", authController.doLogin);



module.exports = adminRouter;
