import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';


@Injectable()
export class Portal {
    constructor(private _http: HttpClient) {
    }

    getAlbums() {
        return this._http.get(`${environment.base_url}/albums`);
    }

    createAlbum(body) {
        return this._http.post(`${environment.base_url}/albums`, body);
    }

    getPhotos(id) {
        return this._http.get(`${environment.base_url}/photos/${id}`);
    }

    addPhoto(body) {
        return this._http.post(`${environment.base_url}/photos`, body);
    }

    updatePhoto(body) {
        return this._http.post(`${environment.base_url}/photos/update`, body);
    }

    removePhoto(body) {
        return this._http.delete(`${environment.base_url}/photos`, body);
    }
}
