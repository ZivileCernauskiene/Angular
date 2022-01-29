import { Component, OnInit } from '@angular/core';

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
   

}
    
    `
  ]
  
})
export class KontaktaiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
}
