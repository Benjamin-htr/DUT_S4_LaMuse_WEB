import { NgModule } from '@angular/core';
import { LaMuseExecComponent } from './la-muse-exec/la-muse-exec.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChoiceComponent } from './choice/choice.component';
import { FilesChoicesComponent } from './files-choices/files-choices.component';
import { LaMuseExecCustomComponent } from './la-muse-exec-custom/la-muse-exec-custom.component';
import { RouterModule, Routes } from '@angular/router';
//import { AppComponent } from './app.component';

const routes: Routes = [
                      { path: 'GenerateImages', component: LaMuseExecComponent },
                      { path: 'welcome', component: WelcomeComponent },
                      { path: 'mode-choice', component: ChoiceComponent },
                      { path: 'files-choices', component: FilesChoicesComponent },
                      { path: 'CustomGeneration', component: LaMuseExecCustomComponent },
                      {path: '', redirectTo: '/welcome', pathMatch: 'full'},                     
                      {path: 'welcome/mode-choice', redirectTo: 'mode-choice', pathMatch: 'full'},
                      {path: 'mode-choice/weather', redirectTo: 'weather', pathMatch: 'full'},
                      {path: 'mode-choice/GenerateImages', redirectTo: 'GenerateImages', pathMatch: 'full'},
                      {path: 'mode-choice/files-choices', redirectTo: 'files-choices', pathMatch: 'full'},
                      {path: 'files-choices/CustomGeneration', redirectTo: 'CustomGeneration', pathMatch: 'full'},
                      {path: 'CustomGeneration/mode-choice', redirectTo: 'mode-choice', pathMatch: 'full'},
                      {path: 'GenerateImages/mode-choice', redirectTo: 'mode-choice', pathMatch: 'full'}
                    ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
