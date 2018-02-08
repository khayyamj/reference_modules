import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { MTCAPIVersionsComponent } from './mtc-api-versions';

@Component({
	selector: 'mtc-env',
	template: 	`<div id="env-container" *ngIf="showVersion()">
					<div id="environment" [class.prod]="envIs('prod')" [class.support]="envIs('support')" [class.beta]="envIs('beta')" [class.stage]="envIs('stage')" [class.test]="envIs('test2')" [class.dev]="envIs('test1') || envIs('dev')">{{env}}</div>
					<div id="version" (click)="openEndpointVersions()" *ngIf="includeVersion">{{version}}</div>
				</div>
	`,
	styles: [`
		#env-container {
			position: fixed;
			bottom: 10px;
			left: 10px;
			z-index:10000000000000;
		}

		#env-container > div {
			padding-left: 5px;
			padding-right: 5px;
			padding-top: 3px;
			padding-bottom: 3px;
			color: #FFFFFF;
			display:inline;
		}

		#environment {
			margin-right:5px
		}
		#version {
			background-color:#000000;
		}
		.support {
			background-color:#FF9933;
		}
		.stage {
			background-color:#FFCC33;
		}
		.beta {
			background-color:#66CC66;
		}
		.test {
			background-color:#6699CC;
		}
		.dev {
			background-color: #BA68C8;
		}
		.prod {
			background-color: #000000;
		}
	`]
})
export class MTCEnvComponent implements OnInit {
	env = 'dev';
	version = 'v0.0.0';
	canOpenDialog = true;
	@Input() includeVersion: boolean;
	@Input() apiUrls: string[] = [];
	includeInProd = false;

	constructor(private http: HttpClient,
				private dialog:MatDialog) {}

	ngOnInit() {
		const href = window.location.href;
		if (href.includes('//cdn.mtc.byu.edu') || href.includes('//apps.mtc.byu.edu')) {
			this.env = 'prod';
			let timesPressed = 0;
        	let timer: any = null;
			const resetTimer = function(){
	            timesPressed = 0;
	            clearTimeout(timer);
	            timer = null;
        	}
        	window.addEventListener('keyup', (event) => {
            	// 220 is the '|' (pipe) key
            	if(event.keyCode === 220) {
                	timesPressed++;
                	if(timesPressed === 1){
                    	timer = setTimeout(() => {
                        	resetTimer();
                    	}, 3000);
                	}
                	if(timesPressed >= 3) {
                    	this.includeInProd = !this.includeInProd;
                    	resetTimer();
                	}
            	}
        	});
		} else if (href.includes('//support-apps.mtc.byu.edu')) {
			this.env = 'support';
		} else if (href.includes('//test1.mtc.byu.edu')) {
			this.env = 'test1';
		} else if (href.includes('//test-apps.mtc.byu.edu') || href.includes('//test2.mtc.byu.edu')) {
			this.env = 'test2';
		} else if (href.includes('//stage-apps.mtc.byu.edu') || href.includes('//stage.mtc.byu.edu')) {
			this.env = 'stage';
		} else if (href.includes('//beta-apps.mtc.byu.edu')) {
			this.env = 'beta';
		} else {
			this.env = 'dev';
		}
		if(this.includeVersion){
			this.http.get('assets/version.json').subscribe(
				(v: any) => this.version = v.version,
				(err: any) => console.log(`You've decided to include the version # but the application is missing a version.json file`)
			);
		}
	}

	envIs(env: string){
		return this.env === env;
	}

	showVersion(){
		return !this.envIs('prod') || this.includeInProd;
	}
	openEndpointVersions(){
		if(this.canOpenDialog && this.apiUrls.length) {
			this.canOpenDialog = false;
			this.dialog.open(MTCAPIVersionsComponent,{
				width:'300px',
				data:this.apiUrls
			}).afterClosed().subscribe(()=>{
				this.canOpenDialog = true;
			});
		}
	}
}
