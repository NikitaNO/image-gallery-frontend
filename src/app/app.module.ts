import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ContextMenuModule, ContextMenuService} from 'ngx-contextmenu';

import {Portal} from './app.services';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';
import {AddPhotoComponent} from './add-photo/add-photo.component';
import {AddAlbumComponent} from './add-album/add-album.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        AlbumComponent,
        AddPhotoComponent,
        AddAlbumComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ContextMenuModule,
        MatInputModule,
        MatButtonModule
    ],
    entryComponents: [
        AddPhotoComponent,
        AddAlbumComponent
    ],
    providers: [Portal, ContextMenuService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
