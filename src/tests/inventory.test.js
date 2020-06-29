const Invnetory = require('../inventory');

const inventory = new Invnetory();
inputArray = ['3', 'Test', '20', '3.30'];


test('Should add new item into inventory array', () => {
    inventory.add(inputArray);
    expect(inventory.items.length).toBe(1);
    expect(inventory.items[0]).toEqual({
        sku: parseInt(inputArray[0]),
        name: inputArray[1],
        quantity: parseInt(inputArray[2]),
        price: parseFloat(inputArray[3])
    });
});


test('Should Decrements quantity of an inventory item by an amount that was given.', () => {
    inventory.remove(['3', '10']);
    expect(inventory.items[0].quantity).toBe(10);
});

test('Should Find an item in cart array and returns it.', () => {
    inventory.getById(3);
    expect(inventory.items[0].quantity).toBe(10);
    expect(inventory.items[0].sku).toBe(3);
});

test('Should remove inventory item if quantity is 0', () => {
    inventory.remove(['3', '10']);
    expect(inventory.items.length).toBe(0);
});




