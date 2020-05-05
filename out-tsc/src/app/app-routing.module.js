import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './notes/note/note.component';
const routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'notes', pathMatch: 'full' },
            { path: 'notes', component: NotesComponent },
            { path: 'note', component: NoteComponent },
            { path: 'note/:id', component: NoteComponent },
        ] },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map