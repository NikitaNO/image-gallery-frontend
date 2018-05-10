import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Portal} from '../app.services';
import {AddPhotoComponent} from '../add-photo/add-photo.component';
import {ContextMenuComponent} from 'ngx-contextmenu';
import {CarouselModalComponent} from "../carousel-modal/carousel-modal.component";


@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {


    public photos: any[] = [];
    public albums: any[] = [];
    public paramId: string;
    public isCarousel: boolean;
    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

    constructor(private portal: Portal, private route: ActivatedRoute, public dialog: MatDialog) {

    }

    ngOnInit(): void {
        this.paramId = this.route.snapshot.params.id;
        this.getPotos();
        this.portal.getAlbums()
            .subscribe((data: any) => this.albums = data.albums);
    }

    getPotos(): void {
        this.portal.getPhotos(this.paramId)
            .subscribe((data: any) => this.photos = data.photos);
    }

    copyPhoto(photo, album): void {
        photo.album_id = album;
        this.portal.copyPhoto(photo)
            .subscribe((data: any) => {
                if (data.message === 'success') {
                    this.getPotos();
                }
            });
    }

    movePhoto(photo, album): void {
        this.portal.updatePhoto({photo: photo, data: {album_id: album}})
            .subscribe((data: any) => {
                if (data.message === 'success') {
                    this.getPotos();
                }
            });
    }

    removePhoto(photo): void {
        this.portal.removePhoto(photo)
            .subscribe((data: any) => {
                if (data.message === 'success') {
                    this.getPotos();
                }
            });
    }

    detailedView(photo) {
        const dialogRef = this.dialog.open(CarouselModalComponent, {
            data: {photos: this.photos, start: photo},
            width: '80%',
        });
        dialogRef.afterClosed()
            .subscribe((res) => console.log(res));
    }

    addPhoto(photo) {
        const dialogRef = this.dialog.open(AddPhotoComponent, {
            data: photo,
            width: '300px',
            disableClose: true,
        });
        dialogRef.afterClosed()
            .flatMap((res) => res && this.portal.addPhoto(res.file, {...res.data, album_id: this.paramId}))
            .subscribe((album) => this.getPotos());
    }
}
