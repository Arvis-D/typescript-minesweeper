export default class Counter
{
    public dom: HTMLElement;
    private mminesLeft: number = 0;
    
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
        console.log(this.getInnerHTML())
    }

    private count(): void
    {
        setInterval(() => {

        }, 1000)
    }

    private getInnerHTML(): string
    {
        return `
        <h5>Mines left:</h5>
        <div class="counter-number">${this.mminesLeft}</div>`
    }
}