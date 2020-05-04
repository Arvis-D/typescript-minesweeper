import Tile from "./Tile" ;
import Participant from "../utils/Participant";
import Mediator from "../utils/Mediator";

export default class Minefield implements Participant
{
    public dom: HTMLElement;
    public xWidth: number = 30;
    public yWidth: number = 16;
    public mineProbability: number = 0.2;
    public tiles: {
        [id: string]:  Tile
    } = {};

    constructor()
    {
        this.setDom();
        this.setStyle();
        this.createTiles();
        this.addNeighbors();
        this.showTiles();

        Mediator.addParticipant('game started', this);
    }

    private createTiles(): void
    {
        for (let i = 0; i < this.yWidth; i++) {
            for (let j = 0; j < this.xWidth; j++) {
                let pos = `${j}|${i}`;
                this.tiles[pos] = new Tile(pos);
            }
        }
    }

    private addMines(posToAvoid: string): void
    {
        console.log(posToAvoid)
        let {tiles, xWidth, yWidth, mineProbability} = this;

        var positions: Array<string> = [];
        tiles[posToAvoid].neighbors.forEach(e => {
            positions.push(e.pos)
        })

        const totalTiles = xWidth * yWidth;
        const totalMines = Math.round(totalTiles * mineProbability);
        let currentMines = 0;

        while (currentMines !== totalMines) {
            let key = `${Math.round(Math.random() * (xWidth - 1))}|${Math.round(Math.random() * (yWidth - 1))}`

            if(tiles[key].hasMine || positions.includes(key))
                continue;

            tiles[key].hasMine = true;
            currentMines++;
        }
    }

    private addNeighbors(): void
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

    private addNumbers(): void
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

    private showTiles(): void 
    {
        let {tiles, dom} = this;

        Object.keys(tiles).forEach(e => {
            dom.appendChild(tiles[e].dom);
        })
    }

    private setStyle(): void
    {
        let {dom, xWidth, yWidth} = this;

        dom.style.width = `${Tile.totalSize() * xWidth}px`;
        dom.style.height = `${Tile.totalSize() * yWidth}px`;
    }

    private setDom(): void
    {
        this.dom = document.createElement('div');
        this.dom.setAttribute('id', 'minefield');
    }

    public listen(data: string, event: string): void
    {
        console.log(data)
        this.startGame(data)
    }

    private startGame(tilePos: string): void
    {
        this.addMines(tilePos);
        this.addNumbers();
        this.tiles[tilePos].showTiles();
    }
}