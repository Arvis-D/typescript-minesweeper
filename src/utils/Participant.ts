export default interface Participant
{
    listen(eventName: string, data: string) : void;
}