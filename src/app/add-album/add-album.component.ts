import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-album',
    templateUrl: './add-album.component.html',
    styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent {
    albumForm: FormGroup;
    fileToUpload: File = null;

    constructor(public dialogRef: MatDialogRef<AddAlbumComponent>,
                private fb: FormBuilder) {
        this.albumForm = this.fb.group({
            name: ['', [Validators.required]],
            description: '',
            location: ['', [Validators.required]],
            cover_image: ['', [Validators.required]]
        });
    }

    imageUpload(e) {
        this.fileToUpload = e.target.files.item(0);
    }

    addAlbum() {
        this.dialogRef.close(this.albumForm.value);
    }

    closeDialog() {
        const formData: FormData = new FormData();
        formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
        this.dialogRef.close(formData);
    }
}
