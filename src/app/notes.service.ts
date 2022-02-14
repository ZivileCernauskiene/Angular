import { Injectable } from '@angular/core';
import { iNote } from './notepad/notepad.component';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

noteList:iNote[]=[]
noteId=0
addNote(a:iNote){
  a.fromDb=true
  this.noteList.push(a)
}
editNote(a:iNote){

}
deleteNote(a:iNote){
if(this.noteList.includes(a)){
  let index= this.noteList.indexOf(a)
  alert('sekmingai istrinta' + a.id)
  this.noteList.splice(index,1)
}
}

}
