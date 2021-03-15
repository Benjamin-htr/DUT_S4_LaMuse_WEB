import { NgModule } from '@angular/core';
import { EssaiComponent } from './essai/essai.component';
import { LaMuseExecComponent } from './la-muse-exec/la-muse-exec.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{ path: 'weather', component: EssaiComponent },
                      { path: 'GenerateImages', component: LaMuseExecComponent }
                      //{path: '', redirectTo: '/weather', pathMatch: 'full'}
                    ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
