import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-meniu',
  templateUrl: './meniu.component.html',
  styleUrls: ['./meniu.component.css']
})
export class MeniuComponent implements OnInit {

  constructor(private language:LanguageService, private title:Title) { }

  ngOnInit(): void {
  }
  languageNumber=this.language.getMeniuLanguage()
  languageList=["LT", "EN"]
  
  main=[ "Pagrindinis", "Main"]
  code=["Kodavimas", "Cipher"]
  note=[ "Užrašai", "Notes"]
  contact=["Kontaktai", "Contacts"]
  memory=["Memory game", "Žaidimas"]
  
  setLanguage(){
    if(this.languageNumber==1){
      this.language.setLanguage(1)
      this.languageNumber=2
      this.title.setTitle("En Page")
    }
    else {
      this.language.setLanguage(2)
      this.languageNumber=1
      this.title.setTitle("Lt Page")
    }
  }


}
