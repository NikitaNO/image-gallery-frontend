import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Portal} from '../app.services';
import {AddAlbumComponent} from '../add-album/add-album.component';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/mergeMap';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public albums: any[] = [];
    public photo_url: string = environment.photo_url;

    constructor(private portal: Portal,
                public dialog: MatDialog,
                public snackBar: MatSnackBar) {
    }

    addAlbum() {
        const dialogRef = this.dialog.open(AddAlbumComponent, {
            width: '300px',
            disableClose: true,
        });

        dialogRef.afterClosed()
            .flatMap((res) => res && this.portal.createAlbum(res.file, res.data))
            .flatMap((album) => this.portal.getAlbums())
            .subscribe((data) => {
                this.albums = data.albums;
                this.snackBar.open(
                    'Successfully Created',
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

    ngOnInit(): void {
        this.portal.getAlbums()
            .subscribe((data) => {
                this.albums = data.albums;
            }, (err) => {
                this.snackBar.open(
                    'Server Error',
                    'HIDE',
                    {duration: 9000}
                );
            });
    }
}
