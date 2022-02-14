import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-note-explanation',
  templateUrl: './note-explanation.component.html',
  styleUrls: ['./note-explanation.component.css']
})
export class NoteExplanationComponent implements OnInit {

  constructor(private language:LanguageService) { }

  ngOnInit(): void {
  }
  languageNumber=this.language.getLanguage();

  
}
