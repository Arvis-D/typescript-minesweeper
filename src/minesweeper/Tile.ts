import Mediator from "../utils/Mediator";

export default class Tile
{
    public number: number = 0;
    public dom: HTMLElement;
    public condition: string = 'closed';
    public hasMine: boolean = false;
    public neighbors: Array<Tile> = [];

    public static borderWidth = 10;
    public static size: number = 40;
    public static gameStarted: boolean = false;
    public static colors: {[num: number]: string} = {
        0: 'white',
        1: 'blue',
        2: 'green',
        3: 'red',
        4: 'purple',
        5: 'brown',
        6: 'darkcyan',
        7: 'black',
        8: 'grey',
        9: 'cyan'
    }

    constructor(public pos: string)
    {
        this.setDom();
        this.setStyle();
    }

    public showTiles(): void
    {
        let {condition, number, neighbors} = this;

        if (condition === 'closed'){
            this.showTile();
            if (number === 0) {
                neighbors.forEach((e) => {
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

    private handleLeftClick(e: MouseEvent): void
    {
        if (!Tile.gameStarted) {
            Tile.gameStarted = true;
            Mediator.notify('game started', this.pos)
        } else {
            e.preventDefault();
            console.log(e);
            this.showTiles();
        }
    }

    private handleRightClick(e: MouseEvent): void
    {
        e.preventDefault();
        this.toggleFlag();
    }

    public static totalSize(): number
    {
        return this.size// + this.borderWidth * 2;
    }

    private toggleFlag(): void
    {
        let {dom, condition} = this;

        if (condition === 'opened') {
            return;
        }

        dom.classList.toggle('flag');
        this.condition = (condition === 'flag' ? 'closed' : 'flag');
    }

    private setDom(): void
    {
        let {condition} = this;

        this.dom = document.createElement('button');
        this.dom.classList.add('tile', condition);
        this.dom.addEventListener('click', (e) => {
            this.handleLeftClick(e);
        })
        this.dom.addEventListener('contextmenu', (e) => {
            this.handleRightClick(e);
        })
    }

    private setStyle(): void
    {
        let {dom, number} = this;

        //dom.style.borderWidth = `${Tile.borderWidth}px`;
        dom.style.height = `${Tile.size}px`;
        dom.style.width = `${Tile.size}px`;
        dom.style.fontSize = `${Tile.size - 3}px`;
    }
}