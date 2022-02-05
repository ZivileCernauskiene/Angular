import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'section',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private language:LanguageService) {
    language.languageNumber.subscribe(x=>{
      this.languageNumber=x
      this.rotateText(this.test[this.languageNumber-1],200,10)
    })
   }

  ngOnInit(): void {
    
  }
  languageNumber=this.language.getLanguage()

  h1=["I am Živilė, this is a place for my most exciting projects", "Aš esu Živilė. Šiame tinklapyje įkelti įdomiausi mano daryti projektai"]
  h2=["More about Me", "Daugiau apie mane"]
  test=["Pirmas", "Testx asdas"]
  
  
  
  
  rotateText(text:string, radius:number, deg:number){
    let classIndex=0
    let txt=text.split("")
    
    let element = document.getElementsByClassName("classText")[classIndex]
    
    let origin=-65
    
    txt.forEach(x=>{
      let b=`<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%'>${x}</p>`;
      element.innerHTML+=b
      origin+=deg
      
    })
  }
  
}
