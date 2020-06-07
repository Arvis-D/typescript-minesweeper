import Minefield from "./Minefield";
import Header from "./Header";
import Participant from "../utils/Participant";
import Mediator from "../utils/Mediator";

import Tile from "../minesweeper/Tile";

export default class Minesweeper implements Participant
{
    constructor(
        public dom: HTMLElement,
        private header: Header,
        private minefield: Minefield
    ) {
        this.dom.appendChild(this.header.dom);
        this.dom.appendChild(this.minefield.dom);

        Mediator.addParticipant('game started', this);
        Mediator.addParticipant('reset', this);
        Mediator.addParticipant('mine stepped', this);
        Mediator.addParticipant('victory', this);

        header.counter.setMinesLeft(minefield.getMineCount());
        this.resetSettings();
    }

    public listen(event: string, data: string): void
    {
        switch (event) {
            case 'game started':
                this.startGame(data)
            break;
            case 'reset':
                this.reset();
            break;
            case 'mine stepped':
                this.defeat(data);
            break;
            case 'victory':
                this.victory();
            break;
        }
    }

    private startGame(tilePos: string): void
    {
        let {minefield, header} = this;

        minefield.addMines(tilePos);
        minefield.addNumbers();
        minefield.tiles[tilePos].showTiles();

        header.reset.changeBackground('normal');
        header.timer.startCounting();
    }

    private reset(): void
    {
        let {minefield, header} = this;

        this.resetSettings();

        minefield.removeTilesFromDom();
        minefield.createTiles();
        minefield.addNeighbors();
        minefield.showTiles();

        header.timer.stopCounting();
        header.timer.reset();
        header.counter.setMinesLeft(minefield.getMineCount());
        header.reset.changeBackground('normal');

        Tile.active = true;
    }

    private resetSettings(): void
    {
        let {minefield, header} = this;
        let {values} = header.settings;

        minefield.tileSize = values.tileSize;
        minefield.xWidth = values.xWidth;
        minefield.yWidth = values.yWidth;
        minefield.mineProbability = values.probability;
        minefield.setStyle();
    }

    private victory(): void
    {
        Tile.active = false;

        this.header.reset.changeBackground('victory');
        this.header.timer.stopCounting();
    }

    private defeat(pos: string): void
    {
        let {minefield, header} = this;

        header.reset.changeBackground('dead');
        header.timer.stopCounting();

        minefield.showAllMines();
        minefield.tiles[pos].dom.style.backgroundColor = 'red';

        Tile.active = false;
    }
}