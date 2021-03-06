import Counter from "./Counter";
import Reset from "./Reset";
import Timer from "./Timer";
import Settings from "./Settings";

export default class Header
{
    public dom: HTMLElement;

    constructor(
        public counter: Counter,
        public reset: Reset,
        public timer: Timer,
        public settings: Settings,
    ) {
        this.createDom();
    }

    private createDom(): void
    {
        this.dom = document.createElement('div');
        this.dom.setAttribute('id', 'header');

        this.dom.appendChild(this.settings.dom);
        this.dom.appendChild(this.counter.dom);
        this.dom.appendChild(this.reset.dom);
        this.dom.appendChild(this.timer.dom);
    }
}