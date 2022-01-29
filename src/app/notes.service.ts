import { Injectable } from '@angular/core';
import { iNote } from './notepad/notepad.component';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

noteList:iNote[]=[]

addNote(a:iNote){
  this.noteList.push(a)
}



}
