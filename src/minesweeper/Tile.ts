import Mediator from "../utils/Mediator";

export default class Tile
{
    public number: number = 0;
    public dom: HTMLElement;
    public condition: string = 'closed';
    public hasMine: boolean = false;
    public neighbors: Array<Tile> = [];

    public static active: boolean = true
    public static atLeastOneOpened: boolean = false;
    public static readonly colors: {[num: number]: string} = {
        0: 'white',
        1: 'blue',
        2: 'green',
        3: 'red',
        4: 'purple',
        5: 'brown',
        6: 'darkcyan',
        7: 'black',
        8: 'grey'
    }

    constructor(public pos: string)
    {
        this.setDom();
    }

    public showTiles(): void
    {
        let {condition, number, neighbors} = this;

        if (condition === 'closed'){
            this.showTile();
            if (number === 0) {
                neighbors.forEach((e, i) => {
                    setTimeout(() => {
                        e.showTiles();
                    }, 50);
                })
            }
        }
    }

    public showTile(): void
    {
        const {dom, number, hasMine} = this;

        this.condition = 'opened';
        dom.classList.replace('closed', 'opened');
        dom.style.color = Tile.colors[number];
        dom.innerHTML = (hasMine || number === 0 ? '' : number.toString());

        if (hasMine) {
            dom.classList.add('mine');
        }
    }

    private handleMouseUp(e: MouseEvent): void
    {
        if (e.button === 0 && Tile.active) {
            if (!Tile.atLeastOneOpened) {
                Tile.atLeastOneOpened = true;
                Mediator.notify('game started', this.pos)
            } else if(this.hasMine && this.condition !== 'flag') {
                Mediator.notify('mine stepped', this.pos)
            } else {
                Mediator.notify('tile opened');
                this.showTiles();
            }
        }
    }

    private handleContextMenu(e: MouseEvent): void
    {
        if (Tile.active) {
            e.preventDefault();
            this.toggleFlag();
        }
    }

    private handleMouseDown(e: MouseEvent): void
    {
        if (this.condition === 'closed' && e.button === 0 && Tile.active) {
            Mediator.notify('tile mousedown')
        }
    }

    private toggleFlag(): void
    {
        if (this.condition === 'opened') {
            return;
        }

        this.dom.classList.toggle('flag');
        if (this.condition === 'flag') {
            this.condition = 'closed';
            Mediator.notify('flag removed');
        } else {
            this.condition = 'flag';
            Mediator.notify('flag posted');
        }
    }

    private setDom(): void
    {
        let {condition} = this;

        this.dom = document.createElement('button');
        this.dom.classList.add('tile', condition);
        this.dom.addEventListener('mouseup', (e) => {
            this.handleMouseUp(e);
        })
        this.dom.addEventListener('contextmenu', (e) => {
            this.handleContextMenu(e);
        })
        this.dom.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
        });
    }

    public setStyle(size: number): void
    {
        let {dom} = this;

        dom.style.height = `${size}px`;
        dom.style.width = `${size}px`;
        dom.style.fontSize = `${size - 3}px`;
    }
}