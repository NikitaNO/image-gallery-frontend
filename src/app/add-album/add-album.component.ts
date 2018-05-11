import {Component, NgZone, ViewChild, OnInit, ElementRef} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';

@Component({
    selector: 'app-add-album',
    templateUrl: './add-album.component.html',
    styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
    public albumForm: FormGroup;
    public fileToUpload: File = null;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild('search')
    public searchElementRef: ElementRef;

    constructor(public dialogRef: MatDialogRef<AddAlbumComponent>,
                private fb: FormBuilder,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        this.albumForm = this.fb.group({
            name: ['', [Validators.required]],
            description: '',
            location: ['', [Validators.required]],
            cover_image: ['', [Validators.required]]
        });

        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        this.searchControl = new FormControl();
        this.setCurrentPosition();

        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                    this.albumForm.patchValue({
                        location: {lat: this.latitude, lng: this.longitude}
                    });
                });
            });
        });
    }

    private setCurrentPosition(): void {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    imageUpload(e): void {
        this.fileToUpload = e.target.files.item(0);
    }

    addAlbum(): void {
        this.dialogRef.close({file: this.fileToUpload, data: this.albumForm.value});
    }

    closeDialog(): void {
        this.dialogRef.close('');
    }
}
