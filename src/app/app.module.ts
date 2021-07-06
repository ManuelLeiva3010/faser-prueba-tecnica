import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,

	],
	entryComponents: [
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ToastrModule.forRoot(),
		MatDialogModule,
		BrowserAnimationsModule,
		FormsModule
	],
	providers: [AppService],
	bootstrap: [AppComponent]
})	
export class AppModule { }
