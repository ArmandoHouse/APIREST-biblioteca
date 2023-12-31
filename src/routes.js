import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

router.get('/libros', libro.getAll);
router.get('/libro', libro.getOne);
router.post('/libro', libro.addOne);
router.delete('/libro', libro.deleteOne);
router.put('/libro', libro.updateOne);

