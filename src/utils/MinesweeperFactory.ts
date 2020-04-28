import Minesweeper from "../minesweeper/Minesweeper";
import Minefield from "../minesweeper/Minefield";
import Header from "../minesweeper/Header";
import Reset from "../minesweeper/Reset";
import Counter from "../minesweeper/Counter";
import Timer from "../minesweeper/Timer";
import Settings from "../minesweeper/Settings";


export default class Factory
{
    public static create(dom: HTMLElement): Minesweeper
    {
        return new Minesweeper(
            dom,
            new Header(
                new Counter,
                new Reset,
                new Timer,
                new Settings
            ),
            new Minefield
        )
    }
}
