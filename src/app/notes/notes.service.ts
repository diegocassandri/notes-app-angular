import { Injectable } from '@angular/core';
import Amplify, { API, Storage} from 'aws-amplify';
import {Note} from './notes.model'; 

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  ListAll() {
    return API.get('notes', '/notes', {});
  }

  ListOne(id: string) {
    return API.get("notes", `/notes/${id}`,{});
  }

  saveNote(note: Note){
    return API.post("notes", "/notes", {
      body: note
    });
  }

  updateNote(note: Note) {
    return API.put("notes", `/notes/${note.noteId}`, {
      body: note
    });
  }

  deleteNote(note: Note){
    return API.del("notes", `/notes/${note.noteId}`,{})
  }


  s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;

    return Storage.vault.put(filename, file, {
      contentType: file.type
    });
  }

  gerUrl(attachment: string) {
    return Storage.vault.get(attachment);
  }
}
