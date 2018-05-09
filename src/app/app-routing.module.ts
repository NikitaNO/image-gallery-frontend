import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'album/:id', component: AlbumComponent},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})

export class AppRoutingModule {
}