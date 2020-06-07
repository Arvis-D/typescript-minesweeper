import Mediator from "../utils/Mediator";
import Participant from "../utils/Participant";

export default class Reset implements Participant
{
    public dom: HTMLElement;
    private smileys: {[smiley:string]:string} = {
        victory: 'victory.png',
        click: 'click.svg',
        normal: 'normal.svg',
        dead: 'dead.png'
    }
    
    constructor()
    {
        this.createDom();

        Mediator.addParticipant('tile mousedown', this);
        Mediator.addParticipant('tile opened', this);
    }

    private createDom(): void
    {
        this.dom = document.createElement('button');
        this.changeBackground('normal');
        this.dom.classList.add('btn', 'btn-round');
        this.dom.setAttribute('id', 'reset');
        this.dom.addEventListener('click', () => {
            this.reset();
        })
    }

    private reset(): void
    {
        Mediator.notify('reset');
    }

    public changeBackground(smiley: string): void
    {
        this.dom.style.backgroundImage = `url(./style/img/${this.smileys[smiley]})`;
    }

    public listen(event:string, data:string): void
    {
        switch (event) {
            case 'tile mousedown':
                this.changeBackground('click');
            break;
            case 'tile opened':
                setTimeout(() => {
                    this.changeBackground('normal');
                }, 100);
            break;
        }
    }
}