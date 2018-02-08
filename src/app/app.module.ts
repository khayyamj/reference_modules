import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { MTCExamplesModule } from './+examples/examples.module';
import { MTCCoreModule } from './core.module';
import { MTCCommonModule } from './common.module';
import { SimpleConfirmationComponent } from './dialog/simple-confirmation';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MTCAuthInterceptor } from './mtc-http';
import { PipeModule } from './pipes';
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		routing,
		MTCExamplesModule,
		MTCCoreModule.forRoot(),
		PipeModule,
		MTCCommonModule,
		HttpClientModule
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: MTCAuthInterceptor,
		multi: true,
	}],
	bootstrap: [AppComponent],
	entryComponents: [SimpleConfirmationComponent]
})
export class AppModule { };
