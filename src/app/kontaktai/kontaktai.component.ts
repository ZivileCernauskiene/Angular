import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-kontaktai',
  templateUrl: './kontaktai.component.html',
  styleUrls: ['./kontaktai.component.css'],
  styles: [
    `
    @media only screen and (max-width: 767px) { 
   .container{
    width: 75%;
    float: right;
    max-width: calc(100% - 120px);
    flex-direction: column;
   }
   .map {
    
    width: 300px;
    height:300px;
   }
   

}
    
    `
  ]
  
})
export class KontaktaiComponent implements OnInit {

  constructor(private language:LanguageService) {
    this.language.languageNumber.subscribe(x=>this.languageNumber=x)
   }

  ngOnInit(): void {
  }
  languageNumber=this.language.getLanguage();
  time=["Working hours:", "Darbo laikas: "]
  
  
}
