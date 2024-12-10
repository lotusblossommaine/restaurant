import "./FooterTile.css";

export const FooterTile = ({ label, children }) => {
    return (
        <div className="footerTile">
            <div className="footerTileHeader">{label}</div>
            <br />
            {children}
        </div>
    )
}