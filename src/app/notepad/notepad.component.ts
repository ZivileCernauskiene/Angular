
import { Component, HostListener, NgModule, OnInit } from '@angular/core';

import { Form, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../language.service';


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

    constructor(private fb:FormBuilder, private language:LanguageService) { 
        this.language.languageNumber.subscribe(x=>this.languageNumber=x)
    }

    ngOnInit(): void {
        this.addNote();
    }

    Zindex = 0
    noteindex = 0
    noteList: iNote[] = []
    FromDb = false
    enableEdit = true
    top = 30
    left = 15
    spalva = "#f0f"

    languageNumber=this.language.getLanguage()
    delete=["Delete", "Ištrinti"]
    edit=["Edit", "Redaguoti"]
    save=["Save", "Išsaugoti"]
    place=["Write Your text here", "Savo tekstą rašykite čia"]
    place2=["Empty note saved. Press Edit to write Your text", "Išsaugotas tuščias užrašas. Norėdami įrašyti, spauskite redaguoti"]
    saved=["Saved. Press button to edit", "Išsaugota. Redaguoti paspaudus mygtuką"]
    unsaved=["Unsaved! Press button to save", "Neišsaugota! Išsaugoti paspaudus mygtuką"]
    add=["Add note", "Pridėti užrašą"]

    colorForm=this.fb.group({
        color:'#f0f'
    })



    colorList=["red", "blue", "violet", "brown", "pink"]

    colorObject=[
        {inner: 'rgb(255, 80, 188)', outer:'#f0f'},
        {inner: '#EF5350', outer:'#D32F2F'},
        {inner: '#CE93D8', outer:'#7B1FA2'},
        {inner: '#64B5F6', outer:'#1976D2'},
        {inner: '#81C784', outer:'#43A047'},
        {inner: '#FFB74D', outer:'#FB8C00'},
    ]

    ChangeColor(){
        this.spalva=this.colorForm.value.color;
        
    }
    
    addNote() {
        
        this.noteindex++
        let screenWidth = window.innerWidth-250;
        if (this.left > screenWidth) {
            this.left = 15
            this.top += 220
        }
        this.Zindex++;
        let colorIndex= this.colorObject.indexOf(this.colorObject.filter(x=>x.outer==this.colorForm.value.color)[0])
        

        let noteToAdd: iNote = { tekstas: "", id: this.noteindex, saved: false, width: 250, height: 120, pozZ: this.Zindex, top: this.top, left: this.left, color:{innerColor:this.colorObject[colorIndex].inner, outerColor:this.colorForm.value.color} }
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
        this.noteList.push(noteToAdd)
        console.log(noteToAdd)
    }

    getPercentageValue(elemWidth:number)
    {
        let screenWidth = window.innerWidth;

        return elemWidth * 100 / screenWidth;
    }

    changeColor(n: number)
    {
        let i = this.noteList.indexOf(this.noteList.filter(x => x.id == n)[0]);
        // this.noteList[i].color = this.noteList[i].color == "yellow" ? "" : "yellow";
    }

    saveNote(n: number, form: NgForm) {
        let i = this.noteList.indexOf(this.noteList.filter(x => x.id == n)[0])
        this.noteList[i].saved = true
        this.noteList[i].tekstas = form.value.tekstas
        let noteToSaveForm = document.getElementById("note" + n);
        let noteToSaveTexarea = noteToSaveForm?.querySelector('textarea');

        if (noteToSaveTexarea) {
            let parentElement = noteToSaveTexarea.parentElement;

            if (parentElement?.style.transform) {
                const values = parentElement?.style.transform.split(/\w+\(|\);?/);
                const transform = values[1].split(/,\s?/g).map(numStr => parseInt(numStr));
                this.noteList[i].pozX = transform[0]
                this.noteList[i].pozY = transform[1]
            }

            this.noteList[i].width = noteToSaveTexarea.getBoundingClientRect().width - 8;
            this.noteList[i].height = noteToSaveTexarea.getBoundingClientRect().height - 8;

            let widthToSave = this.getPercentageValue(noteToSaveTexarea.getBoundingClientRect().width - 8);

            console.log(this.noteList[i].width);
        }
        //TODO POST
    }

    deleteNote(n: number) {
        let i = this.noteList.indexOf(this.noteList.filter(x => x.id == n)[0])

        let confirmation = confirm("Ar tikrai norite pašalinti savo tekstą: " + this.noteList[i].tekstas + " ?")
        if (confirmation) {
            this.noteList.splice(i, 1)
            this.Zindex--
        }

    }

    editNote(n: number) {
        let i = this.noteList.indexOf(this.noteList.filter(x => x.id == n)[0])
        this.noteList[i].saved = false
    }

    submitForm(x: NgForm) {
        console.log("forma padavem")
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

    
    change(){
        console.log("veikia")
    }

    dragStart(event: any) {

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
    }
    onmouseup(elem: MouseEvent) {
        if ((elem.target as Element).closest('.note-container')) {
            let myElement = (elem.target as Element).closest('.note-container')
            console.log(myElement?.getBoundingClientRect())


        }
    }

}

export interface iNote {
    tekstas: string,
    id: number,
    width: number,
    height: number,
    saved?: boolean,
    pozX?: number,
    pozY?: number,
    pozZ: number,
    top: number,
    left: number,
    color:{
        innerColor:string,
        outerColor:string
    }
}
