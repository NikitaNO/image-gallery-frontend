import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-carousel-modal',
  templateUrl: './carousel-modal.component.html',
  styleUrls: ['./carousel-modal.component.css']
})
export class CarouselModalComponent implements OnInit {
    public carouselOne: any;

  constructor(public dialogRef: MatDialogRef<CarouselModalComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.carouselOne = {
            grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
            slide: 1,
            speed: 400,
            interval: 4000,
            point: {
                visible: true
            },
            load: 2,
            touch: true,
            loop: true,
            custom: 'banner'
        }
    }

    public myfunc(event: Event) {
        // carouselLoad will trigger this funnction when your load value reaches
        // it is helps to load the data by parts to increase the performance of the app
        // must use feature to all carousel
    }

}
