import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
    selector: 'app-memory',
    templateUrl: './memory.component.html',
    styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

    constructor(private language: LanguageService) {
        this.language.languageNumber.subscribe(x => this.languageNumber = x)
    }

    ngOnInit(): void {
    }

    languageNumber = this.language.getLanguage();
    title = ["This is full CSS memory game", "Atminties žaidimas, CSS paveikslėliai"]
    explanation = ["Choose the number of elements and press start", "Pasirinkite skirtingų elementų kiekį ir spauskite pradėti"]
    element = ["Number of elements", "Elementų kiekis"]
    startText = ["Start", "Pradėti"]
    more = ["More", "Daugiau"]
    less = ["Less", "Mažiau"]
    alertLow = ["No less than 2", "Ne mažiau nei 2"]
    restart = ["Restart", "Iš naujo"]
    win = ["You win", "Laimėjote"]


    maxUsedClasses = 4;
    delayTime = 1000;
    availableClasses = [
        'egg', 'egg1', 'egg2', 'egg3', 'egg4', 'egg5', 'egg6', 'egg7', 'egg8', 'egg9', 'egg10', 'egg11',
        'round', 'round1', 'round2', 'round3', 'round4', 'round5', 'round6', 'round7', 'round8', 'round9',
        'round10', 'round11',
        'dashed', 'dashed1', 'dashed2', 'dashed3', 'dashed4', 'dashed5', 'dashed6', 'dashed7', 'dashed8',
        'dashed9', 'dashed10', 'dashed11',
        'snow', 'snow1', 'snow2', 'snow3', 'snow4', 'snow5', 'snow6', 'snow7', 'snow8',
        'snow9', 'snow10', 'snow11',
        'triangle', 'triangle1', 'triangle2', 'triangle3', 'triangle4', 'triangle5',
        'triangle6', 'triangle7', 'triangle8', 'triangle9', 'triangle10', 'triangle11'
    ];

    alertHi = ["No more than " + this.availableClasses.length.toString(), "Ne daugiau nei " + this.availableClasses.length.toString()]

    shuffledAvailableClasses = this.shuffleArray(this.availableClasses);
    unshuffledCards: any
    shuffledCards: any;

    allowAction = true;
    openedCard = {
        open: false,
        id: -1,
        className: ''
    };
    openedIndex = -1;

    start = false;

    victory = false;

    klases = true;

    starting() {
        this.start = true
        this.unshuffledCards = this.generateCards();
        this.shuffledCards = this.shuffleArray(this.unshuffledCards);
    }
    restarting() {
        this.start = false;
        this.unshuffledCards = this.generateCards();
        this.victory = false
    }

    usedClases(x: number) {
        if (this.maxUsedClasses <= 2 && x < 0) {
            alert(this.alertLow[this.languageNumber]);
            this.maxUsedClasses = 2;
            return;
        }

        if (this.maxUsedClasses >= this.availableClasses.length && x > 0) {
            alert(this.alertHi[this.languageNumber]);
            this.maxUsedClasses = this.availableClasses.length;
            return;
        }

        this.maxUsedClasses += x;
    }
    generateCards() {
        let maxClasses = Math.min(this.maxUsedClasses, this.shuffledAvailableClasses.length);
        let generatedCards = [];
        let currentId = 0;

        for (let i = 0; i < maxClasses; i++) {
            for (let j = 0; j < 2; j++) {
                generatedCards.push(
                    {
                        open: false,
                        id: ++currentId,
                        className: this.shuffledAvailableClasses[i]
                    }
                );
            }
        }

        return generatedCards;
    }

    flip(cardind: number) {
        if (!this.allowAction) {
            return;
        }

        if (this.shuffledCards[cardind].open) {
            return;
        }

        this.shuffledCards[cardind].open = true;

        if (this.openedCard.id != -1) {
            if (this.openedCard.className == this.shuffledCards[cardind].className) {
                this.openedCard.id = -1;
                this.openedCard.className = '';
                this.openedIndex = -1;
                this.checkVictory()
                return;
            }
            else {
                this.allowAction = false
                var that = this;

                setTimeout(function () {
                    that.shuffledCards[cardind].open = false;
                    that.shuffledCards[that.openedIndex].open = false;
                    that.allowAction = true;

                    that.openedCard = {
                        open: false,
                        id: -1,
                        className: ''
                    };
                    that.openedIndex = -1;
                }, this.delayTime);
            }
        } else {
            this.openedCard.className = this.shuffledCards[cardind].className;
            this.openedCard.id = this.shuffledCards[cardind].id;
            this.openedCard.open = true;
            this.openedIndex = cardind;
            return;
        }
    }

    shuffleArray(anArray: any[]): any[] {
        return anArray.map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1]);
    }

    checkVictory() {
        this.victory = true

        for (let x of this.shuffledCards) {
            if (!x.open) {
                this.victory = false
                return
            }
        }

        return
    }
}
