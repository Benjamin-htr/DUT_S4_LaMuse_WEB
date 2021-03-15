import { NgModule } from '@angular/core';
import { EssaiComponent } from './essai/essai.component';
import { LaMuseExecComponent } from './la-muse-exec/la-muse-exec.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChoiceComponent } from './choice/choice.component';
import { RouterModule, Routes } from '@angular/router';
//import { AppComponent } from './app.component';

const routes: Routes = [{ path: 'weather', component: EssaiComponent },
                      { path: 'GenerateImages', component: LaMuseExecComponent },
                      { path: 'welcome', component: WelcomeComponent },
                      { path: 'choice', component: ChoiceComponent },
                      {path: '', redirectTo: '/welcome', pathMatch: 'full'},
                      {path: 'welcome/choice', redirectTo: 'choice', pathMatch: 'full'},
                      {path: 'choice/weather', redirectTo: 'weather', pathMatch: 'full'},
                      {path: 'choice/GenerateImages', redirectTo: 'GenerateImages', pathMatch: 'full'}
                    ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
