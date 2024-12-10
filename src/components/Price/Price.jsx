import { DRINKS, SECTIONS_WITH_NO_SIZE_HEADER } from "../../constants";
import "./Price.css";

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

export const Price = ({ prices, sectionName }) => {
    if (!prices) {
        return null;
    }

    return (
        <div className="prices">
            {prices.map((price, index) => {
                const { amount, quantity } = price;
                return (
                    <div key={`${amount}x${quantity}`} className="price">
                        {quantity && `(${quantity}) `}
                        <QuantityLabel sectionName={sectionName} prices={prices} index={index} />
                        {amount}
                    </div>
                );
            })}
        </div>
    )
}