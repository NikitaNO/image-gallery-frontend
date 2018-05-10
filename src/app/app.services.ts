import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class Portal {
    constructor(private _http: HttpClient) {
    }

    getAlbums(): Observable<any> {
        return this._http.get(`${environment.base_url}/albums`);
    }
    search(name): Observable<any> {
        return this._http.get(`${environment.base_url}/search?name=${name}`);
    }
    createAlbum(fileToUpload: File, data: any): Observable<any> {
        const formData: FormData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('cover_image', fileToUpload, fileToUpload.name);
        return this._http
            .post(`${environment.base_url}/albums`, formData);
    }

    getPhotos(id): Observable<any> {
        return this._http.get(`${environment.base_url}/photos/${id}`);
    }

    addPhoto(fileToUpload: File, data: any) {
        const formData: FormData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('image_file', fileToUpload, fileToUpload.name);
        return this._http
            .post(`${environment.base_url}/photos`, formData);
    }

    copyPhoto(photo): Observable<any> {
        return this._http.post(`${environment.base_url}/photos/copy`, photo);
    }

    updatePhoto(body): Observable<any> {
        return this._http.post(`${environment.base_url}/photos/update`, body);
    }

    removePhoto(id): Observable<any> {
        return this._http.delete(`${environment.base_url}/photos/${id}`);
    }
}
