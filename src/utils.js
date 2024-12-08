import Papa from 'papaparse';
import data from './data/menu.csv';

export const readCSV = async () => {
    const response = await fetch(data);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvString = decoder.decode(result.value);

    return new Promise(resolve => {
        Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                resolve(results.data)
            },
        })
    })
}

export const parseData = (data) => {
    const sections = {};

    data.forEach(item => {
        const { Section, SmallPrice, LargePrice, SmallQuantity, LargeQuantity, ItemDescription } = item;
        const sectionName = Section;
        if (!sections[sectionName]) {
            sections[sectionName] = [];
        }

        const prices = [];
        if (SmallPrice) {
            prices.push({ label: 'Small', amount: SmallPrice, quantity: SmallQuantity });
        }
        if (item.LargePrice) {
            prices.push({ label: 'Large', amount: LargePrice, quantity: LargeQuantity });
        }

        sections[sectionName].push({
            name: item.Item,
            prices: prices.length > 0 ? prices : undefined,
            description: ItemDescription,
        });
    });

    const result = Object.entries(sections).map(([sectionName, items]) => ({
        name: sectionName,
        items,
        hasPriceHeader: items.some(item => item.prices?.length > 1),
    }));

    return result;
};
