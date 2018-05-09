import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-photo',
    templateUrl: './add-photo.component.html',
    styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent {
    photoForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<AddPhotoComponent>,
                private fb: FormBuilder) {
        this.photoForm = this.fb.group({
            title: '',
            description: '',
            hash_tags: '',
            image_file: ['', [Validators.required]]
        });
    }

    closeDialog() {
        this.dialogRef.close(this.photoForm.value);
    }
}
