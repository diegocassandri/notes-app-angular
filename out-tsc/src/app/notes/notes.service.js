import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { API, Storage } from 'aws-amplify';
let NotesService = class NotesService {
    constructor() { }
    ListAll() {
        return API.get('notes', '/notes', {});
    }
    ListOne(id) {
        return API.get("notes", `/notes/${id}`, {});
    }
    saveNote(note) {
        return API.post("notes", "/notes", {
            body: note
        });
    }
    updateNote(note) {
        return API.put("notes", `/notes/${note.noteId}`, {
            body: note
        });
    }
    deleteNote(note) {
        return API.del("notes", `/notes/${note.noteId}`, {});
    }
    s3Upload(file) {
        const filename = `${Date.now()}-${file.name}`;
        return Storage.vault.put(filename, file, {
            contentType: file.type
        });
    }
    gerUrl(attachment) {
        return Storage.vault.get(attachment);
    }
};
NotesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NotesService);
export { NotesService };
//# sourceMappingURL=notes.service.js.map