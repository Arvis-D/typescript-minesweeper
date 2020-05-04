export default class Reset
{
    public dom: HTMLElement;
    
    constructor()
    {
        this.createDom();
    }

    private createDom(): void
    {
        this.dom = document.createElement('button');
        this.dom.style.backgroundImage = this.getBackground('normal');
        this.dom.classList.add('btn', 'btn-round');
        this.dom.setAttribute('id', 'reset');
        this.dom.addEventListener('click', () => {
            this.reset();
        })
    }

    private reset(): void
    {
        
    }

    private getBackground(smiley: string): string
    {
        const smileys: {[smiley:string]:string} = {
            victory: 'victory.png',
            click: 'click.svg',
            normal: 'normal.svg',
            dead: 'dead.png'
        }

        return `url(./style/img/${smileys[smiley]})`;
    }
}