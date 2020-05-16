import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from 'aws-amplify';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  validateForm: FormGroup;
  isSpinning = false;
  isEditing = false;
  isLoading = false;
  file: any;

  constructor(private fb: FormBuilder,
    private message: NzMessageService, 
    private route: Router,
    private activetedRoute: ActivatedRoute,
    private noteService: NotesService) { }

  async submitForm() {    
    let attachment;
    let response;
    this.isSpinning = true;

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

      if(this.file){ 

        try {
          response = await this.noteService.s3Upload(this.file);

          this.validateForm.value.attachment = response['key'];
        } catch(error) {
          this.message.error(error.message);
        }
      }
    
  
    if(this.isEditing){
      this.noteService.updateNote(this.validateForm.value)
      .then(response => {
        this.isSpinning = false;
        this.route.navigate(['/home']);
      })
      .catch(error => {
        this.isSpinning = false;
        this.message.create('error', error.message);
      });
    
    } else {
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

  
  ngOnInit(): void {

    this.isSpinning = true;

    this.validateForm = this.fb.group({
      noteId: this.fb.control(''),
      content: [null, [Validators.required]],
      attachment : [null],
      attachmentUrl : [null]
    });


    if(this.activetedRoute.snapshot.params['id']){
      this.isEditing = true;
      this.isLoading = true;

      this.noteService.ListOne(this.activetedRoute.snapshot.params['id'])
      .then(response => {
        this.validateForm.patchValue(response);

        if(this.validateForm.value.attachment){
          Storage.vault.get(this.validateForm.value.attachment)
          .then(response => {
            this.validateForm.value.attachmentUrl = response;
          })
          .catch(error => this.message.error('Erro ao carregar Anexo!'));
        }

        this.isSpinning = false;
        this.isLoading = false;

      })
      .catch(error => {
          this.message.create('error', error.message);
          this.isSpinning = false;
          this.isLoading = false;
        } 
      );
    };
    if((this.isSpinning) && (!this.isLoading)){
      this.isSpinning = false;
    }
  }

  handleFileChange(event) {
    this.file = event.target.files[0];
  }

}
