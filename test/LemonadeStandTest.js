const LemonadeStand = artifacts.require('LemonadeStand');
var accounts;
 
contract('LemonadeStand', (accounts) => {
  owner = accounts[0];
  const sellingPrice = 300;
  //send more to check modifier checkValue
  const byerSendAmount = sellingPrice + 100;
  const itemName = 'iPhone 13  mini';

  it('must pass this stuff', async () => {  
    const lemonade = await LemonadeStand.deployed();
    await lemonade.addItem(itemName, sellingPrice);
    const result = await lemonade.fetchItem(1);
    console.log(result);
    assert(result.sku.toNumber() === 1);
    assert(result.stateIs == 'ForSale');
    assert(result.name === itemName);
  });
  
  it('If item bought or not', async () => {
    const lemonade = await LemonadeStand.deployed();
    const result = await lemonade.fetchItem(1);
    //console.log(result);
    assert(result.sku.toNumber() === 1);
   });
   
   it('lets user2 buy a item, if it is put up for sale', async() => {
    const accounttwo = accounts[1];
    const lemonade = await LemonadeStand.deployed();
    const result = await lemonade.buyItem(1, {from: accounttwo, value: byerSendAmount});
    //console.log(result);
   });

   it('If item bought or not', async () => {
    const lemonade = await LemonadeStand.deployed();
    const result = await lemonade.fetchItem(1);
    console.log(result);
    assert(result.sku.toNumber() === 1);
   });

   it('lets seller set item status to Shipped', async() => {
    const lemonade = await LemonadeStand.deployed();
    const result = await lemonade.shipItem(1, {from: owner});
    //console.log(result);
   });

   it('If item bought or not', async () => {
    const lemonade = await LemonadeStand.deployed();
    const result = await lemonade.fetchItem(1);
    console.log(result);
    assert(result.sku.toNumber() === 1);
   });

});  


  

  
  

  
   
