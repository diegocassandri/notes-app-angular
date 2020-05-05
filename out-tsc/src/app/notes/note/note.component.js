import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Storage } from 'aws-amplify';
let NoteComponent = class NoteComponent {
    constructor(fb, message, route, activetedRoute, noteService) {
        this.fb = fb;
        this.message = message;
        this.route = route;
        this.activetedRoute = activetedRoute;
        this.noteService = noteService;
        this.isSpinning = false;
        this.isEditing = false;
    }
    submitForm() {
        let attachment;
        this.isSpinning = true;
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        if (this.file) {
            console.log('Tem Arquivo');
            this.noteService.s3Upload(this.file)
                .then(response => {
                console.log(response);
                this.validateForm.value.attachment = response;
                console.log(this.validateForm.value.attachment);
            })
                .catch(error => this.message.error(error.message));
        }
        if (this.isEditing) {
            this.noteService.updateNote(this.validateForm.value)
                .then(response => {
                this.isSpinning = false;
                this.route.navigate(['/home']);
            })
                .catch(error => {
                this.isSpinning = false;
                this.message.create('error', error.message);
            });
        }
        else {
            this.noteService.saveNote(this.validateForm.value)
                .then(response => {
                this.isSpinning = false;
                this.route.navigate(['/home']);
            })
                .catch(error => {
                this.isSpinning = false;
                this.message.create('error', error.message);
            });
        }
    }
    ngOnInit() {
        this.validateForm = this.fb.group({
            noteId: this.fb.control(''),
            content: [null, [Validators.required]],
            attachment: [null],
            attachmentUrl: [null]
        });
        if (this.activetedRoute.snapshot.params['id']) {
            this.isEditing = true;
            this.noteService.ListOne(this.activetedRoute.snapshot.params['id'])
                .then(response => {
                this.validateForm.patchValue(response);
                if (this.validateForm.value.attachment) {
                    Storage.vault.get(this.validateForm.value.attachment)
                        .then(response => {
                        this.validateForm.value.attachmentUrl = response;
                    })
                        .catch(error => this.message.error('Erro ao carregar Anexo!'));
                }
            })
                .catch(error => this.message.create('error', error.message));
        }
    }
    handleFileChange(event) {
        console.log(event);
        this.file = event.target.files[0];
        console.log(this.file);
    }
};
NoteComponent = __decorate([
    Component({
        selector: 'app-note',
        templateUrl: './note.component.html',
        styleUrls: ['./note.component.css']
    })
], NoteComponent);
export { NoteComponent };
//# sourceMappingURL=note.component.js.map