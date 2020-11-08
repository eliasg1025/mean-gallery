import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

import Photo from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response>
{
    const photos = await Photo.find();

    return res.json({
        message: 'Fotos obtenidas',
        data: photos
    });
}

export async function getPhoto(req: Request, res: Response): Promise<Response>
{
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json({
        message: 'Foto obtenida',
        data: photo
    })
}

export async function createPhoto(req: Request, res: Response): Promise<Response>
{
    const { title, description } = req.body;

    const newPhoto = {
        title,
        description,
        imagePath: req.file.path
    }

    const photo = new Photo(newPhoto);
    await photo.save();

    return res.status(201).json({
        message: 'Image guardada correctamente',
        data: photo
    })
}

export async function updatePhoto(req: Request, res: Response): Promise<Response>
{
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });

    return res.json({
        message: 'Foto actualizada corractamente',
        data: updatedPhoto
    });
}

export async function deletePhoto(req: Request, res: Response): Promise<Response>
{
    const { id } = req.params;

    try {
        const photo = await Photo.findByIdAndRemove(id);

        if (photo) {
            await fs.unlink(path.resolve(photo.imagePath));
        }
    
        return res.json({
            message: 'Imagen borrada correctamente',
            data: photo
        });
    } catch (e) {
        return res.status(400).json({
            message: 'Error al borrar la imagen',
            data: {
                error: e
            }
        });
    }
}