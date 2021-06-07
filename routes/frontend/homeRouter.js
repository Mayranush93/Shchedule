 const express = require('express');
const homeRouter = express.Router();
const homeController = require("../../controllers/frontend/homeController.js");


homeRouter.get('/contact', homeController.contact);
homeRouter.get('/about', homeController.about);
homeRouter.get('/', homeController.index);

module.exports = homeRouter;
