const products = [
  {id: 1, price: 500, name: 'Mezcla original 200g'},
  {id: 2, price: 900, name: 'Mezcla original 500g'},
  {id: 3, price: 700, name: 'Mezcla especial 200g'},
  {id: 4, price: 1200, name: 'Mezcla especial 500g'}
]

const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
  const id = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);
  const selectedProduct = products.find(product => product.id === id)
  const purchase = {
    name: selectedProduct.name,
    price: selectedProduct.price,
    number: number,
  };

  const newPurchase = purchases.findIndex((item) => item.price === purchase.price)
  if(purchases.length < 1 || newPurchase === -1) {
    purchases.push(purchase)
  } else {
    purchases[newPurchase].number += purchase.number
  }

  window.alert(`${display()}\nSubtotal: ${subtotal()}`);
  priceElement.value = "";
  numberElement.value = "";
}

function display() {
  return purchases.map(purchase => {
    return `Nombre: ${purchase.name}. Precio: ${purchase.price}. Cantidad: ${purchase.number}`
  }).join("\n");
}

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.price * purchase.number 
  }, 0);
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`Los gastos de envio son ${postage}. El total es de ${sum + postage} yenes`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000){
   return 500;
  } else {
   return 250;
  }
}