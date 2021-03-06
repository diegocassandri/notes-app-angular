import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './notes/note/note.component';
import { AppAuthGuardService } from './login/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'confirmation', component: ConfirmationComponent},
  { path: 'home', component: HomeComponent, canActivate: [AppAuthGuardService],
    children: [
      {path: '', redirectTo: 'notes', pathMatch: 'full'},
      { path: 'notes', component: NotesComponent},
      { path: 'note', component: NoteComponent},
      { path: 'note/:id', component: NoteComponent},
    ]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
