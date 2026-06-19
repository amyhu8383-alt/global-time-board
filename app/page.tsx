"use client";

import { useEffect, useMemo, useState } from "react";

type Region =
  | "China"
  | "Europe"
  | "Middle East"
  | "North America"
  | "Caribbean"
  | "Latin America"
  | "Southeast Asia"
  | "Africa"
  | "Oceania";

type Status = "Best Time Now" | "Good Time" | "Lunch Time" | "After Hours" | "Weekend";

type Market = {
  country: string;
  city: string;
  region: Region;
  timeZone: string;
};

const markets: Market[] = [
  { country: "China", city: "Shenzhen", region: "China", timeZone: "Asia/Shanghai" },
  { country: "Germany", city: "Berlin", region: "Europe", timeZone: "Europe/Berlin" },
  { country: "France", city: "Paris", region: "Europe", timeZone: "Europe/Paris" },
  { country: "Spain", city: "Madrid", region: "Europe", timeZone: "Europe/Madrid" },
  { country: "Poland", city: "Warsaw", region: "Europe", timeZone: "Europe/Warsaw" },
  { country: "Italy", city: "Rome", region: "Europe", timeZone: "Europe/Rome" },
  { country: "Ukraine", city: "Kyiv", region: "Europe", timeZone: "Europe/Kyiv" },
  { country: "United Kingdom", city: "London", region: "Europe", timeZone: "Europe/London" },
  { country: "Netherlands", city: "Amsterdam", region: "Europe", timeZone: "Europe/Amsterdam" },
  { country: "Kuwait", city: "Kuwait City", region: "Middle East", timeZone: "Asia/Kuwait" },
  { country: "Saudi Arabia", city: "Riyadh", region: "Middle East", timeZone: "Asia/Riyadh" },
  { country: "United Arab Emirates", city: "Dubai", region: "Middle East", timeZone: "Asia/Dubai" },
  { country: "Qatar", city: "Doha", region: "Middle East", timeZone: "Asia/Qatar" },
  { country: "Oman", city: "Muscat", region: "Middle East", timeZone: "Asia/Muscat" },
  { country: "Bahrain", city: "Manama", region: "Middle East", timeZone: "Asia/Bahrain" },
  { country: "United States", city: "New York", region: "North America", timeZone: "America/New_York" },
  { country: "United States", city: "Los Angeles", region: "North America", timeZone: "America/Los_Angeles" },
  { country: "United States", city: "Chicago", region: "North America", timeZone: "America/Chicago" },
  { country: "United States", city: "Houston", region: "North America", timeZone: "America/Chicago" },
  { country: "Puerto Rico", city: "San Juan", region: "Caribbean", timeZone: "America/Puerto_Rico" },
  { country: "Jamaica", city: "Kingston", region: "Caribbean", timeZone: "America/Jamaica" },
  { country: "Bahamas", city: "Nassau", region: "Caribbean", timeZone: "America/Nassau" },
  { country: "Dominican Republic", city: "Santo Domingo", region: "Caribbean", timeZone: "America/Santo_Domingo" },
  { country: "Trinidad and Tobago", city: "Port of Spain", region: "Caribbean", timeZone: "America/Port_of_Spain" },
  { country: "Colombia", city: "Bogota", region: "Latin America", timeZone: "America/Bogota" },
  { country: "Chile", city: "Santiago", region: "Latin America", timeZone: "America/Santiago" },
  { country: "Mexico", city: "Mexico City", region: "Latin America", timeZone: "America/Mexico_City" },
  { country: "Panama", city: "Panama City", region: "Latin America", timeZone: "America/Panama" },
  { country: "Brazil", city: "Sao Paulo", region: "Latin America", timeZone: "America/Sao_Paulo" },
  { country: "Philippines", city: "Manila", region: "Southeast Asia", timeZone: "Asia/Manila" },
  { country: "Indonesia", city: "Jakarta", region: "Southeast Asia", timeZone: "Asia/Jakarta" },
  { country: "Thailand", city: "Bangkok", region: "Southeast Asia", timeZone: "Asia/Bangkok" },
  { country: "Vietnam", city: "Ho Chi Minh City", region: "Southeast Asia", timeZone: "Asia/Ho_Chi_Minh" },
  { country: "Malaysia", city: "Kuala Lumpur", region: "Southeast Asia", timeZone: "Asia/Kuala_Lumpur" },
  { country: "South Africa", city: "Johannesburg", region: "Africa", timeZone: "Africa/Johannesburg" },
  { country: "Nigeria", city: "Lagos", region: "Africa", timeZone: "Africa/Lagos" },
  { country: "Kenya", city: "Nairobi", region: "Africa", timeZone: "Africa/Nairobi" },
  { country: "Egypt", city: "Cairo", region: "Africa", timeZone: "Africa/Cairo" },
  { country: "Australia", city: "Sydney", region: "Oceania", timeZone: "Australia/Sydney" },
  { country: "New Zealand", city: "Auckland", region: "Oceania", timeZone: "Pacific/Auckland" },
];

const regions: Array<Region | "All"> = ["All", "Europe", "Middle East", "North America", "Caribbean", "Latin America", "Southeast Asia", "Africa", "Oceania"];
const statuses: Array<Status | "All"> = ["All", "Best Time Now", "Good Time", "Lunch Time", "After Hours", "Weekend"];

function getTimeParts(timeZone: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour12: false,
  }).formatToParts(now);

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";

  return {
    hour,
    minute,
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    date: `${weekday}, ${month} ${day}`,
  };
}

function getStatus(hour: number, minute: number, timeZone: string, now: Date): Status {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(now);
  if (weekday === "Sat" || weekday === "Sun") return "Weekend";

  const minutes = hour * 60 + minute;
  if (minutes >= 9 * 60 && minutes <= 11 * 60 + 30) return "Best Time Now";
  if (minutes >= 12 * 60 && minutes <= 13 * 60 + 30) return "Lunch Time";
  if (minutes >= 14 * 60 && minutes <= 17 * 60 + 30) return "Good Time";
  return "After Hours";
}

function suggestedAction(status: Status) {
  if (status === "Best Time Now") return "Call now";
  if (status === "Good Time") return "Send message or call";
  if (status === "Lunch Time") return "Send email";
  if (status === "Weekend") return "Wait until next workday";
  return "Wait until local morning";
}

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [regionFilter, setRegionFilter] = useState<Region | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const shenzhen = useMemo(() => {
    const parts = getTimeParts("Asia/Shanghai", now);
    return { ...parts, timeZone: "Asia/Shanghai" };
  }, [now]);

  const marketCards = useMemo(() => {
    return markets.map((market) => {
      const parts = getTimeParts(market.timeZone, now);
      const status = getStatus(parts.hour, parts.minute, market.timeZone, now);
      return {
        ...market,
        ...parts,
        status,
        action: suggestedAction(status),
      };
    });
  }, [now]);

  const filteredMarkets = useMemo(() => {
    return marketCards.filter((market) => {
      const matchesRegion = regionFilter === "All" || market.region === regionFilter;
      const matchesStatus = statusFilter === "All" || market.status === statusFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        [market.country, market.city, market.region, market.timeZone].some((value) =>
          value.toLowerCase().includes(query),
        );
      return matchesRegion && matchesStatus && matchesSearch;
    });
  }, [marketCards, regionFilter, search, statusFilter]);

  const summary = useMemo(() => {
    const counts = {
      "Best Time Now": marketCards.filter((market) => market.status === "Best Time Now").length,
      "Good Time": marketCards.filter((market) => market.status === "Good Time").length,
      "Lunch Time": marketCards.filter((market) => market.status === "Lunch Time").length,
      "After Hours": marketCards.filter((market) => market.status === "After Hours").length,
      "Weekend": marketCards.filter((market) => market.status === "Weekend").length,
    };
    const contactable = marketCards
      .filter((market) => market.status === "Best Time Now" || market.status === "Good Time")
      .map((market) => `${market.city}, ${market.country}`);
    return { counts, contactable };
  }, [marketCards]);

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Global Time Board</p>
          <h1>Global Time Board</h1>
          <p className="subtitle">Check local time across key global markets.</p>
        </div>
        <section className="base-time">
          <span>Shenzhen Time</span>
          <small>China Base Time</small>
          <strong>{shenzhen.time}</strong>
          <p>{shenzhen.date}</p>
          <b>{shenzhen.timeZone}</b>
        </section>
      </header>

      <section className="summary">
        <div className="section-head">
          <div>
            <h2>Contact Window Summary</h2>
            <p>A quick view of current global contact windows.</p>
          </div>
        </div>
        <div className="summary-grid">
          {Object.entries(summary.counts).map(([label, value]) => (
            <article className="summary-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>markets</small>
            </article>
          ))}
        </div>
        <div className="contact-line">
          <b>Contactable now:</b>{" "}
          {summary.contactable.length ? summary.contactable.join(" | ") : "No markets are in a good contact window right now."}
        </div>
      </section>

      <section className="filters">
        <label className="search">
          <span>Search country or city</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search country, city, region or timezone"
          />
        </label>
        <div className="filter-group">
          <span>Region</span>
          <div className="chips">
            {regions.map((region) => (
              <button
                className={regionFilter === region ? "active" : ""}
                key={region}
                onClick={() => setRegionFilter(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span>Status</span>
          <div className="chips">
            {statuses.map((status) => (
              <button
                className={statusFilter === status ? "active" : ""}
                key={status}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="cards">
        {filteredMarkets.map((market) => (
          <article className="time-card" key={`${market.country}-${market.city}`}>
            <div className="card-head">
              <div>
                <strong>{market.country}</strong>
                <p>{market.city}</p>
              </div>
              <span>{market.region}</span>
            </div>
            <div className="time-block">
              <div className="time">{market.time}</div>
              <div className="date">{market.date}</div>
            </div>
            <div className="meta">{market.timeZone}</div>
            <div className={`badge ${market.status.toLowerCase().replaceAll(" ", "-")}`}>{market.status}</div>
            <div className="action">
              <span>Suggested Action</span>
              <b>{market.action}</b>
            </div>
          </article>
        ))}
      </section>

      <footer className="footer">
        <strong>Global Time Board</strong>
        <p>Built for international communication and meeting planning.</p>
        <small>No private data is stored.</small>
      </footer>
    </main>
  );
}
