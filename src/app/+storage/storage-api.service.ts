import { Injectable } from '@angular/core';

// import {MTCHttp} from '../mtc-http/mtc-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class StorageApiService {

	constructor(private http: HttpClient) {}

	submitFile (file) {
		if (!file) {
			return;
		}
		const headers = new HttpHeaders().set('Content-Type', file.type);
		return this.http.post('https://api.mtc.byu.edu/storage/v1',file,{headers:headers});
	}
}
