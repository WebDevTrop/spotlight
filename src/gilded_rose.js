const {
  AgedBrie,
  RandomItems,
  BackstagePass,
  LegendaryItems,
  ConjuredItems,
} = require('./classes/Items');

class Shop {
  constructor(items = []) {

    this.items = items.map((item) => {
      switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros': return new LegendaryItems();
        case 'Aged Brie': return new AgedBrie(item.sellIn, item.quality);
        case 'Backstage passes to a TAFKAL80ETC concert': return new BackstagePass(item.sellIn, item.quality);
        case 'Conjured Item': return new ConjuredItems(item.name, item.sellIn, item.quality);
        default: return new RandomItems(item.name, item.sellIn, item.quality);
      }
    });
  }

  updateQuality() {
    this.items.forEach((item) => item.updateItems());
    return this.items;
  }
}

module.exports = {
  Shop,
};