import Modal from "../utils/Modal";
import Mediator from "../utils/Mediator";

export default class Settings extends Modal
{
    public dom: HTMLElement;
    private save: HTMLElement;
    private input: NodeListOf<any>;
    public values: {[valueName:string]: number} = {
        xWidth: 30,
        yWidth: 16,
        probability: 0.208,
        tileSize: 30
    };
    
    constructor()
    {
        super(document.querySelector('.modal'));
        this.createDom();

        this.input = this.modal.querySelectorAll('input');

        this.updateInput();
    }

    private createDom(): void
    {
        this.dom = document.createElement('button');
        this.dom.innerHTML = `<span class="mi mi-settings"></span>`
        this.dom.classList.add('btn', 'btn-round');
        this.dom.setAttribute('id', 'settings');
        this.dom.addEventListener('click', () => {
            this.openModal();
        })

        this.save = this.modal.querySelector('.save');
        this.save.addEventListener('click', () => {
            this.saveSettings();
        })

    }

    private saveSettings(): void
    {
        let input: {[name:string]:number} = {
            xWidth: parseInt(this.input[0].value),
            yWidth: parseInt(this.input[1].value),
            probability: parseFloat(this.input[2].value) / 100,
            tileSize: parseInt(this.input[3].value),
        }

        if (this.validate(input)) {
            this.values = {... input};

            Mediator.notify('reset');
        }
    }

    private updateInput(): void
    {
        this.input.forEach((e, i) => {
            e.value = Object.values(this.values)[i].toString();
        })

        this.input[2].value = this.values.probability * 100;
    }

    private validate(input: {[name:string]:number}): boolean
    {
        const {xWidth, yWidth, probability, tileSize} = input;

        console.log(input);

        if (Object.values(input).filter(e => isNaN(e)).length ) {
            alert('incorrect values');
            return false;
        }

        if (xWidth < 5 || yWidth < 5) {
            alert ('minefield must be at least 5x5');
            return false;
        } else if (Math.round(probability * xWidth * yWidth) >= Math.round((xWidth * yWidth - 9)) || probability < 0) {
            alert ('too many or too few mines')
            return false;
        } else if (tileSize < 10 || tileSize > 100) {
            alert ('tile size incorrect')
            return false;
        }

        return true;
    }
}