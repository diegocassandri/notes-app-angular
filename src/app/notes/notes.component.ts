import { Component, OnInit } from '@angular/core';
import Amplify, { API } from 'aws-amplify';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NotesService } from './notes.service';
import { Note } from './notes.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];

  loading = true;

  constructor(private message: NzMessageService,private route: Router, private noteService: NotesService) { }

  ngOnInit(): void {
    this.noteService.ListAll().then(data => {
      this.notes = data;
      this.loading = false;
    }).catch(error => this.message.create('error',error.message));
  }

  confirm(note: Note){
    this.loading = true;
    this.noteService.deleteNote(note)
    .then(response => {
      this.notes.splice(this.notes.indexOf(note),1);
      this.loading = false;
    })
    .catch(error => {
      this.message.create('error', error.message);
      this.loading = false;
    });
  }
}

