export default class Settings
{
    public dom: HTMLElement;
    
    constructor()
    {
        this.createDom();
    }

    private createDom(): void
    {
        this.dom = document.createElement('button');
        this.dom.classList.add('btn', 'btn-round', 'icon-settings');
        this.dom.setAttribute('id', 'settings');
        this.dom.addEventListener('click', () => {
            this.openSettings();
        })
    }

    private openSettings(): void
    {
        
    }
}