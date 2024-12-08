import React, { useEffect, useState } from "react"
import { readCSV, parseData } from "../utils";
import './Menu.css';

const Price = ({ prices }) => {
    if (!prices) {
        return null;
    }

    return (
        <div className="prices">
            {prices.map(price => {
                const { amount, quantity } = price;
                return (
                    <div className="price">
                        {quantity && `(${quantity}) `}
                        {amount}
                    </div>
                );
            })}
        </div>
    )
}

const MenuItems = ({ items }) => {
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
                        <Price prices={prices} />
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

const MenuSection = ({ section }) => {
    const { name, items, hasPriceHeader } = section;
    return (
        <div className="menuSection">
            <h3>{name}</h3>
            {hasPriceHeader && <PriceHeader />}
            <MenuItems items={items} />
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
            {data.map(section => {
                return <MenuSection section={section} />
            })}
        </div>
    )
}

export default Menu;