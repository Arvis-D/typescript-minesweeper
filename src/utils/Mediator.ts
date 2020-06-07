import Participant from "./Participant";

export default class Mediator
{
    static participants: {
        [event: string] : Array<Participant>
    } = {}

    static notify (event: string, data: string = null): void
    {
        if (!this.participants[event]) {
            console.log(`Error: nobody is listening to "${event}" event`);
            return;
        }

        this.participants[event].forEach(e => {
            e.listen(event, data);
        });
    }

    static addParticipant(event: string, participant: Participant): void 
    {
        this.participants[event] = this.participants[event] || [];
        this.participants[event].push(participant);
    }
}