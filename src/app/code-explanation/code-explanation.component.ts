import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-code-explanation',
  templateUrl: './code-explanation.component.html',
  styleUrls: ['./code-explanation.component.css'],
  
  styles: [
    `
    @media only screen and (max-width: 767px) { 
   .container{
    width: 75%;
    float: right;
    max-width: calc(100% - 120px);
   }
   .listing {
    width: unset;
}
p {
    width: auto;
}
}
    
    `
  ]
})
export class CodeExplanationComponent implements OnInit {

  constructor(private language:LanguageService) {
    this.language.languageNumber.subscribe( x=>this.languageNumber= x )
   }

  ngOnInit(): void {
  }
  languageNumber=this.language.getLanguage()
  
  h1=["Simple cipher using my own API", "Paprastasis šifravimas, naudojant mano API"]
  h2=["This page gives you a chance to cipher your text some basic ways:", "Šiame puslapyje rasite galimybę užkoduoti savo norimą tekstą keliais paprastais būdais:"]
  li1=["Square cipher. This cipher depends only on the size of your text. Spaces and punctuation is ignored. Text is transformed to lowercase.", "Kvadrato kodas priklauso tik nuo teksto ilgio (programa ignoruoja tarpus ir automatiškai verčia tekstą į mažąsias raides)."]
  li2=["Rail fence cipher depends on number of rails. Having 1 rail or more rails than letters will return the same text. Spaces and punctuation is ignored. Text is transformed to lowercase.", "Tvoros kodas (rail fence cipher) koduoja pagal jūsų pasirinktą 'tvoros' plotį (kai plotis 1 arba mažesnis už teksto ilgį, grąžinamas tas pats tekstas(be tarpų ir didžiųjų raidžių))"]

}
