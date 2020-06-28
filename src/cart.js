const chalk = require('chalk');


class Cart {
    constructor() {
        this.items = [];
    };

    /**
     *cartItem function takes in an array and creates an object that consists of SKU, quantity.
     *
     * @param {*} inputArray - An array that consists of SKU, quantity.
     * @returns new cartItem object that is filled.
     * @memberof Cart
     */
    cartItem(inputArray) {
        return {
            sku: parseInt(inputArray[0]),
            quantity: parseInt(inputArray[1])
        };
    };

    /**
     *Adds new item to cart.
     *Logs when the item was added
     * @param {*} inputArray - An array that consists of SKU, quantity.
     * @memberof Cart
     */
    add(inputArray) {
        const item = this.cartItem(inputArray);
        this.items.push(item);
        console.log(chalk.green(`One Cart Item Added: SKU - ${item.sku},  Quantity - ${item.quantity}`));
    };

    /**
     *Decrements quantity of cart item by an amount that was given. If quantity is at 0 or below, removes the item from the array.
     *
     * @param {*} sku - identification number of an item.
     * @param {*} amount - a number that is subtracted of cart item quantity.
     * @memberof Cart
     */
    remove(sku, amount) {
        const item = this.getById(sku);

        if (!item) {
            throw "Item is not in the cart!"
        };

        if ((item.quantity - amount) > 0) {
            item.quantity -= amount;
            console.log(chalk.red(`Item subtracted by ${amount}. Current quantity ${item.quantity}`));
        } else if ((item.quantity - amount) == 0) {
            const filteredItems = this.items.filter((item) => item.sku != sku);
            this.items = filteredItems;
            console.log(chalk.red(`Product Removed from the cart`));
        } else {
            throw "Insufficient quantity in stock. try to remove the smaller number";
        }
    };

    /**
     *Prints all items and total price
     *
     * @param {*} inventoryItems - array of inventoryItems used for searching by SKU
     * @memberof Cart
     */
    checkout(inventoryItems) {
        let total = 0;

        for (let i = 0; i < this.items.length; i++) {
            const cartItem = this.items[i];
            const inventorItem = inventoryItems.find((item) => item.sku == cartItem.sku);
            const itemTotal = inventorItem.price * cartItem.quantity;
            total += itemTotal;

            if (i % 2 == 0) {
                console.log(chalk.blue(`product name: ${inventorItem.name} / ${cartItem.quantity} x ${inventorItem.price} = ${itemTotal}`));
            } else {
                console.log(chalk.cyan(`product name: ${inventorItem.name} / ${cartItem.quantity} x ${inventorItem.price} = ${itemTotal}`));
            };
        };
        this.items = [];
        console.log(chalk.bgMagenta.yellow(`Total = ${total}`));

    }

    /**
     *Finds an item in cart array and returns it.
     *
     * @param {*} sku - identification number of an item.
     * @returns an item that matches sku.
     * @memberof Cart
     */
    getById(sku) {
        return this.items.find((item) => item.sku == sku);
    }

}

module.exports = Cart;