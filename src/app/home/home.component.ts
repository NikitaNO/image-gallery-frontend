import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Portal} from '../app.services';
import {AddAlbumComponent} from '../add-album/add-album.component';
import 'rxjs/add/operator/mergeMap';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    albums: any[] = [];

    constructor(private portal: Portal, public dialog: MatDialog) {

    }

    addAlbum() {
        const dialogRef = this.dialog.open(AddAlbumComponent, {
            width: '300px',
            disableClose: true,
        });

        dialogRef.afterClosed()
            .flatMap((res) => res && this.portal.createAlbum(res.file, res.data))
            .flatMap((album) => this.portal.getAlbums())
            .subscribe((data: any) => this.albums = data.albums);
    }

    ngOnInit(): void {
        this.portal.getAlbums()
            .subscribe((data: any) => this.albums = data.albums);
    }
}
