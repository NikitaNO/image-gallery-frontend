import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Portal} from '../app.services';
import {AddPhotoComponent} from '../add-photo/add-photo.component';
import {ContextMenuComponent} from 'ngx-contextmenu';


@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent {
    photos: any[] = [];
    albums: any[] = [];
    paramId: string;
    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

    constructor(private portal: Portal, route: ActivatedRoute, public dialog: MatDialog) {
        this.paramId = route.snapshot.params.id;
        this.portal.getPhotos(this.paramId)
            .subscribe((data: any) => this.photos = data.photos);
        this.portal.getAlbums()
            .subscribe((data: any) => this.albums = data.albums);
    }

    copyPhoto(photo, album): void {
        this.portal.updatePhoto({photo: photo, data: {album_id: album}})
            .subscribe((data: any) => {
                if (data.message === 'success') {
                    this.portal.getPhotos(this.paramId)
                        .subscribe((data: any) => this.photos = data.photos);
                }
            });
    }

    movePhoto(photo, album): void {
        this.portal.updatePhoto({photo: photo, data: {album_id: album}})
            .subscribe((data: any) => {
                if (data.message === 'success') {
                    this.portal.getPhotos(this.paramId)
                        .subscribe((data: any) => this.photos = data.photos);
                }
            });
    }

    addPhoto() {
        const dialogRef = this.dialog.open(AddPhotoComponent, {
            width: '300px',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                result.album_id = this.paramId;
                this.portal.addPhoto(result)
                    .subscribe((data: any) => {
                        if (data.message === 'success') {
                            this.portal.getPhotos(this.paramId)
                                .subscribe((data: any) => this.photos = data.photos);
                        }
                    });
            }
        });
    }
}
