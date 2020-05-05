import { __decorate } from "tslib";
import { Component } from '@angular/core';
let NotesComponent = class NotesComponent {
    constructor(message, route, noteService) {
        this.message = message;
        this.route = route;
        this.noteService = noteService;
        this.notes = [];
        this.loading = true;
    }
    ngOnInit() {
        this.noteService.ListAll().then(data => {
            this.notes = data;
            this.loading = false;
            console.log(data);
        }).catch(error => this.message.create('error', error.message));
    }
    confirm(note) {
        this.loading = true;
        this.noteService.deleteNote(note)
            .then(response => {
            this.notes.splice(this.notes.indexOf(note), 1);
            this.loading = false;
        })
            .catch(error => {
            this.message.create('error', error.message);
            this.loading = false;
        });
    }
};
NotesComponent = __decorate([
    Component({
        selector: 'app-notes',
        templateUrl: './notes.component.html',
        styleUrls: ['./notes.component.css']
    })
], NotesComponent);
export { NotesComponent };
//# sourceMappingURL=notes.component.js.map