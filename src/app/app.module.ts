import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ContextMenuModule, ContextMenuService} from 'ngx-contextmenu';
import {AgmCoreModule} from '@agm/core';
import {NguCarouselModule} from '@ngu/carousel';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatCardModule} from '@angular/material/card';


import {Portal} from './app.services';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';
import {AddPhotoComponent} from './add-photo/add-photo.component';
import {AddAlbumComponent} from './add-album/add-album.component';
import {CarouselModalComponent} from './carousel-modal/carousel-modal.component';
import {EditPhotoComponent} from './edit-photo/edit-photo.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        AlbumComponent,
        AddPhotoComponent,
        AddAlbumComponent,
        CarouselModalComponent,
        EditPhotoComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ContextMenuModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatButtonModule,
        NguCarouselModule,
        MatToolbarModule,
        MatSnackBarModule,
        MaterialFileInputModule,
        MatCardModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBC4lGj7GGEzduY0nV5bgLJFka-CvAZ3ts',
            libraries: ['places']
        })
    ],
    entryComponents: [
        AddPhotoComponent,
        AddAlbumComponent,
        EditPhotoComponent,
        CarouselModalComponent
    ],
    providers: [Portal, ContextMenuService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
