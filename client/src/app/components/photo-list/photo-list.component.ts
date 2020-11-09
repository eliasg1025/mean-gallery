import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Photo } from '../../interfaces/Photo';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private photoService: PhotoService, private router: Router) { }

  ngOnInit(): void {
    this.photoService.getPhotos()
      .subscribe(
        res => {
          this.photos = res.data;
        },
        err => console.error(err)
      );
  }

  selectedCard(id: string) {
    this.router.navigate([`/photos/${id}`]);
  }
}
