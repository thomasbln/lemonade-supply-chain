// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

//define a contract LemonadeStand

contract LemonadeStand{
    //var Owner
    address owner;
    // var SKu counts
    uint skuCount;

    //Event 'State' with value 'ForSale'
    enum State {ForSale, Sold, Shipped}

    //Struct: Item, name, sku, price, state, seller, buyer
    struct Item {
        string name;
        uint sku;
        uint price;
        State state;
        address seller;
        address buyer;
    }

    //Define mapping items
    mapping (uint => Item) items;

    //Events
    event ForSale(uint skuCount);

    event Sold(uint sku);

    event Shipped(uint sku);

    //Modifier: Only Owner to msee if msg.sender == owner of the contract
    modifier onlyOwner
    {
        require(msg.sender == owner);
        _;
    }

    //Define a modifier that verifies the Caller
    modifier verifyCaller(address _address)
    {
        require(msg.sender == _address);
        _;
    }

    //Define a modifier that checks if the amount is sufficient to cover the price
    modifier paidEnough(uint _price)
    {
        require(msg.value >= _price);
        _;
    }

    //Define a modifier that checks if an item.state of a sku is ForSale
    modifier forSale(uint _sku)
    {
        require(items[_sku].state == State.ForSale);
        _;
    }

    //Define a modifier that checks if an item.state of a sku is Sold
    modifier sold(uint _sku)
    {
        require(items[_sku].state == State.Sold);
        _;
    }

    modifier checkValue(uint256 _sku) {
        _;
        uint256 _price = items[_sku].price;
        uint256 amountRefund = msg.value - _price;
        payable( items[_sku].buyer).transfer(amountRefund);
    }

    constructor()
    {
        owner = msg.sender;
        skuCount = 0;
    }

    function addItem(string memory _name, uint _price) onlyOwner public
    {
        //Increment sku
        skuCount = skuCount + 1;

        //Emit the appropiriate event
        emit ForSale(skuCount);

        //add the new item into inventory and mark it for sale
        items[skuCount] = Item({
            name: _name, 
            sku: skuCount, 
            price: _price, 
            state: State.ForSale, 
            seller: msg.sender, 
            buyer:address(0) 
            });

    }


    function buyItem(uint sku) forSale(sku) paidEnough(items[sku].price) checkValue(sku) public payable
    {
        // Update the buyer's address
        address buyer = payable(msg.sender);
        uint256 price = items[sku].price;
        //update buyer
        items[sku].buyer = buyer;
        //update state
        items[sku].state = State.Sold;
        //transfer money to seller
        payable(items[sku].seller).transfer(price); 

        emit Sold(sku); // emitted to Watch in frontend.
    }


    function fetchItem(uint _sku) public view returns (string memory name, uint sku, uint price, string memory stateIs, address seller, address buyer)
    {
        uint state;
        name = items[_sku].name;
        //sku = uint(items[_sku].state);
        sku = items[_sku].sku;
        price = uint(items[_sku].price);

        state = uint(items[_sku].state);
            if ( state == 0){
                stateIs = "ForSale";
            }

            if ( state == 1){
                stateIs = "Sold";
            }

            if ( state == 2){
                stateIs = "Shipped";
            }

        seller = items[_sku].seller;
        buyer = items[_sku].buyer;

    }

    function shipItem(uint256 sku) public sold(sku) verifyCaller(items[sku].seller)
    {
        items[sku].state = State.Shipped;

        emit Shipped(sku);
    }

}

