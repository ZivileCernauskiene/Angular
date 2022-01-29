import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MeniuComponent } from './meniu/meniu.component';
import { CodeFormComponent } from './code-form/code-form.component';
import { ManoFormaComponent } from './mano-forma/mano-forma.component';
import { DecodeFormComponent } from './decode-form/decode-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { NotepadComponent } from './notepad/notepad.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxDragResizeModule } from 'ngx-drag-resize';
import { CodeExplanationComponent } from './code-explanation/code-explanation.component';
import { MemoryComponent } from './memory/memory.component';
import { KontaktaiComponent } from './kontaktai/kontaktai.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MeniuComponent,
    CodeFormComponent,
    ManoFormaComponent,
    DecodeFormComponent,
    NotepadComponent,
    CodeExplanationComponent,
    MemoryComponent,
    KontaktaiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    NgxDragResizeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
