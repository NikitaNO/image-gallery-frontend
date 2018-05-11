import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-photo',
    templateUrl: './add-photo.component.html',
    styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent {
    public photoForm: FormGroup;
    public fileToUpload: File = null;

    constructor(public dialogRef: MatDialogRef<AddPhotoComponent>,
                private fb: FormBuilder) {
        this.photoForm = this.fb.group({
            title: '',
            description: '',
            hash_tags: '',
            image_file: ['', [Validators.required]]
        });
    }

    imageUpload(e): void {
        this.fileToUpload = e.target.files.item(0);
    }

    addPhoto(): void {
        this.dialogRef.close({
            file: this.fileToUpload,
            data: this.photoForm.value
        });
    }

    closeDialog(): void {
        this.dialogRef.close('');
    }
}
