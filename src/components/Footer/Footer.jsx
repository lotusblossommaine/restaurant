import { FooterTile } from "../FooterTile/FooterTile";
import "./Footer.css";

const OPENING_HOURS = [
    { dayOfWeek: 'Mon', hours: '11:00am - 9:00pm' },
    { dayOfWeek: 'Tues', hours: '11:00am - 9:00pm' },
    { dayOfWeek: 'Wed', hours: '11:00am - 9:00pm' },
    { dayOfWeek: 'Thurs', hours: '11:00am - 9:00pm' },
    { dayOfWeek: 'Fri', hours: '11:00am - 9:00pm' },
    { dayOfWeek: 'Sat', hours: '11:00am - 9:00pm' },
    { dayOfWeek: 'Sun', hours: '11:00am - 9:00pm' }
];

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footerContent">
                <FooterTile label="Opening Hours">
                    {OPENING_HOURS.map(day => {
                        const { dayOfWeek, hours } = day;
                        return (
                            <div className="dayOfWeekHours">
                                <div>{dayOfWeek}:</div>
                                <div>{hours}</div>
                            </div>
                        )
                    })}
                </FooterTile>
                <FooterTile label="Contact Details">
                    <div>605 Wilton Road (Routes 2 & 4)</div>
                    <div>Farmington, ME 04938</div>
                    <div>T: 207-778-6378</div>
                    <div>T: 207-778-6379</div>
                </FooterTile>
                <FooterTile label="Reservations">
                    <div>Banquet Room available for large parties. Please call to make reservations.</div>
                </FooterTile>
            </div>
        </div>
    )
}