import { Shop } from '../gilded_rose';
import { Item } from '../classes/Items'

const createFixtureShop = () => {
    const items = [];

    items.push(new Item('+5 Dexterity Vest', 10, 20));
    items.push(new Item('Aged Brie', 2, 0));
    items.push(new Item('Elixir of the Mongoose', 5, 7));
    items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
    // this conjured item does not work properly yet
    items.push(new Item('Conjured Mana Cake', 3, 6));

    return new Shop(items)
}

const cloneDeep = function (data) {
    return JSON.parse(JSON.stringify(data))
}

describe("Glided Rose", () => {

    test('should decrease Conjured Items quality twice as fast', () => {
        const GildedRose = new Shop([new Item('Conjured Item', 5, 10, true)]);
        const items = GildedRose.updateQuality();
        const cake = items.shift();
        expect(cake.quality).toEqual(8);
        expect(cake.sellIn).toEqual(4);
    });

    test('aged brie should increase in quality the older it gets', () => {
        const GildedRose = new Shop([new Item("Aged Brie", 3, 1)]);
        const items = GildedRose.updateQuality();
        const brie = items.shift();
        expect(brie.sellIn).toEqual(2);
        expect(brie.quality).toEqual(2);
    });

    test('Backstage passes should increase by 2 within 10 days', () => {
        const GildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 11)]);
        const items = GildedRose.updateQuality();
        const pass = items.shift();
        expect(pass.sellIn).toEqual(9);
        expect(pass.quality).toEqual(13);
    });

    test('Backstage passes should increase by 3 within 5 days', () => {
        const GildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
        const items = GildedRose.updateQuality();
        const pass = items.shift();
        expect(pass.sellIn).toEqual(4);
        expect(pass.quality).toEqual(23);
    });

    test('Sulfuras should not alter', () => {
        const GildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 0)]);
        const items = GildedRose.updateQuality();
        expect(items[0].quality).toEqual(80);
    });
    
    test('should not degrade Item quality below zero', () => {
        const gildedRose = new Shop([new Item('foo', 0, 0)]);
        const items = gildedRose.updateQuality();
        const fooItem = items.shift();
        expect(fooItem.name).toEqual('foo');
        expect(fooItem.sellIn).toEqual(-1);
        expect(fooItem.quality).toEqual(0);
    });

    test('should decrease Conjured Items quality twice as quickly', () => {
        const GildedRose = new Shop([new Item('Conjured Item', 5, 10, true)]);
        const items = GildedRose.updateQuality();
        const cake = items.shift();
        expect(cake.quality).toEqual(8);
        expect(cake.sellIn).toEqual(4);
    });

    it("should return the expected value of an item", () => {
        const shop = createFixtureShop();
        const days = 2;
        const actual = [];

        for (let i = 0; i < days; i++) {
            actual.push(cloneDeep(shop.items));
            shop.updateQuality();
        }

        expect(actual).toMatchSnapshot();
    })
})