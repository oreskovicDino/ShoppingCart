const Cart = require('../cart');

const cart = new Cart();
inputArray = ['3', '10'];

test('Should add new item into cart array', () => {
    cart.add(inputArray);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].sku).toBe(3);
    expect(cart.items[0].quantity).toBe(10);
});

test('Should Decrements quantity of cart item by an amount that was given', () => {
    cart.remove('3', '5');
    expect(cart.items[0].quantity).toBe(5);
});

test('Should Find an item in cart array and returns it.', () => {
    cart.getById(3);
    expect(cart.items[0].quantity).toBe(5);
    expect(cart.items[0].sku).toBe(3);
});


test('Should remove cart item if quantity is 0', () => {
    cart.remove('3', '5');
    expect(cart.items.length).toBe(0);
});


