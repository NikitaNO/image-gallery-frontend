import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Portal} from '../app.services';
import {AddAlbumComponent} from '../add-album/add-album.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    albums: any[] = [];

    constructor(private portal: Portal, public dialog: MatDialog) {
        this.portal.getAlbums()
            .subscribe((data: any) => this.albums = data.albums);
    }

    addAlbum() {
        const dialogRef = this.dialog.open(AddAlbumComponent, {
            width: '300px',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.portal.createAlbum(result)
                    .subscribe((data: any) => {
                        if (data.message === 'success') {
                            this.portal.getAlbums()
                                .subscribe((data: any) => this.albums = data.albums);
                        }
                    });
            }
        });
    }
}
