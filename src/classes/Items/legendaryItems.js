const Item = require('./item');

class LegendaryItems extends Item {
  constructor(name = 'Sulfuras, Hand of Ragnaros') {
    super(name, 0, 80);
  }

  updateItems() {
    this.sellIn -= 1;
  }
}

module.exports = LegendaryItems;