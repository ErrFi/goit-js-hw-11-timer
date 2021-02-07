/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

// new CountdownTimer({
// 	selector: '#timer-1',
// 	targetDate: new Date('Jul 17, 2019')
// });

////selectors '[data-action=destroy]'


class CountDownTimer {
	constructor({ selector, targetDate }) {
        this.template = `
        <div class="field">
        <span class="value" data-value="days">00</span>
        <span class="label">Days</span>
      </div>
    
      <div class="field">
        <span class="value" data-value="hours">00</span>
        <span class="label">Hours</span>
      </div>
    
      <div class="field">
        <span class="value" data-value="mins">00</span>
        <span class="label">Minutes</span>
      </div>
    
      <div class="field">
        <span class="value" data-value="secs">00</span>
        <span class="label">Seconds</span>
      </div>
      `;
        this.selector = selector;
        this.parent = document.querySelector(this.selector);
        this.targetDate = targetDate;

        this.parent.insertAdjacentHTML('beforeend', this.template);

        this.refs = {
            days: this.parent.querySelector('span[data-value=days]'),
            hours: this.parent.querySelector('span[data-value=hours]'),
            mins: this.parent.querySelector('span[data-value=mins]'),
            secs: this.parent.querySelector('span[data-value=secs]')
        };

        this.intervalID = null;      
    };

    updateClock(time){
        const days = this.cellDigits(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.cellDigits(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.cellDigits(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.cellDigits(Math.floor((time % (1000 * 60)) / 1000));
        // console.log("day:",days,"hr:",hours,"min:",mins,"secs:", secs);

        this.refs.days.textContent = `${days}`;
        this.refs.hours.textContent = `${hours}`;
        this.refs.mins.textContent = `${mins}`;
        this.refs.secs.textContent = `${secs}`;
    }
    cellDigits(value){
        return value.toString().padStart(2,"0");
    };
    start (){
        const startTime = this.targetDate.getTime();
        this.intervalID = setInterval(()=>{
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            // проверить дельту на положительность/отрицательность
            if(deltaTime<=0){clearInterval(this.intervalID);}
            this.updateClock(deltaTime);
        },1000);
    };
    stop(){
        clearInterval(this.intervalID);
        this.parent.textContent = '';
    }
    
}


const timer = new  CountDownTimer({
	selector: '#timer-1',
	targetDate: new Date('Feb 14, 2021')
});

timer.start();
// setTimeout(()=>timer.stop(),5000);