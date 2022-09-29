//? var
//? class
class ITakeMed{
    checkboxs = document.getElementsByTagName(`input`);
    time =document.getElementsByClassName(`time`);
    pm = document.getElementsByClassName(`pm`);
    day = document.getElementsByClassName(`day`);
    tr = document.getElementsByTagName(`tr`);
    date = new Date();
    hour24 = [13,14,15,16,17,18,19,20,21,22,23,24];
    hour12 = [1,2,3,4,5,6,7,8,9,10,11,12];
    hour;
    hourA12;
    counterNumber = 12; /* document.getElementsByClassName(`number`); */

    constructor(){
        this.showTimeAndPmInLoad();
        this.checkboxsClick();
        this.activeLoad();
    }

    checkboxsClick(){
        for (let c = 0; c < this.checkboxs.length; ++c){
            let fun = ()=>{
                this.timeTake(c);
                this.showTimeTake(c);
                this.showPm(c);
                this.showDay(c);
                this.active(c);
                this.itemCounter();
            };

            this.checkboxs[c].addEventListener(`click`,fun);
            
        }
    }

        // date
        timeTake(number){
            this._12HourSystem();
            localStorage.setItem(`hour${number}`,this.hour);
            localStorage.setItem(`min${number}`,this.date.getMinutes());
        }

            _12HourSystem(){
                this.hour = Number(this.date.getHours());
                if (this.hour > 12){
                    this.hourA12 = true;
                    this.hour24.forEach((v,i)=>{
                        if (this.hour == v){
                            this.hour = this.hour12[i];
                        }
                    });
                } else{
                    this.hourA12 = false;
                }
            }

        showTimeTake(number){
            this.time[number].innerText = `${localStorage.getItem(`hour${number}`)}:${localStorage.getItem(`min${number}`)}`;
        }

        timePm(number){
            if (this.hourA12){
                localStorage.setItem(`pm${number}`,`مساءا`);
            } else{
                localStorage.setItem(`pm${number}`,`صباحا`);
            }
        }

        showPm(number){
            this.timePm(number);
            this.pm[number].innerText = localStorage.getItem(`pm${number}`);
        }

    showTimeAndPmInLoad(){
        addEventListener(`load`,()=>{
            for (let i = 0; i < this.time.length; ++i){
                this.time[i].innerText = `${localStorage.getItem(`hour${i}`)}:${localStorage.getItem(`min${i}`)}`;
                this.pm[i].innerText = localStorage.getItem(`pm${i}`); 
                this.day[i].innerText = `${localStorage.getItem(`mon${i}`)}-${localStorage.getItem(`day${i}`)}`; 
            }
        });
    }

    dayTake(number){
        localStorage.setItem(`day${number}`,this.date.getDate());
        localStorage.setItem(`mon${number}`,this.date.getMonth() + 1);
    }

    showDay(number){
        this.dayTake(number);
        this.day[number].innerText = `${localStorage.getItem(`mon${number}`)}-${localStorage.getItem(`day${number}`)}`; 
    }

    // active
    active(number){
        localStorage.setItem(`active${number}`,`active`);
        this.tr[number].classList.add(`active`);
    }

    noActive(number){
        localStorage.setItem(`active${number}`,``);
        this.tr[number].classList.remove(`active`);
    }

    activeLoad(){
        addEventListener(`load`,()=>{
            for(let i = 0; i < this.tr.length; ++i){
                this.tr[i].classList.add(localStorage.getItem(`active${i}`));

                this.counter(i);
            }
        });
    }

    // counter
    itemCounter(number){
        let hourCounter = Number(this.date.getHours());
        this.notBig24(hourCounter,number);
    }

        notBig24(hourCounter,number){
            for(let i = 1; i <= this.counterNumber; ++i){
                if (hourCounter == 24) {
                    hourCounter = 0;
                }

                ++hourCounter;
            }

            localStorage.setItem(`hourCounter${number}`,hourCounter);
        }

    counter(number){
        if (Number(this.date.getHours()) >= Number(localStorage.getItem(`hourCounter${number}`))) {
            if (this.date.getDate() === localStorage.getItem(`day${number}`)) {
                this.noActive();
            } else if (this.date.getDate() !== localStorage.getItem(`day${number}`)){
                if(Number(this.date.getHours()) < localStorage.getItem(`hour${number}`)){
                    this.noActive();
                }
            }
        }
    }

}
//? function
// ? run
let rITakeMed = new ITakeMed();