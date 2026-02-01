export async function getServerTime() {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC");
    const data = await res.json();
    return new Date(data.utc_datetime).getTime();
}
