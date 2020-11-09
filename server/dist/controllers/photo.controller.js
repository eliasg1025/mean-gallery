"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhoto = exports.updatePhoto = exports.createPhoto = exports.getPhoto = exports.getPhotos = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const Photo_1 = __importDefault(require("../models/Photo"));
async function getPhotos(req, res) {
    const photos = await Photo_1.default.find();
    return res.json({
        message: 'Fotos obtenidas',
        data: photos
    });
}
exports.getPhotos = getPhotos;
async function getPhoto(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findById(id);
    return res.json({
        message: 'Foto obtenida',
        data: photo
    });
}
exports.getPhoto = getPhoto;
async function createPhoto(req, res) {
    const { title, description } = req.body;
    const newPhoto = {
        title,
        description,
        imagePath: req.file.path
    };
    const photo = new Photo_1.default(newPhoto);
    await photo.save();
    return res.status(201).json({
        message: 'Image guardada correctamente',
        data: photo
    });
}
exports.createPhoto = createPhoto;
async function updatePhoto(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo_1.default.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Foto actualizada corractamente',
        data: updatedPhoto
    });
}
exports.updatePhoto = updatePhoto;
async function deletePhoto(req, res) {
    const { id } = req.params;
    try {
        const photo = await Photo_1.default.findByIdAndRemove(id);
        if (photo) {
            await fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
        }
        return res.json({
            message: 'Imagen borrada correctamente',
            data: photo
        });
    }
    catch (e) {
        return res.status(400).json({
            message: 'Error al borrar la imagen',
            data: {
                error: e
            }
        });
    }
}
exports.deletePhoto = deletePhoto;
