import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Photo } from '../interfaces/Photo';

interface PhotoResponse {
  message: string,
  data: Photo
}

interface PhotosResponse {
  message: string,
  data: Photo[]
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  URI = 'http://localhost:4000/api/photos';

  constructor(private http: HttpClient) { }

  getPhoto(id: string)
  {
    return this.http.get<PhotoResponse>(`${this.URI}/${id}`);
  }

  getPhotos()
  {
    return this.http.get<PhotosResponse>(this.URI)
  }

  createPhoto(title: string, description: string, photo: File)
  {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);

    return this.http.post(this.URI, fd);
  }

  deletePhoto(id: string) {
    return this.http.delete<PhotoResponse>(`${this.URI}/${id}`);
  }

  updatePhoto(id: string, title: string, description: string) {
    return this.http.put<PhotoResponse>(`${this.URI}/${id}`, { title, description });
  }
}
