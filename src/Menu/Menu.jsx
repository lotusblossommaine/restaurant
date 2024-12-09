import React, { useEffect, useState } from "react"
import { readCSV, parseData } from "../utils";
import './Menu.css';
import { BEER, BEVERAGES, COMBO_PLATE_SECTIONS, DRINKS, FOOD_SECTION_LIST, LUNCHEON_SPECIALS, MIXED_DRINKS, NON_ALCOHOLIC_BEER_OPTION, PU_PU_PLATTERS, SECTIONS_WITH_COLUMNS, SECTIONS_WITH_NO_SIZE_HEADER, SUGGESTIONS, WINE } from "../constants";
import classnames from 'classnames';

const QuantityLabel = ({ sectionName, prices, index }) => {
    const isDrinksSection = sectionName === DRINKS;
    const quantityLabels = isDrinksSection ? ['For One', 'For Two', 'For Three'] : ['S', 'M', 'L']
    if (!SECTIONS_WITH_NO_SIZE_HEADER.includes(sectionName)) {
        return null;
    }

    if (prices.length <= 1) {
        return null;
    }

    return isDrinksSection ? `${quantityLabels[index]}..... ` : `(${quantityLabels[index]}) `;

}

const Price = ({ prices, sectionName }) => {
    if (!prices) {
        return null;
    }

    return (
        <div className="prices">
            {prices.map((price, index) => {
                const { amount, quantity } = price;
                return (
                    <div className="price">
                        {quantity && `(${quantity}) `}
                        <QuantityLabel sectionName={sectionName} prices={prices} index={index} />
                        {amount}
                    </div>
                );
            })}
        </div>
    )
}

const MenuItems = ({ items, sectionName }) => {
    return (
        <div className="menuItems">
            {items.map(item => {
                const { name, prices, description } = item;
                return (
                    <div className="menuItem">
                        <div className="menuItemDetails">
                            <div className="menuItemName">{name}</div>
                            {description && <div className="menuItemDescription">{description}</div>}
                        </div>
                        <Price prices={prices} sectionName={sectionName} />
                    </div>)
            })}
        </div>
    )
}

const PriceHeader = () => {
    return (
        <div className="priceLabels">
            <div className="priceLabel">Small</div>
            <div className="priceLabel">Large</div>
        </div>
    )
}

const PuPuPlatterDescription = ({ description }) => {
    const substitutionCostIndex = description.indexOf("($");
    const substitutionCost = substitutionCostIndex !== -1 ? description.substring(substitutionCostIndex) : ''
    const appetizers = substitutionCostIndex !== -1 ? description.substring(0, substitutionCostIndex) : ''
    const descriptionList = appetizers.split(',');

    return (
        <>
            {appetizers &&
                <div className="puPuPlatterDescription">
                    {descriptionList.map(appetizer => {
                        return <div>{appetizer}</div>
                    })}
                </div>
            }
            {substitutionCost}
        </>
    )
}

const PuPuPlatterSection = ({ items, name }) => {
    return (
        <div className="puPuPlatterItem">
            {items.map(item => {
                const { prices, description } = item;
                return (
                    <div className="puPuPlatterSection">
                        <div className="puPuPlatterHeader">
                            <h3>{name}</h3>
                            <Price prices={prices} />
                        </div>
                        <div className="menuItemDetails">
                            {description &&
                                <div className="menuItemDescription">
                                    <PuPuPlatterDescription description={description} />
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const ComboPlateDescription = () => {
    return (
        <h4>
            Served with Roast Pork Fried Rice/White Rice and Appetizer Choice of Egg Roll (1), Chicken Wings (2), Chicken Fingers (3), Crab Rangoons (3)
        </h4>
    )
}

const MenuSection = ({ section }) => {
    if (!section) {
        return null;
    }

    const { name, items, hasPriceHeader } = section;
    if (PU_PU_PLATTERS.includes(name)) {
        return <PuPuPlatterSection items={items} name={name} />
    }

    return (
        <div className={classnames("menuSection", { isColumn: SECTIONS_WITH_COLUMNS.includes(name), isDrinksSection: name === DRINKS })}>
            {COMBO_PLATE_SECTIONS.includes(name) &&
                <div className="luncheonSpecialsDescription">
                    {name === LUNCHEON_SPECIALS ? 'Served Daily 11:00am to 3:00pm' : <br />}
                </div>
            }
            {COMBO_PLATE_SECTIONS.includes(name) || name === SUGGESTIONS ? <h2>{name}</h2> : <h3>{name}</h3>}
            {COMBO_PLATE_SECTIONS.includes(name) && <ComboPlateDescription />}
            {hasPriceHeader && <PriceHeader />}
            <MenuItems items={items} sectionName={name} />
        </div>
    )
}

const MenuGrouping = ({ data, sectionList }) => {
    return (
        <div className="menuGroup">
            {sectionList.map(sectionName => {
                const section = data.find(({ name }) => name === sectionName);
                return (
                    <MenuSection section={section} />
                )
            })}
        </div>
    )
}

const Menu = ({ isTakeout }) => {
    const [data, setData] = useState();

    useEffect(() => {
        async function fetchData() {
            const csvData = await readCSV();
            const parsedData = parseData(csvData, isTakeout);
            setData(parsedData);
        }
        fetchData();
    }, [isTakeout]);

    if (!data) {
        return null;
    }

    console.log({ data })

    return (
        <div className="menu">
            <MenuGrouping data={data} sectionList={FOOD_SECTION_LIST} />
            <MenuGrouping data={data} sectionList={COMBO_PLATE_SECTIONS} />
            <MenuGrouping data={data} sectionList={[SUGGESTIONS]} />
            {!isTakeout &&
                <>
                    <MenuGrouping data={data} sectionList={[DRINKS]} />
                    <MenuGrouping data={data} sectionList={[MIXED_DRINKS]} />
                    <MenuGrouping data={data} sectionList={[BEER, WINE, NON_ALCOHOLIC_BEER_OPTION]} />
                    <MenuGrouping data={data} sectionList={[BEVERAGES]} />
                </>
            }
        </div>
    )

}

export default Menu;