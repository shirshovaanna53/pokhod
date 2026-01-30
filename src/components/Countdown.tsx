import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCountdown.scss";

let timeOffset = 0;

async function getServerTime() {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC");
    const data = await res.json();
    return new Date(data.utc_datetime).getTime();
}

async function syncTime() {
    const server = await getServerTime();
    const client = Date.now();
    timeOffset = server - client;
}

function now() {
    return Date.now() + timeOffset;
}

export function AnimatedCountdown({ target }: { target: Date }) {
    const [time, setTime] = useState(getTimeLeft(target));

    useEffect(() => {
        syncTime();

        const id = setInterval(() => {
            setTime(getTimeLeft(target));
        }, 1000);

        return () => clearInterval(id);
    }, [target]);

    return (
        <div className="countdown">
            <TimeUnit label="Дней" value={time.days} />
            <TimeUnit label="Часов" value={time.hours} />
            <TimeUnit label="Минут" value={time.minutes} />
            <TimeUnit label="Секунд" value={time.seconds} />
        </div>
    );
}

function TimeUnit({ label, value }: { label: string; value: number }) {
    return (
        <div className="countdown-unit">
            <div className="countdown-page-wrapper">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={value}
                        className="countdown-page"
                        initial={{ rotateX: 75, y: -140, opacity: 0 }}
                        animate={{ rotateX: 0, y: 0, opacity: 1 }}
                        exit={{
                            rotateX: -75,
                            y: 160,
                            opacity: 0,
                            transition: { duration: 0.55, ease: "easeInOut" },
                        }}
                        transition={{ duration: 0.55, ease: "easeInOut" }}
                    >
                        {value}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="countdown-label">{label}</div>
        </div>
    );
}

function getTimeLeft(target: Date) {
    const diff = target.getTime() - now();
    const total = Math.max(diff, 0);

    return {
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / (1000 * 60)) % 60),
        seconds: Math.floor((total / 1000) % 60),
    };
}
