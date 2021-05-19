import { IList } from "./Ilist";

export class ListDemo{
    public name:string;
    constructor(items:IList){
        this.name = items.name;
    }
}