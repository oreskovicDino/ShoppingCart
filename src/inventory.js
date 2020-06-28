const chalk = require('chalk');


/**
 *Inventory class used for adding and removing inventory items from inventory.
 *
 * @class Inventory
 */
class Inventory {

    constructor() {
        this.items = [];
    }

    /**
     *inventoryItem function takes in an array and creates an object that consists of SKU, name, quantity, price.
     *
     * @param {*} inputArray - An array that consists of SKU, name, quantity, price.
     * @returns new inventoryItem object that is filled.
     * @memberof Inventory
     */
    inventoryItem(inputArray) {
        return {
            sku: parseInt(inputArray[0]),
            name: inputArray[1],
            quantity: parseInt(inputArray[2]),
            price: parseFloat(inputArray[3])
        };
    };


    /**
     *Adds new item to inventory.
     *Logs when the item was added
     * @param {*} inputArray- An array that consists of SKU, name, quantity, price.
     * @memberof Inventory
     */
    add(inputArray) {
        const item = this.inventoryItem(inputArray);
        this.items.push(item);
        console.log(chalk.green(`One Item Added: SKU - ${item.sku}, Name - ${item.name}, Quantity - ${item.quantity}, Price - ${item.price}`));

    };


    /**
     *Decrements quantity of an inventory item by an amount that was given. If quantity is at 0 or below, removes the item from the array.
     *
     * @param {*} inputArray- An array that consists of SKU and quantity.
     * @memberof Inventory
     */
    remove(inputArray) {
        const item = this.getById(inputArray[0]);
        const amount = inputArray[1];

        if (!item) {
            throw "Item is not in stock!"
        }
        if ((item.quantity - amount) > 0) {

            item.quantity -= amount;
            console.log(chalk.red(`Item ${item.name} subtracted by ${amount}. Current quantity ${item.quantity}`));

        } else if ((item.quantity - amount) == 0) {

            const filteredItems = this.items.filter((item) => item.sku != inputArray[0]);
            this.items = filteredItems;

            filteredItems.forEach(item => {
                console.log(`Item Id: ${item.sku}  Item quantity: ${item.quantity}`);

            });

            console.log(chalk.red(`Product Removed from the inventory`));

        } else {
            throw "Insufficient quantity in stock!";
        }

    };

    /**
     *Finds an item in inventory array and returns it.
     *
     * @param {*} sku- identification number of an item.
     * @returns an item that matches sku.
     * @memberof Inventory
     */
    getById(sku) {
        return this.items.find((item) => item.sku == sku);
    };

}

module.exports = Inventory;