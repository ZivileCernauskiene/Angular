
import { NONE_TYPE } from '@angular/compiler';
import { Component, HostListener, NgModule, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Form, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivationService } from '../deactivation.service';
import { LanguageService } from '../language.service';
import { NotesService } from '../notes.service';


@Component({
    selector: 'app-notepad',
    templateUrl: './notepad.component.html',
    styleUrls: ['./notepad.component.css'],
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

export class NotepadComponent implements OnInit {

    constructor(private fb: FormBuilder, 
        private language: LanguageService, 
        private firebase:AngularFirestore, 
        private deactivation:DeactivationService, 
        private route:Router,
        private noteServise:NotesService) 
        {
        this.language.languageNumber.subscribe(x => this.languageNumber = x)

        this.firebase.collection('Color').valueChanges().subscribe((x:any)=>this.colorObject=x)
    }

    ngOnInit(): void {
        if(this.noteList.length==0){
            this.noteList.push({ text: "", id: this.noteindex, saved: false, width: 250, height: 120, pozZ: this.Zindex, top: 30, left: 15, color: { innerColor: 'rgb(255, 80, 188)', outerColor: '#f0f' } })
        }
    }

    Zindex = 0
    noteindex = this.noteServise.noteId
    noteList: iNote[] = this.noteServise.noteList
    modal=false
    
    FromDb = true
    enableEdit = true
    top = 30
    left = 335
    spalva = "#f0f"

    
    languageNumber = this.language.getLanguage()
    delete = ["Delete", "Ištrinti"]
    edit = ["Edit", "Redaguoti"]
    save = ["Save", "Išsaugoti"]
    place = ["Write Your text here", "Savo tekstą rašykite čia"]
    place2 = ["Empty note saved. Press Edit to write Your text", "Išsaugotas tuščias užrašas. Norėdami įrašyti, spauskite redaguoti"]
    saved = ["Saved. Press button to edit", "Išsaugota. Redaguoti paspaudus mygtuką"]
    unsaved = ["Unsaved! Press button to save", "Neišsaugota! Išsaugoti paspaudus mygtuką"]
    add = ["Add note", "Pridėti užrašą"]
    drag=["Can't drag if saved!", "Negalima judinti jei išsaugota"]

    colorForm = this.fb.group({
        color: '#f0f'
    })



    colorList = ["red", "blue", "violet", "brown", "pink"]

    colorObject:any[] = [
        
    ]

    ChangeColor() {
        this.spalva = this.colorForm.value.color;
    }

    addNote() {
        this.FromDb=false
        this.noteindex++
        let screenWidth = window.innerWidth - 250;
        if (this.left > screenWidth) {
            this.left = 15
            this.top += 220
        }
        this.Zindex++;
        let colorIndex = this.colorObject.indexOf(this.colorObject.filter(x => x.outer == this.colorForm.value.color)[0])


        let noteToAdd: iNote = { text: "", id: this.noteindex, saved: false, width: 250, height: 120, pozZ: this.Zindex, top: this.top, left: this.left, color: { innerColor: this.colorObject[colorIndex].inner, outerColor: this.colorForm.value.color } }
        for (let index = 0; index < this.noteList.length; index++) {
            let item = this.noteList[index];
            let myElement = document.getElementById("note" + item.id)
            if (item && myElement?.parentElement?.style.transform) {
                let noteInPlace = false
                for (let place = index; place < this.noteList.length; place++) {
                    let element = this.noteList[place];
                    let elementToPlace = document.getElementById("note" + element.id)
                    if (item.top == element.top && item.left == element.left && !elementToPlace?.parentElement?.style.transform) {
                        noteInPlace = true
                    }
                }
                if (!noteInPlace) {
                    noteToAdd.top = item.top
                    noteToAdd.left = item.left
                    this.left -= 320
                    break
                }

            }
        }
        this.left += 320
        this.noteServise.noteList.push(noteToAdd)
        
        
        console.log(noteToAdd)
    }

    getPercentageValue(elemWidth: number) {
        let screenWidth = window.innerWidth;

        return elemWidth * 100 / screenWidth;
    }

    
    saveNote(n: number, form: NgForm|string) {
        
        
        let i = this.noteList.indexOf(this.noteList.filter(x => x.id == n)[0])
        this.noteList[i].saved = true
        if(typeof(form)==="string"){
            this.noteList[i].text=form
        }
        else{
            this.noteList[i].text=form.value.text
        }
        
        
        let noteToSaveForm = document.getElementById("note" + n);
        

        if (noteToSaveForm?.parentElement) {
            

            if (noteToSaveForm.parentElement.style.transform) {
                const values = noteToSaveForm?.parentElement?.style.transform.split(/\w+\(|\);?/);

                let sumX = 0;
                let sumY = 0;
                let sumZ = 0;

                for (let x of values){
                    if (x && x != ' ') {
                        const transform = x.split(/,\s?/g).map(numStr => parseInt(numStr));
                        sumX += transform[0];
                        sumY += transform[1];
                        sumZ += transform[2];
                    }
                }

                this.noteList[i].pozX = sumX
                this.noteList[i].pozY = sumY
            }

            this.noteList[i].width = noteToSaveForm.getBoundingClientRect().width -8;
            this.noteList[i].height = noteToSaveForm.getBoundingClientRect().height-32 ;
            console.log(noteToSaveForm.getBoundingClientRect)
            
            

            let widthToSave = this.getPercentageValue(noteToSaveForm.getBoundingClientRect().width );
            //to add to firebase:
            //this.firebase.collection('/User/0aAr1PhpWwVHYNL90yyt/Note').add(this.noteList[i])
            console.log(this.noteList[i]);
        }

    }

    deleteNote(n: number) {
        this.FromDb=false
        let i = this.noteList.indexOf(this.noteList.filter(x => x.id == n)[0])
        let noteText=this.noteList[i].text
        if(!noteText){
            this.noteList.splice(i, 1)
            this.Zindex--
            return
        }
        let confirmation = confirm("Ar tikrai norite pašalinti savo tekstą: " + this.noteList[i].text + " ?")
        if (confirmation) {
            if(this.noteList[i].saved){
                this.noteServise.deleteNote(this.noteList[i])
            }
            this.noteList.splice(i, 1)
            this.Zindex--
        }

    }

    editNote(n: number) {
        this.FromDb=false
        let i = this.noteList.indexOf(this.noteList.filter(x => x.id == n)[0])
        this.noteList[i].saved = false
        
    }

    submitForm(x: NgForm) {
        
    }
    grabber = false;


    getMaxZIndex(nlist: any) {
        let maxIndex = 0;

        for (let x of nlist) {
            if (x.pozZ > maxIndex) {
                maxIndex = x.pozZ;
            }
        }

        return maxIndex;
    };


    change() {
        console.log("veikia")
    }

    dragStart(event: any) {
        console.log('dragstart')

        /*let elementId = event.source.element.nativeElement.childNodes[0].getAttribute('id')
        if(event.source.element.nativeElement.childNodes[0].isFocused){
            return
        }
        if(elementId){
            let index=elementId.substring(4)
            let i = this.noteList.indexOf(this.noteList.filter(x => x.id == index)[0])

                this.noteList[i].pozZ=this.Zindex
                this.Zindex++
            
            //console.log(this.noteList[i])
        }   */
    }

//     @HostListener('window:beforeunload', ['$event'])
//     beforeunloadHandler($event:any) {
//     alert('asd')
//     $event.preventDefault()
//     console.log($event);
//     'kazkodel su situo neveikia : ieskoti zemiau su JS'
// }
    

    
    @HostListener('document:mousedown', ['$event'])
    onmousedown(elem: MouseEvent) {
        if ((elem.target as Element).closest('.note-container')) {
            let index = (elem.target as Element).closest('.note-container')?.querySelector('form')?.id.substring(4);
            let i = this.noteList.indexOf(this.noteList.filter(xx => xx.id == Number(index))[0]);
            let currentZIndex = this.noteList[i].pozZ;
            let maxZIndex = this.getMaxZIndex(this.noteList);
            console.log((elem.target as Element).closest('.note-container')?.getBoundingClientRect())

            if (currentZIndex >= maxZIndex) {
                return;
            }

            for (let x of this.noteList) {
                if (x.pozZ > currentZIndex) {
                    x.pozZ--;
                }
            }

            this.noteList[i].pozZ = maxZIndex;

            /*let naujas= this.noteList
            console.log(this.Zindex);
            naujas.sort((a, b) => (a.pozZ > b.pozZ ? -1 : 1))
            for (let index = 0; index < this.noteList.length; index++) {
                this.noteList[index].pozZ=index;
                
            }
            //this.noteList.sort((a, b) => (a.id < b.id ? -1 : 1))*/

        }
        if(!(elem.target as Element).closest('.modal')&&(elem.target as Element).closest('.modal-container')){
            this.modalOpen=false
        }

        if(!(elem.target as Element).closest('.info')&&this.infoOpen){
            this.infoOpen=false
        }
    }
    onmouseup(elem: MouseEvent) {
        if ((elem.target as Element).closest('.note-container')) {
            let myElement = (elem.target as Element).closest('.note-container')
            console.log('mouse event:'+myElement?.getBoundingClientRect())



        }
    }

    infoOpen=false
    infoAction(){
        this.infoOpen=true
    }


    //MODAL SETTINGS

    modalSave(){
        this.modalOpen=false
        
        if(this.modalCheck){
            this.noteList.forEach(x =>{ 
                if(!x.saved){
                    this.saveNote(x.id, x.text)
                }
            });
        }
        else {
           let note= this.noteList.filter(x=>!x.saved)[0]
           this.saveNote(note.id, note.text)
        }
        this.route.navigate([this.deactivation.nextRoute])

    }

    modalCheck=false
    checkChange(){
        if(this.modalCheck){
            this.modalCheck=false
        }
        else this.modalCheck=true

    }
    modalExit(){
        this.modalOpen=false
        
        return false
    }
    
    modalDelete(){
        this.modalOpen=false
        this.noteList.forEach(x=>{
            if(!x.saved){
                this.deleteNote(x.id)
            }
        })
        console.log(this.deactivation.nextRoute)
        this.route.navigate([this.deactivation.nextRoute])
    }

    modalOpen=false
    modaltext=''
    
    canDeactivate(){
        this.noteServise.noteId=this.noteindex
        for(let x of this.noteList){
            if(!x.saved&&x.text){
                this.modalOpen=true
                this.modaltext=x.text
                return false
            }
        }
        return true
    }

    JSDeactivator=false
}


//  window.addEventListener('beforeunload', (event) => {
//     if(document.getElementById('JSDeactivator')){
//         event.preventDefault();
//     console.log('veikia JS')
//     // Chrome requires returnValue to be set.
//    event.returnValue = '';
//     }
     
   
//  });

export interface iNote {
    text: string,
    id: number,
    width: number,
    height: number,
    saved?: boolean,
    fromDb?:boolean,
    pozX?: number ,
    pozY?: number,
    pozZ: number,
    top: number,
    left: number,
    color: {
        innerColor: string,
        outerColor: string
    }
}
interface iColor {
    innerColor: string,
    outerColor: string
}
