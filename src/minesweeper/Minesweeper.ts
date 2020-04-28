import Minefield from "./Minefield";
import Header from "./Header";


export default class Minesweeper
{
    constructor(
        public dom: HTMLElement,
        private header: Header,
        private minefield: Minefield
    ) {
        this.dom.appendChild(this.header.dom);
        this.dom.appendChild(this.minefield.dom);
    }
}