import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {merge} from 'rxjs/observable/merge';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material/dialog';
import {Portal} from '../app.services';
import {CarouselModalComponent} from '../carousel-modal/carousel-modal.component';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    public search = new FormControl();
    private closeSubject = new Subject();
    public searchData: Observable<any>;
    public photo_url: string = environment.photo_url;

    constructor(private portal: Portal,
                public dialog: MatDialog) {
        this.searchData = merge(
            this.search.valueChanges
                .filter((el) => !!el)
                .debounceTime(500)
                .distinctUntilChanged()
                .switchMap((name) => this.portal.search(name))
                .map((data) => data.result),
            this.closeSubject.asObservable()
        );
    }

    close(): void {
        this.search.reset();
        this.closeSubject.next(null);
    }

    imageClick(photo, id): void {
        const dialogRef = this.dialog.open(CarouselModalComponent, {
            data: {photos: [photo], start: id},
            width: '80%',
        });
        dialogRef.afterClosed()
            .subscribe((res) => console.log(res));
    }
}
