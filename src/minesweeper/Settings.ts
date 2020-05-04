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
        this.dom.innerHTML = `<span class="mi mi-settings"></span>`
        this.dom.classList.add('btn', 'btn-round');
        this.dom.setAttribute('id', 'settings');
        this.dom.addEventListener('click', () => {
            this.openSettings();
        })
    }

    private openSettings(): void
    {
        
    }

    private getSettingHtml()
    {
        return `
        <div class="settings-modal">
            <div class="settings-item">
                <span>x width</span><input type="text">
            </div>
            <div class="settings-item">
                <span>y width</span><input type="text">
            </div>
            <div class="settings-item">
                <span>mine probability</span><input type="text">
            </div>
            <div class="settings-item">
                <button class="btn">Save</button>
                <button class="btn">Exit</button>
            </div>
        </div>
        `
    }
}