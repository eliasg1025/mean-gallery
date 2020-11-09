import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Photo } from 'src/app/interfaces/Photo';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id: string;
  photo: Photo;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.photoService.getPhoto(this.id)
      .subscribe(
        res => {
          this.photo = res.data;
        },
        err => console.error(err)
      );
    })
  }

  deletePhoto(id: string) {
    this.photoService.deletePhoto(id)
      .subscribe(
        res => {
          this.router.navigate(['/photos'])
        },
        err => console.error(err)
      );
  }

  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    this.photoService.updatePhoto(this.id, title.value, description.value)
      .subscribe(
        res => {
          this.router.navigate(['/photos'])
        },
        err => console.error(err)
      );

    return false;
  }
}
