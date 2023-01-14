const LemonadeStand = artifacts.require('LemonadeStand');
var accounts;
 
contract('LemonadeStand', (accounts) => {
  owner = accounts[0];
  const sellingPrice = 300;
  //send more to check modifier checkValue
  const buyerSendAmount = sellingPrice + 100;
  const itemName = 'iPhone 13  mini';

  it('seller add item', async () => {  
    const lemonade = await LemonadeStand.deployed();
    await lemonade.addItem(itemName, sellingPrice);
    const result = await lemonade.fetchItem(1);
    //console.log(result);
    assert(result.sku.toNumber() === 1);
    assert(result.stateIs == 'ForSale');
    assert(result.name === itemName);
  });
   
   it('lets user2 buy an item', async() => {
    const accounttwo = accounts[1];
    const lemonade = await LemonadeStand.deployed();
    await lemonade.buyItem(1, {from: accounttwo, value: buyerSendAmount});
    const result = await lemonade.fetchItem(1);
    assert(result.stateIs == 'Sold');
    //console.log(result);
   });

   it('lets seller set item status to Shipped', async() => {
    const lemonade = await LemonadeStand.deployed();
    await lemonade.shipItem(1, {from: owner});
    const result = await lemonade.fetchItem(1);
    assert(result.stateIs == 'Shipped');
    //console.log(result);
   });

});  


  

  
  

  
   
