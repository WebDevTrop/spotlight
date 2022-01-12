import { Shop, Item } from '../gilded_rose';

describe("Conjured Item", function () {
    it("Conjured expected behaviour (degrade quality twice as fast)", function () {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", 10, 10)]);
        let items = gildedRose.updateQuality();
        // filter out items to only included conjured...
        let filteredItems = items.map(item => item.name === "Conjured Mana Cake" ? item : null).filter(x => x)
        const quality1 = filteredItems[0].quality
        gildedRose.updateQuality();
        filteredItems = items.map(item => item.name === "Conjured Mana Cake" ? item : null).filter(x => x)
        const quality2 = filteredItems[0].quality
        const pass = (quality1 - quality2) === 2 ? true : false;
        expect(pass).toEqual(true)
    });

});