import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedCountdown({ target }: { target: Date }) {
    const [time, setTime] = useState(getTimeLeft(target));

    useEffect(() => {
        const id = setInterval(() => {
            setTime(getTimeLeft(target));
        }, 1000);
        return () => clearInterval(id);
    }, [target]);

    return (
        <div style={styles.container}>
            <TimeUnit label="Дней" value={time.days} />
            <TimeUnit label="Часов" value={time.hours} />
            <TimeUnit label="Минут" value={time.minutes} />
            <TimeUnit label="Секунд" value={time.seconds} />
        </div>
    );
}

function TimeUnit({ label, value }: { label: string; value: number }) {
    return (
        <div style={styles.unit}>
            <div style={styles.numberWrapper}>
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={value}
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -90, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        style={styles.number}
                    >
                        {value}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div style={styles.label}>{label}</div>
        </div>
    );
}

function getTimeLeft(target: Date) {
    const diff = target.getTime() - Date.now();
    const total = Math.max(diff, 0);

    return {
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / (1000 * 60)) % 60),
        seconds: Math.floor((total / 1000) % 60),
    };
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
    },
    unit: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif",
    },
    numberWrapper: {
        width: "70px",
        height: "70px",
        perspective: "400px",
        overflow: "hidden",
        borderRadius: "12px",
        background: "#1a1a1a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    number: {
        fontSize: "32px",
        fontWeight: 600,
        color: "white",
    },
    label: {
        marginTop: "8px",
        fontSize: "14px",
        color: "#666",
    },
};
