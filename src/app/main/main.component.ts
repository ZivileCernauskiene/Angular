import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'section',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private language:LanguageService) {
    language.languageNumber.subscribe(x=>this.languageNumber=x)
   }

  ngOnInit(): void {
  }
  languageNumber=this.language.getLanguage()

  h1=["I am Živilė, this is a place for my most exciting projects", "Aš esu Živilė. Šiame tinklapyje įkelti įdomiausi mano daryti projektai"]
  h2=["More about Me", "Daugiau apie mane"]
  
}
