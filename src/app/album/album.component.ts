import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Portal} from '../app.services';
import {AddPhotoComponent} from '../add-photo/add-photo.component';
import {ContextMenuComponent} from 'ngx-contextmenu';
import {CarouselModalComponent} from '../carousel-modal/carousel-modal.component';
import {Observable} from 'rxjs/Observable';


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
        route.paramMap.switchMap((params) => this.getPotos(params.get('id'))).subscribe((el) => {
            this.paramId = this.route.snapshot.params.id;
        });
    }

    ngOnInit(): void {
        this.paramId = this.route.snapshot.params.id;

        this.portal.getAlbums()
            .subscribe((data: any) => this.albums = data.albums);
    }

    getPotos(paramId): Observable<any> {
       return this.portal.getPhotos(paramId)
            .do((data: any) => this.photos = data.photos);
    }

    copyPhoto(photo, album): void {
        photo.album_id = album;

        this.portal.copyPhoto(photo)
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((data: any) => {
            }, (err) => {

            });
    }

    movePhoto(photo, album): void {
        this.portal.updatePhoto({photo: photo, data: {album_id: album}})
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((data: any) => {
            }, (err) => {

            });
    }

    removePhoto(photo): void {
        this.portal.removePhoto(photo)
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((data: any) => {
            }, (err) => {

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
            .switchMap((res) => res && this.portal.addPhoto(res.file, {...res.data, album_id: this.paramId}))
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((album) => {

            });
    }
}
