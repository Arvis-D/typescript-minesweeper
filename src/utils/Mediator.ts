import Participant from "./Participant";

export default class Mediator
{
    static participants: {
        [event: string] : Array<Participant>
    } = {}

    static notify (event: string, data: string): void
    {
        this.participants[event].forEach(e => {
            e.listen(data, event);
        });
    }

    static addParticipant(event: string, participant: Participant): void 
    {
        this.participants[event] = this.participants[event] || [];
        this.participants[event].push(participant);
    }
}