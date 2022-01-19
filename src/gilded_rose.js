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
    this.items.map(item => {
      const minQuality = 0 // the minimum quality
      const maxQuality = 50 // the maximum quality 
      const legendary = ['Sulfuras'] // never decreases in quality, never has to be sold.
      const increasesWithAge = ['Aged Brie'] // increases by 
      const backstagePasses = ['Backstage passes to a TAFKAL80ETC concert'] // backstage passes, quality increases as expiry comes closer but worthless once concert complete. 
      const conjuredItems = ['Conjured Mana Cake'] // conjured items test
      const { name, sellIn, quality } = item
      if (!legendary.includes(name) && !backstagePasses.includes(name) && !increasesWithAge.includes(name) && !conjuredItems.includes(name)) {
        // standard procedure of decrementing sellin and quality 
        item.sellIn = item.sellIn - 1; // decrement sellin
        item.quality = item.quality - 1; // decrement quality
      }

      if (increasesWithAge.includes(name)) {
        // we need to decrease the sellIn but increase the quality 
        item.sellIn = item.sellIn - 1;
        item.quality = item.quality + 1;
      }

      if (backstagePasses.includes(name)) {
        // we need to conditionally increment.
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 11) {
          item.quality = item.quality + 2; // increment item quality.
        }
        if (item.sellIn < 6) {
          item.quality = item.quality + 3; // increment item quality.
        }
        if(item.sellIn >= 11){
          item.quality = item.quality + 1;
        }
      }
      if (conjuredItems.includes(name)) {
        // we need to degrade this item twice as fast as a regular item. 
        item.quality = item.quality - 2; 
        item.sellIn = item.sellIn - 1;
      }

      // final checks... 

      if(item.quality > maxQuality){
        item.quality = maxQuality
      }

      if(item.quality < minQuality){
        item.quality = minQuality
      }

      return item;


    })
    return this.items;
  }
}