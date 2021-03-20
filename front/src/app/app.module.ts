import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EssaiComponent } from './essai/essai.component';

import { HttpClientModule } from '@angular/common/http';
import { LaMuseExecComponent } from './la-muse-exec/la-muse-exec.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChoiceComponent } from './choice/choice.component';
import { AddToSvgDirective } from './welcome/add-to-svg.directive';

import { FilesChoicesComponent } from './files-choices/files-choices.component';
import { LaMuseExecCustomComponent } from './la-muse-exec-custom/la-muse-exec-custom.component';

@NgModule({
  declarations: [
    AppComponent,
    EssaiComponent,
    LaMuseExecComponent,
    WelcomeComponent,
    ChoiceComponent,
    AddToSvgDirective,

    FilesChoicesComponent,

    LaMuseExecCustomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
