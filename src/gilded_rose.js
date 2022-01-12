export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {
      // ^^ loops through the items
      if (
        item.name != 'Aged Brie'
        && item.name != 'Backstage passes to a TAFKAL80ETC concert'
        && item.quality > 0
        && item.name != 'Sulfuras, Hand of Ragnaros'
      ) {
        // ^^ if the current item's name is not:
        /*
        'Aged Brie',
        'Backstage passes to a TAFKAL80ETC concert',
        the quality is greater than 0,
        the current item's name is not 'Sulfuras, Hand of Ragnaros'...
        */
        item.quality = item.quality - 1; // decrement the current item's quality by 1
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              item.quality = item.quality + 1;
            }
            if (item.sellIn < 6) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (
            item.name != 'Backstage passes to a TAFKAL80ETC concert'
            && item.quality > 0
            && item.name != 'Sulfuras, Hand of Ragnaros'
          ) {
              item.quality = item.quality - 1;
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    })


    return this.items;
  }
}