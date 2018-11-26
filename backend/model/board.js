class Board {
    constructor(){
        this.players = [];
        this.freePlaces = [1,2,3,4];
        this.packets = [];
        this.discarded = [];
        this.age = 0;
        this.turn = 0;
    }

    addPlayer(player){
        let i = this.freePlaces.indexOf(player.position);
        this.freePlaces.slice(i,1);
        this.players.push(player);
    }

    getTookPlaces(){
        let tookPlaces = [];
        let pos;
        let n;
        for (let i = 0; i < this.players.length; i++) {
            pos = this.players[i].position;
            n = this.players[i].name;
            tookPlaces.push({"name":n.toString(),
                "position":pos.toString()});
        }
        return tookPlaces;
    }

    distributeCities(cities){
        for(let i = 0; i<this.players.length;i++){
            this.players[i].setCity(cities[i]);
        }
    }

    distributeCards(cards){
        let half = cards.splice(cards.length/2);
        this.packets.push(half.splice(half.length/2));
        this.packets.push(half);
        this.packets.push(cards.splice(cards.length/2));
        this.packets.push(cards);

        for(let i = 0; i<this.players.length;i++){
            this.players[i].setHand(this.packets[i]);
        }
    }

    findPlayer(playerName){
        for(let i=0; i<this.players.length;i++){
            if(playerName === this.players[i].name){
                return this.players[i];
            }
        }
        return -1;
    }
}
module.exports = Board;