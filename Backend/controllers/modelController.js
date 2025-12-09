import ScootyModel from "../models/modelModel.js";
import cloudinary from "../config/cloudinary.js";

// Get all models
export const getModels = async (req, res) => {
  try {
    const models = await ScootyModel.find();
    res.json({ data: models });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new model
export const addModel = async (req, res) => {
  try {
    const model = new ScootyModel({
      name: req.body.name,
      price: req.body.price,
      rangeKm: req.body.rangeKm,
      image: req.file?.path || null, // Cloudinary URL
    });

    await model.save();
    res.json({ data: model });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get model by ID
export const getModelById = async (req, res) => {
  try {
    const model = await ScootyModel.findById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.json(model);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update/Edit model
export const updateModel = async (req, res) => {
  try {
    const model = await ScootyModel.findById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });

    // Update fields
    model.name = req.body.name || model.name;
    model.price = req.body.price || model.price;
    model.rangeKm = req.body.rangeKm || model.rangeKm;

    // If new image uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (model.image) {
        const parts = model.image.split("/");
        const fileName = parts[parts.length - 1]; // e.g. abc123.jpg
        const publicId = `scooty_models/${fileName.split(".")[0]}`;
        await cloudinary.uploader.destroy(publicId);
      }
      model.image = req.file.path; // new Cloudinary URL
    }

    await model.save();
    res.json({ data: model });
  } catch (err) {
    console.error("Update model error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete model
export const deleteModel = async (req, res) => {
  try {
    const model = await ScootyModel.findById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });

    // Delete image from Cloudinary if exists
    if (model.image) {
      const parts = model.image.split("/");
      const fileName = parts[parts.length - 1]; // e.g. abc123.jpg
      const publicId = `scooty_models/${fileName.split(".")[0]}`; // folder/fileName without extension
      await cloudinary.uploader.destroy(publicId); // ✅ destroy correct publicId
    }

    await ScootyModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Model deleted successfully" });
  } catch (err) {
    console.error("Delete model error:", err);
    res.status(500).json({ error: err.message });
  }
};