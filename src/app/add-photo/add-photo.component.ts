import {Component, Inject, Optional} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as cloneDeep from 'lodash.clonedeep';

@Component({
    selector: 'app-add-photo',
    templateUrl: './add-photo.component.html',
    styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent {
    public photoForm: FormGroup;
    private photo: any;
    public fileToUpload: File = null;

    constructor(public dialogRef: MatDialogRef<AddPhotoComponent>,
                @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FormBuilder) {
        console.log('add photo', data);
        this.photoForm = this.fb.group({
            title: '',
            description: '',
            hash_tags: '',
            image_file: ['', [Validators.required]]
        });
        if (data) {
            this.photo = cloneDeep(this.data);
            this.photoForm.setValue({
                title: data.title,
                description: data.description,
                hash_tags: data.hash_tags,
                image_file: ''
            });
        }
    }

    imageUpload(e) {
        this.fileToUpload = e.target.files.item(0);
    }

    addAlbum() {
        const result = this.photoForm.value;
        this.dialogRef.close({
            file: this.fileToUpload,
            data: this.data ? Object.assign(this.photo, result) : result
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
