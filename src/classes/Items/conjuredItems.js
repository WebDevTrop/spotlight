const Item = require('./item');

class ConjuredItems extends Item {

  updateItems() {
    this.sellIn -= 1;
    this.quality = Math.max(0, this.sellIn > 0 ? this.quality - 2 : this.quality - 4);
  }
}

module.exports = ConjuredItems;