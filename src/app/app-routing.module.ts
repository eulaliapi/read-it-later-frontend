import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationLoginFormComponent } from './components/registration-login-form/registration-login-form.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/signup', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: RegistrationLoginFormComponent},
  {path: '**', component: HomeComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
