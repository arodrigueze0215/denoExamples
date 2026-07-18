class IOrderEvent {
    constructor(id, asset, quantity, price, status) {
        this.id = id;
        this.asset = asset;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
    }
    
}   

module.exports = IOrderEvent;
