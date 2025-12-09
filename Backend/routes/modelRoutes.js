import express from "express";
import upload from "../middleware/upload.js";
import { getModels, addModel, updateModel, deleteModel, getModelById } from "../controllers/modelController.js";

const router = express.Router();

router.get("/:id", getModelById);
router.get("/", getModels);
router.post("/", upload.single("image"), addModel);
router.put("/:id", upload.single("image"), updateModel); // edit
router.delete("/:id", deleteModel); // ✅ delete

export default router;