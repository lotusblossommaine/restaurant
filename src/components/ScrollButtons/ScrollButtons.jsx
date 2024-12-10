import "./ScrollButtons.css";

export const ScrollButtons = ({ luncheonSpecialsRef, drinksRef, isTakeout }) => {
    const scrollToLunch = () => {
        luncheonSpecialsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const scrollToDrinks = () => {
        drinksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="scrollButtonsContainer">
            <div className="scrollButton" onClick={scrollToLunch}>Luncheon Specials</div>
            {!isTakeout && <div className="scrollButton" onClick={scrollToDrinks}>Drinks</div>}
        </div>
    )
}