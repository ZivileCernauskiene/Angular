import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeFormComponent } from './code-form/code-form.component';
import { DecodeFormComponent } from './decode-form/decode-form.component';
import { KontaktaiComponent } from './kontaktai/kontaktai.component';
import { MainComponent } from './main/main.component';
import { ManoFormaComponent } from './mano-forma/mano-forma.component';
import { MemoryComponent } from './memory/memory.component';
import { NotepadComponent } from './notepad/notepad.component';
import { RegisterLoginComponent } from './register-login/register-login.component';

const routes: Routes = [
  {path: 'index', component: MainComponent},
  {path: 'code', component: CodeFormComponent},
  {path: 'mano', component: ManoFormaComponent},
  {path:'notes', component:NotepadComponent},
  {path:'memory', component:MemoryComponent},
  {path:'contact', component:KontaktaiComponent},
  {path:'dec', component:DecodeFormComponent},
  {path: 'login', component:RegisterLoginComponent},
  {path: "**", component: MainComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
