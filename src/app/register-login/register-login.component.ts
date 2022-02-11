import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private fire:AngularFirestore, private auth:AngularFireAuth) { 
    
  }

  ngOnInit(): void {
  }
  
  a='username'
  registerForm= this.fb.group({
    username:['', [Validators.required, Validators.minLength(6)]],
    email:['', [Validators.required, Validators.email]],
   password:['', Validators.required ],
   password2:['', [Validators.required]],
   other:''
    

  })

  check(){
console.log(this.registerForm.value)
  }

get f(){
  return this.registerForm.controls
}
 
}
