import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'mtc-api-versions',
	template: `<div class="pop-up" layout="column">
					<strong>API Versions:</strong>
					<div class="url-container" *ngFor="let api of apiInformation">
						<div class="info">API: {{api.title}}</div>
						<div>version: {{api.version}}</div>
					</div>
					<button mat-button class="align-right" (click)="dialogRef.close()">close</button>
				</div>`,
	styles: [`
		.pop-up {
			padding: 20px;
			justify-content: space-around;
		}
		.url-container{
			margin: 10px;
		}
		.align-right{
			align-self:flex-end;
			background:#A7A8AB;
			color:white;
		}

	`]
})
export class MTCAPIVersionsComponent {
	apiInformation: any = []
	constructor(public dialogRef: MatDialogRef<any>,
		@Inject(MAT_DIALOG_DATA) private urls: string[],
		private http: HttpClient) {
		this.urls.forEach((url) => {
			this.http.get(url).subscribe((versionObject) => {
				this.apiInformation.push({
					title: versionObject['Implementation-Title'],
					version: versionObject['Implementation-Version'].match(/([1-9]+[0-9]*)\.*|(0\.)|(0$)/g).join('')
				});
			});
		});
	}

}
