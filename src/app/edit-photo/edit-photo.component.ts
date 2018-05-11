import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as cloneDeep from 'lodash.clonedeep';

@Component({
    selector: 'app-edit-photo',
    templateUrl: './edit-photo.component.html',
    styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {
    public photoForm: FormGroup;
    private photo: any;

    constructor(public dialogRef: MatDialogRef<EditPhotoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.photo = cloneDeep(this.data);
        this.photoForm = this.fb.group({
            title: '',
            description: '',
            hash_tags: '',
        });
        this.photoForm.setValue({
            title: this.data.title,
            description: this.data.description,
            hash_tags: this.data.hash_tags,
        });
    }

    addPhoto(): void {
        this.dialogRef.close({photo: this.photo._id, data: this.photoForm.value});
    }

    closeDialog(): void {
        this.dialogRef.close('');
    }

}

