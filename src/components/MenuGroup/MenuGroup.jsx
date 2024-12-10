import { MenuSection } from '../MenuSection/MenuSection';
import './MenuGroup.css';

export const MenuGroup = ({ data, sectionList }) => {
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