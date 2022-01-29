import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LanguageService } from '../language.service';

@Component({
    selector: 'app-code-form',
    templateUrl: './code-form.component.html',
    styleUrls: ['./code-form.component.css'],
    styles: [
        `
        @media only screen and (max-width: 767px) { 
       .container{
        width: 75%;
        float: right;
        max-width: calc(100% - 120px);
       }
    }
        
        `
      ]
})

export class CodeFormComponent implements OnInit {
    constructor(private http: HttpClient, private language:LanguageService) { 
        this.language.languageNumber.subscribe(x=>this.languageNumber=x)
    }

    ngOnInit(): void {
    }

    allowSubmit = true;
    breakTimer = 5;
    number = 3
    defaultText = "Parašykite tekstą, kurį norite užkoduoti"
    defaultText2 = ["Write Your text here" ,"Parašykite tekstą, kurį norite užkoduoti"]
    codedText = ""
    defaultTextBlank = ["Your ciphered text will be here" ,"Koduotas tekstas atsiras čia"]
    defaultValue = "rail"
    errorMessage = '';
    languageNumber=this.language.getLanguage()
    button=["Cipher", "Užkoduoti"]
    buttonRepeat=["Cipher again in", "Pakartotinai koduoti už"]



    optionsAndLinks = [
        { codeOption: 'square', optionLink: 'https://pagrindinis123.herokuapp.com/cryptoSq', ltname: 'Kvadrato kodas', enname:'Square cipher' },
        { codeOption: 'decSquare', optionLink: 'https://pagrindinis123.herokuapp.com/cryptoDec', ltname: 'Dekoduoti kvadrato kodą' , enname:'Decode square cipher'},
        { codeOption: 'rail', optionLink: 'https://pagrindinis123.herokuapp.com/railEncode', ltname: 'Tvoros kodas', enname:'Rail fence cipher' },
        { codeOption: 'decrail', optionLink: 'https://pagrindinis123.herokuapp.com/railDecode', ltname: 'Dekoduoti tvoros kodą', enname:'Decode rail fence cipher' },

    ]

    submitForm(form: NgForm) {

        this.allowSubmit = false
        
        let that=this
       
        for (let x of this.optionsAndLinks) {
            if (form.value.tipas == x.codeOption) {
                this.http.post<string>(x.optionLink, form.value, {responseType: 'text' as 'json'}).subscribe({
                    next: data => {
                        setTimeout(function(){ that.allowSubmit=true; that.breakTimer=5 }, 5000);
                        setTimeout(function(){ that.breakTimer=1 }, 4000)
                        setTimeout(function(){ that.breakTimer=2 }, 3000)
                        setTimeout(function(){ that.breakTimer=3 }, 2000)
                        setTimeout(function(){ that.breakTimer=4 }, 1000)
                        this.codedText=data;
                    },
                    error: error => {
                        setTimeout(function(){ that.allowSubmit=true; that.breakTimer=5 }, 5000);
                        setTimeout(function(){ that.breakTimer=1 }, 4000)
                        setTimeout(function(){ that.breakTimer=2 }, 3000)
                        setTimeout(function(){ that.breakTimer=3 }, 2000)
                        setTimeout(function(){ that.breakTimer=4 }, 1000)
                        this.errorMessage = error.message;
                        console.error('There was an error!', error);
                    }
                })
            }
        }

     
        
        //this.allowSubmit = true
    }



}

