import Web3 from "web3";
import LemonadeStand from "../../build/contracts/LemonadeStand.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LemonadeStand.networks[networkId];
      this.meta = new web3.eth.Contract(
        LemonadeStand.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },
  //setStatus output to id -> status
  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
  
  // addItem: name and price  from input values
  addItem: async function() {
    const { addItem } = this.meta.methods;
    const name = document.getElementById("itemName").value;
    const price = document.getElementById("sellingPrice").value;
    await addItem(name, price).send({from: this.account});
    App.setStatus("New Item Owner is " + this.account + ".");
  },
  
  //buyItem sku and price from input values
  buyItem: async function() {
    const { buyItem } = this.meta.methods;
    const sku = document.getElementById("itemBuy").value;
    const price = document.getElementById("buyPrice").value;
    await buyItem(sku).send({from: this.account, value: price});
    App.setStatus("New Item Owner is " + this.account + " - sku " + sku + " - price " + price);
  },

  //fetchItem infos from given id : sku
  fetchItem: async function (){
    const {fetchItem} = this.meta.methods;

    const sku = document.getElementById("sku").value;
    let result = await fetchItem(sku).call();
    console.log(result);
    let skuresult = result.sku;
    let output =  "Fetched Item result: <br> " +
                  'sku: ' + result.sku + "<br>" +
                  'name: ' + result.name + "<br>" +
                  'price: ' + result.price + "<br>" +
                  'status: ' + result.stateIs + "<br>" +
                  'seller address: '+ result.seller ;
    App.setStatus(output);
  },

  //shipItem set status from item (sku) to Shipped
  shipItem: async function (){
    const {shipItem} = this.meta.methods;

    const sku = document.getElementById("ItemSKUShipped").value;
    await shipItem(1).send({from: this.account});
    console.log(sku);
  }

};

window.App = App;
//connect with MetaMask
window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});