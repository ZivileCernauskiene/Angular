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
      if(this.languageNumber==2){
        this.text=this.textEn
      }
      else {
        this.text=this.textLt
      }
    })
  }

  ngOnInit(): void {
this.show()
  }
  languageNumber = this.language.getLanguage()

  h1 = ["I am Živilė, this is a place for my most exciting projects", "Aš esu Živilė. Šiame tinklapyje įkelti įdomiausi mano daryti projektai"]
  h2 = ["More about Me", "Daugiau apie Mane"]
  test = ["Pirmas", "Testx asdas"]

  img = ["../../assets/enPic.jpg", "../../assets/ltPic.jpg"]

  text=["Duonos rožė. Verta paragauti", "Bananai, sudėti kažkur dubenėlyje", "Linksmosios dešrelės"]
  textLt=["asd", "antasrsd", "trecias"]
  textEn=["en1", "en2", "en3"]
  images=["../../assets//img/a.jpg", "../../assets//img/b.jpg","../../assets//img/c.jpg"]

  slideIndex=0
  
  show(){
    if(this.slideIndex>this.images.length-1){
      this.slideIndex=0
    }
    
   this.slideIndex++
    
    let that=this
    
    setTimeout(function()  {
        that.show()
      }, 2000);

  }
}
