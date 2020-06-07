export default class Timer
{
    public dom: HTMLElement;
    private ticks: number = 0;
    private readonly tickTimeLength: number = 1000;
    private intervalId: number = null;
    
    constructor()
    {
        this.createDom();
    }

    private createDom(): void
    {
        this.dom = document.createElement('div');
        this.dom.classList.add('counter');
        this.dom.setAttribute('id', 'time-counter');
        this.dom.innerHTML = this.getInnerHTML();
    }

    private count(): number
    {
        let {tickTimeLength} = this;
        const initial = Date.now();

        return setInterval(() => {
            if (Date.now() > initial + tickTimeLength * this.ticks) {
                this.ticks++;
                this.dom.innerHTML = this.getInnerHTML();
            }
        }, 1)
    }

    private getInnerHTML(): string
    {
        return `
        <h5>Time elapsed:</h5>
        <div class="counter-number">${this.ticks}</div>`
    }

    public startCounting(): void
    {
        if (this.intervalId === null) {
            this.intervalId = this.count();
        } else {
            console.log('Timer already counting!')
        }
    }

    public stopCounting(): void
    {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public reset(): void
    {
        this.ticks = 0;
        this.dom.innerHTML = this.getInnerHTML();
    }
}