import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/authenticate/login/login.component';
import { LandingPageComponent } from './main/landing/landing-page/landing-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
