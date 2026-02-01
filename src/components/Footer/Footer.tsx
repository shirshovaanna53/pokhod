import { useEffect, useState } from "react";
import { getServerTime } from "../../services/serverTime.ts";
import './Footer.scss'

export default function Footer() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        getServerTime().then(ts => {
            setYear(new Date(ts).getUTCFullYear());
        });
    }, []);

    return (
        year ? <div className="footer">
            {'© '}{year}{' Анечка'}
        </div> : null
    );
}
