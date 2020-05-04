import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './notes/note/note.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,
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
