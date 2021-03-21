export class Model{
    user;
    items;

    constructor(){
        this.user = "Adam";
        this.items = [new Item("Buy Flowers", false),
                      new Item("Get Shoes", false),
                      new Item("Collect Tickets", false),
                      new Item("Call Joe", false)];
    }
}

export class Item{
    action;
    done;

    constructor(action,done){
        this.action = action;
        this.done = done;
    }
}