import Tile from "./Tile" ;
import Participant from "../utils/Participant";
import Mediator from "../utils/Mediator";

export default class Minefield implements Participant
{
    public dom: HTMLElement;
    public tiles: {
        [id: string]:  Tile
    };

    constructor(
        public xWidth:number,
        public yWidth : number,
        public mineProbability: number,
        public tileSize: number
    ) {
        this.setDom();
        this.setStyle();
        this.createTiles();
        this.addNeighbors();
        this.showTiles();

        Mediator.addParticipant('counter zero', this);
    }

    public createTiles(): void
    {
        this.tiles = {};
        Tile.atLeastOneOpened = false;

        for (let i = 0; i < this.yWidth; i++) {
            for (let j = 0; j < this.xWidth; j++) {
                let pos = `${j}|${i}`;
                this.tiles[pos] = new Tile(pos);
                this.tiles[pos].setStyle(this.tileSize);
            }
        }
    }

    public addMines(posToAvoid: string): void
    {
        let {tiles, xWidth, yWidth} = this;

        var positions: Array<string> = [];
        positions.push(posToAvoid);
        tiles[posToAvoid].neighbors.forEach(e => {
            positions.push(e.pos)
        })

        const totalMines = this.getMineCount();
        let currentMines = 0;

        while (currentMines !== totalMines) {
            let key = `${Math.round(Math.random() * (xWidth - 1))}|${Math.round(Math.random() * (yWidth - 1))}`

            if(tiles[key].hasMine || positions.includes(key))
                continue;

            tiles[key].hasMine = true;
            currentMines++;
        }
    }

    public addNeighbors(): void
    {
        let {tiles, xWidth, yWidth} = this;

        Object.keys(tiles).forEach(e => {
            let [x, y] = e.split('|').map(e => parseInt(e));
            let tile = tiles[e];

            for (let i = -1; i <= 1; i++)
                for (let j = -1; j <= 1; j++) {

                   let xNew = x + i;
                   let yNew = y + j;

                    if (xNew < 0 || yNew < 0 || xNew >= xWidth || yNew >= yWidth || (xNew === x && yNew === y))
                       continue;

                    tile.neighbors.push(tiles[`${xNew}|${yNew}`]);
                }
        })
    }

    public addNumbers(): void
    {
        let {tiles} = this;

        Object.keys(tiles).forEach(e => {
            let tile = tiles[e];
            let number = 0;

            tile.neighbors.forEach(e => {
                if (e.hasMine)
                    number++;
            });

            tile.number = number;
        })
    }

    public showTiles(): void 
    {
        Object.values(this.tiles).forEach(e => {
            this.dom.appendChild(e.dom);
        })
    }

    public setStyle(): void
    {
        let {dom, xWidth, yWidth, tileSize} = this;

        dom.style.width = `${tileSize * xWidth}px`;
        dom.style.height = `${tileSize * yWidth}px`;
    }

    private setDom(): void
    {
        this.dom = document.createElement('div');
        this.dom.setAttribute('id', 'minefield');
    }

    public removeTilesFromDom(): void
    {
        while (this.dom.lastChild) {
            this.dom.removeChild(this.dom.lastChild);
        }
    }

    public getMineCount(): number
    {
        return Math.round(this.xWidth * this.yWidth * this.mineProbability);
    }

    public showAllMines(): void
    {
        Object.values(this.tiles).forEach((e) => {
            if (e.hasMine && e.condition !== 'flag') {
                e.dom.classList.add('mine');
                e.showTile();
            } else if (!e.hasMine && e.condition === 'flag') {
                e.dom.classList.remove('flag');
                e.showTile();
            }
        });
    }

    public listen(event: string, data: string): void
    {
        this.checkVictory();
    }

    private checkVictory(): void
    {
        if (!Object.values(this.tiles).filter(e => e.hasMine && e.condition !== 'flag').length) {
            Mediator.notify('victory');
        }
    }
}