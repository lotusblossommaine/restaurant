import classnames from 'classnames';
import { SECTIONS_WITH_WHITE_ITEMS } from "../../constants";
import { Price } from '../Price/Price';
import "./MenuItems.css";

export const MenuItems = ({ items, sectionName }) => {
    return (
        <div className="menuItems">
            {items.map(item => {
                const { name, prices, description } = item;
                return (
                    <div key={name} className={classnames("menuItem", { isSectionWithWhiteItem: SECTIONS_WITH_WHITE_ITEMS.includes(sectionName) })}>
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