import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'section',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  styles: [
    `
    @media only screen and (max-width: 767px) { 
   .container{
    width: 100%;
    float: right;
    max-width: calc(100% - 60px);
   }
   .container img {
     width: 300px;
   }
   .button {
    height: 60px;
    width: 100px;
    font-size: 15px;
   }
 

}
    
    `
  ]
})
export class MainComponent implements OnInit {

  constructor(private language: LanguageService) {
    language.languageNumber.subscribe(x => {
      this.languageNumber = x

    })
  }

  ngOnInit(): void {

  }
  languageNumber = this.language.getLanguage()

  h1 = ["I am Živilė, this is a place for my most exciting projects", "Aš esu Živilė. Šiame tinklapyje įkelti įdomiausi mano daryti projektai"]
  h2 = ["More about Me", "Daugiau apie Mane"]
  test = ["Pirmas", "Testx asdas"]

  img = ["../../assets/enPic.jpg", "../../assets/ltPic.jpg"]


  rotateText(text: string, radius: number, deg: number) {
    let classIndex = 0
    let txt = text.split("")

    let element = document.getElementsByClassName("classText")[classIndex]

    let origin = -65

    txt.forEach(x => {
      let b = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%'>${x}</p>`;
      element.innerHTML += b
      origin += deg

    })
  }

}
