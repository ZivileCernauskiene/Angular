import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-decode-form',
  templateUrl: './decode-form.component.html',
  styleUrls: ['./decode-form.component.css']
})
export class DecodeFormComponent implements OnInit {

  constructor(private fire:AngularFirestore) { 
    this.fire.collection('Color').valueChanges().subscribe((x:any)=>this.kazkas=x)
  }

  ngOnInit(): void {
    
  }

  kazkas:any[]=[]

  funkciju(){
  console.log(this.kazkas)
  }
}
