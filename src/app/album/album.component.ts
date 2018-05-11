import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Portal} from '../app.services';
import {AddPhotoComponent} from '../add-photo/add-photo.component';
import {ContextMenuComponent} from 'ngx-contextmenu';
import {CarouselModalComponent} from '../carousel-modal/carousel-modal.component';
import {Observable} from 'rxjs/Observable';
import {EditPhotoComponent} from '../edit-photo/edit-photo.component';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

    public photos: any[] = [];
    public albums: any[] = [];
    private paramId: string;
    public photo_url: string = environment.photo_url;

    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

    constructor(private portal: Portal,
                private route: ActivatedRoute,
                public dialog: MatDialog,
                public snackBar: MatSnackBar) {
        route.paramMap.switchMap((params) => this.getPotos(params.get('id'))).subscribe((el) => {
            this.paramId = this.route.snapshot.params.id;
        });
    }

    ngOnInit(): void {
        this.paramId = this.route.snapshot.params.id;

        this.portal.getAlbums()
            .subscribe((data: any) => {
                this.albums = data.albums;
            }, (err) => {
                this.snackBar.open(
                    'Server Error',
                    'HIDE',
                    {duration: 9000}
                );
            });
    }

    getPotos(paramId): Observable<any> {
        return this.portal.getPhotos(paramId)
            .do((data: any) => this.photos = data.photos);
    }

    copyPhoto(photo, album: string): void {
        photo.album_id = album;

        this.portal.copyPhoto(photo)
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((data: any) => {
                this.snackBar.open(
                    'Successfully Copied',
                    'HIDE',
                    {duration: 9000}
                );
            }, (err) => {
                this.snackBar.open(
                    'Server Error',
                    'HIDE',
                    {duration: 9000}
                );
            });
    }

    movePhoto(photo, album: string): void {
        this.portal.updatePhoto({photo: photo, data: {album_id: album}})
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((data: any) => {
                this.snackBar.open(
                    'Successfully Moved',
                    'HIDE',
                    {duration: 9000}
                );
            }, (err) => {
                this.snackBar.open(
                    'Server Error',
                    'HIDE',
                    {duration: 9000}
                );
            });
    }

    removePhoto(photo): void {
        this.portal.removePhoto(photo)
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((data: any) => {
                this.snackBar.open(
                    'Successfully Removed',
                    'HIDE',
                    {duration: 9000}
                );
            }, (err) => {
                this.snackBar.open(
                    'Server Error',
                    'HIDE',
                    {duration: 9000}
                );
            });
    }

    editPhoto(photo): void {
        const dialogRef = this.dialog.open(EditPhotoComponent, {
            data: photo,
            width: '300px',
            disableClose: true,
        });
        dialogRef.afterClosed()
            .switchMap((res) => res && this.portal.updatePhoto({photo: res.photo, data: res.data}))
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((photos) => {
                this.snackBar.open(
                    'Successfully Edited',
                    'HIDE',
                    {duration: 9000}
                );
            }, (err) => {
                this.snackBar.open(
                    'Server Error',
                    'HIDE',
                    {duration: 9000}
                );
            });
    }

    detailedView(photo): void {
        const dialogRef = this.dialog.open(CarouselModalComponent, {
            data: {photos: this.photos, start: photo},
            width: '80%',
        });
        dialogRef.afterClosed()
            .subscribe((res) => console.log(res));
    }

    addPhoto(): void {
        const dialogRef = this.dialog.open(AddPhotoComponent, {
            width: '300px',
            disableClose: true,
        });
        dialogRef.afterClosed()
            .switchMap((res) => res && this.portal.addPhoto(res.file, {...res.data, album_id: this.paramId}))
            .switchMap((data) => this.getPotos(this.paramId))
            .subscribe((photos) => {
                this.snackBar.open(
                    'Successfully Uploaded',
                    'HIDE',
                    {duration: 9000}
                );
            }, (err) => {
                this.snackBar.open(
                    'Server Error',
                    'HIDE',
                    {duration: 9000}
                );
            });
    }
}
