import { Router } from 'express';

import multer from '../libs/multer';
import { createPhoto, deletePhoto, getPhoto, getPhotos } from '../controllers/photo.controller';

const router = Router();

router.route('/photos')
    .post(multer.single('image'), createPhoto)
    .get(getPhotos);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto);

export default router;