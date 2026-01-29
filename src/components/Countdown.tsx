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
            <div style={styles.pageWrapper}>
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={value}
                        style={styles.page}
                        initial={{ rotateX: 75, y: -140, opacity: 0 }}
                        animate={{ rotateX: 0, y: 0, opacity: 1 }}
                        exit={{
                            rotateX: -75,
                            y: 160,
                            opacity: 0,
                            transition: { duration: 0.55, ease: "easeInOut" }
                        }}
                        transition={{ duration: 0.55, ease: "easeInOut" }}
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
        gap: "28px",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    unit: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif",
        perspective: "1000px",
    },
    pageWrapper: {
        width: "100px",
        height: "120px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
        overflow: "hidden",
        position: "relative",
    },
    page: {
        position: "absolute",
        width: "100%",
        height: "100%",
        fontSize: "52px",
        fontWeight: 700,
        color: "#222",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        transformOrigin: "top center",
    },
    label: {
        marginTop: "10px",
        fontSize: "15px",
        color: "#666",
    },
};
