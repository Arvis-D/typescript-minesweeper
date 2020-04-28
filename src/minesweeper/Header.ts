import Counter from "./Counter";
import Reset from "./Reset";
import Timer from "./Timer";
import Settings from "./Settings";

export default class Header
{
    public dom: HTMLElement;

    constructor(
        private counter: Counter,
        private reset: Reset,
        private timer: Timer,
        private settings: Settings,
    ) {
        this.dom = document.createElement('div');
        this.dom.setAttribute('id', 'header')
    }
}