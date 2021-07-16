const controller = require("../controllers/moviesControllers"); // importei o arquivo de controller

const express = require("express");
const router = express.Router();




//router.delete("/:id", controller.deleteMovie)


router.patch("/updateLanguage/:id", controller.updateLanguage)
router.get("/", controller.home);
router.get("/todos", controller.getAll);
router.get("/titulo", controller.getByTitle);
router.get("/genero", controller.getByGenre);
router.get("/:id", controller.getById);
router.post("/creat", controller.creatMovie)
router.put("/:id", controller.replaceMovies)


module.exports = router;