import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import {Portal} from '../app.services';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {merge} from 'rxjs/observable/merge';
import "rxjs/add/operator/filter";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public search = new FormControl();
    private closeSubject = new Subject();
    public searchData: Observable<any>;

    constructor(private portal: Portal) {
        this.searchData = merge(this.search.valueChanges
                .filter((el) => !!el)
                .debounceTime(500)
                .distinctUntilChanged()
                .switchMap((name) => this.portal.search(name))
                .map((data) => data.result)
                .do((el) => {
                    console.log(el);
                }),
            this.closeSubject.asObservable()
        );
    }

    close(): void {
        this.search.reset();
        this.closeSubject.next(null);
    }
}
