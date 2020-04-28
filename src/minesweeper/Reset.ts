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
        this.dom.classList.add('btn');
        this.dom.setAttribute('id', 'reset');
        this.dom.addEventListener('click', () => {
            this.reset();
        })
    }

    private reset(): void
    {
        
    }
}