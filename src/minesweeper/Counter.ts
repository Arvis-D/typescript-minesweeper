import Particpant from "../utils/Participant";
import Mediator from "../utils/Mediator";

export default class Counter
{
    public dom: HTMLElement;
    public mminesLeft: number = 0;
    
    constructor()
    {
        this.createDom();
    }

    private createDom(): void
    {
        this.dom = document.createElement('div');
        this.dom.classList.add('counter');
        this.dom.setAttribute('id', 'mine-counter');
        this.dom.innerHTML = this.getInnerHTML();

        Mediator.addParticipant('flag posted', this);
        Mediator.addParticipant('flag removed', this);
    }

    private getInnerHTML(): string
    {
        return `
        <h5>Mines left:</h5>
        <div class="counter-number">${this.mminesLeft}</div>`
    }

    public setMinesLeft(minesLeft: number): void
    {
        this.mminesLeft = minesLeft;
        this.dom.innerHTML = this.getInnerHTML();

        if (minesLeft === 0)
            Mediator.notify('counter zero');
    }

    public listen(eventName: string, data: string): void
    {
        switch (eventName) {
            case 'flag posted':
                this.setMinesLeft(this.mminesLeft - 1);
            break;
            case 'flag removed':
                this.setMinesLeft(this.mminesLeft + 1);
            break;
        }
    }
}