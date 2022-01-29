import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  languageNumber : EventEmitter<any>= new EventEmitter()

  language=2
  storedLanguage=localStorage.getItem('language')
  setLanguage(a:number){
    this.languageNumber.emit(a)
    this.language=a
    localStorage.setItem('language', a.toString());
  }
  getLanguage():number{
    if(Number(this.storedLanguage)){
      return Number(this.storedLanguage)
    }
    else return this.language
  }
  getMeniuLanguage(){
    if(Number(this.storedLanguage)==1){
      return 2
    }
    else return 1
  }
}
