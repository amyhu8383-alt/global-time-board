"use client";

import { useEffect, useMemo, useState } from "react";

type Region =
  | "China"
  | "Asia"
  | "Europe"
  | "Middle East"
  | "North America"
  | "Caribbean"
  | "Latin America"
  | "Southeast Asia"
  | "Africa"
  | "Oceania";

type WorkingStatus = "Best Time Now" | "Good Time" | "Lunch Time" | "After Hours" | "Weekend";

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
  { country: "Belgium", city: "Brussels", region: "Europe", timeZone: "Europe/Brussels" },
  { country: "Portugal", city: "Lisbon", region: "Europe", timeZone: "Europe/Lisbon" },
  { country: "Greece", city: "Athens", region: "Europe", timeZone: "Europe/Athens" },
  { country: "Romania", city: "Bucharest", region: "Europe", timeZone: "Europe/Bucharest" },
  { country: "Czech Republic", city: "Prague", region: "Europe", timeZone: "Europe/Prague" },
  { country: "Sweden", city: "Stockholm", region: "Europe", timeZone: "Europe/Stockholm" },
  { country: "Norway", city: "Oslo", region: "Europe", timeZone: "Europe/Oslo" },
  { country: "Denmark", city: "Copenhagen", region: "Europe", timeZone: "Europe/Copenhagen" },
  { country: "Finland", city: "Helsinki", region: "Europe", timeZone: "Europe/Helsinki" },
  { country: "Austria", city: "Vienna", region: "Europe", timeZone: "Europe/Vienna" },
  { country: "Switzerland", city: "Zurich", region: "Europe", timeZone: "Europe/Zurich" },
  { country: "Kuwait", city: "Kuwait City", region: "Middle East", timeZone: "Asia/Kuwait" },
  { country: "Saudi Arabia", city: "Riyadh", region: "Middle East", timeZone: "Asia/Riyadh" },
  { country: "United Arab Emirates", city: "Dubai", region: "Middle East", timeZone: "Asia/Dubai" },
  { country: "Qatar", city: "Doha", region: "Middle East", timeZone: "Asia/Qatar" },
  { country: "Oman", city: "Muscat", region: "Middle East", timeZone: "Asia/Muscat" },
  { country: "Bahrain", city: "Manama", region: "Middle East", timeZone: "Asia/Bahrain" },
  { country: "Iran", city: "Tehran", region: "Middle East", timeZone: "Asia/Tehran" },
  { country: "Israel", city: "Tel Aviv", region: "Middle East", timeZone: "Asia/Jerusalem" },
  { country: "Turkey", city: "Istanbul", region: "Middle East", timeZone: "Europe/Istanbul" },
  { country: "Jordan", city: "Amman", region: "Middle East", timeZone: "Asia/Amman" },
  { country: "Iraq", city: "Baghdad", region: "Middle East", timeZone: "Asia/Baghdad" },
  { country: "Lebanon", city: "Beirut", region: "Middle East", timeZone: "Asia/Beirut" },
  { country: "United States", city: "New York", region: "North America", timeZone: "America/New_York" },
  { country: "United States", city: "Los Angeles", region: "North America", timeZone: "America/Los_Angeles" },
  { country: "United States", city: "Chicago", region: "North America", timeZone: "America/Chicago" },
  { country: "United States", city: "Houston", region: "North America", timeZone: "America/Chicago" },
  { country: "Canada", city: "Toronto", region: "North America", timeZone: "America/Toronto" },
  { country: "Canada", city: "Vancouver", region: "North America", timeZone: "America/Vancouver" },
  { country: "Puerto Rico", city: "San Juan", region: "Caribbean", timeZone: "America/Puerto_Rico" },
  { country: "Jamaica", city: "Kingston", region: "Caribbean", timeZone: "America/Jamaica" },
  { country: "Bahamas", city: "Nassau", region: "Caribbean", timeZone: "America/Nassau" },
  { country: "Dominican Republic", city: "Santo Domingo", region: "Caribbean", timeZone: "America/Santo_Domingo" },
  { country: "Trinidad and Tobago", city: "Port of Spain", region: "Caribbean", timeZone: "America/Port_of_Spain" },
  { country: "Barbados", city: "Bridgetown", region: "Caribbean", timeZone: "America/Barbados" },
  { country: "Curacao", city: "Willemstad", region: "Caribbean", timeZone: "America/Curacao" },
  { country: "Colombia", city: "Bogota", region: "Latin America", timeZone: "America/Bogota" },
  { country: "Chile", city: "Santiago", region: "Latin America", timeZone: "America/Santiago" },
  { country: "Mexico", city: "Mexico City", region: "Latin America", timeZone: "America/Mexico_City" },
  { country: "Panama", city: "Panama City", region: "Latin America", timeZone: "America/Panama" },
  { country: "Brazil", city: "Sao Paulo", region: "Latin America", timeZone: "America/Sao_Paulo" },
  { country: "Argentina", city: "Buenos Aires", region: "Latin America", timeZone: "America/Argentina/Buenos_Aires" },
  { country: "Peru", city: "Lima", region: "Latin America", timeZone: "America/Lima" },
  { country: "Ecuador", city: "Quito", region: "Latin America", timeZone: "America/Guayaquil" },
  { country: "Costa Rica", city: "San Jose", region: "Latin America", timeZone: "America/Costa_Rica" },
  { country: "Guatemala", city: "Guatemala City", region: "Latin America", timeZone: "America/Guatemala" },
  { country: "El Salvador", city: "San Salvador", region: "Latin America", timeZone: "America/El_Salvador" },
  { country: "Honduras", city: "Tegucigalpa", region: "Latin America", timeZone: "America/Tegucigalpa" },
  { country: "India", city: "New Delhi", region: "Asia", timeZone: "Asia/Kolkata" },
  { country: "Pakistan", city: "Karachi", region: "Asia", timeZone: "Asia/Karachi" },
  { country: "Bangladesh", city: "Dhaka", region: "Asia", timeZone: "Asia/Dhaka" },
  { country: "Singapore", city: "Singapore", region: "Asia", timeZone: "Asia/Singapore" },
  { country: "Japan", city: "Tokyo", region: "Asia", timeZone: "Asia/Tokyo" },
  { country: "South Korea", city: "Seoul", region: "Asia", timeZone: "Asia/Seoul" },
  { country: "Taiwan", city: "Taipei", region: "Asia", timeZone: "Asia/Taipei" },
  { country: "Hong Kong", city: "Hong Kong", region: "Asia", timeZone: "Asia/Hong_Kong" },
  { country: "Philippines", city: "Manila", region: "Southeast Asia", timeZone: "Asia/Manila" },
  { country: "Indonesia", city: "Jakarta", region: "Southeast Asia", timeZone: "Asia/Jakarta" },
  { country: "Thailand", city: "Bangkok", region: "Southeast Asia", timeZone: "Asia/Bangkok" },
  { country: "Vietnam", city: "Ho Chi Minh City", region: "Southeast Asia", timeZone: "Asia/Ho_Chi_Minh" },
  { country: "Malaysia", city: "Kuala Lumpur", region: "Southeast Asia", timeZone: "Asia/Kuala_Lumpur" },
  { country: "South Africa", city: "Johannesburg", region: "Africa", timeZone: "Africa/Johannesburg" },
  { country: "Nigeria", city: "Lagos", region: "Africa", timeZone: "Africa/Lagos" },
  { country: "Kenya", city: "Nairobi", region: "Africa", timeZone: "Africa/Nairobi" },
  { country: "Egypt", city: "Cairo", region: "Africa", timeZone: "Africa/Cairo" },
  { country: "Morocco", city: "Casablanca", region: "Africa", timeZone: "Africa/Casablanca" },
  { country: "Algeria", city: "Algiers", region: "Africa", timeZone: "Africa/Algiers" },
  { country: "Tunisia", city: "Tunis", region: "Africa", timeZone: "Africa/Tunis" },
  { country: "Ghana", city: "Accra", region: "Africa", timeZone: "Africa/Accra" },
  { country: "Ethiopia", city: "Addis Ababa", region: "Africa", timeZone: "Africa/Addis_Ababa" },
  { country: "Tanzania", city: "Dar es Salaam", region: "Africa", timeZone: "Africa/Dar_es_Salaam" },
  { country: "Uganda", city: "Kampala", region: "Africa", timeZone: "Africa/Kampala" },
  { country: "Senegal", city: "Dakar", region: "Africa", timeZone: "Africa/Dakar" },
  { country: "Australia", city: "Sydney", region: "Oceania", timeZone: "Australia/Sydney" },
  { country: "New Zealand", city: "Auckland", region: "Oceania", timeZone: "Pacific/Auckland" },
];

const regionFilters: Array<Exclude<Region, "China"> | "All"> = [
  "All",
  "Europe",
  "Middle East",
  "North America",
  "Caribbean",
  "Latin America",
  "Southeast Asia",
  "Asia",
  "Africa",
  "Oceania",
];

const statusFilters: Array<WorkingStatus | "All"> = [
  "All",
  "Best Time Now",
  "Good Time",
  "Lunch Time",
  "After Hours",
  "Weekend",
];

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5v5l3.5 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.8 12h16.4M12 3.5c2.6 2.3 4 5.3 4 8.5s-1.4 6.2-4 8.5c-2.6-2.3-4-5.3-4-8.5s1.4-6.2 4-8.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s-5-4.9-5-9a5 5 0 1 1 10 0c0 4.1-5 9-5 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="1.7" fill="currentColor" />
    </svg>
  );
}

function localParts(timeZone: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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

function workingStatus(timeZone: string, now: Date): WorkingStatus {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(now);
  if (weekday === "Sat" || weekday === "Sun") return "Weekend";

  const { hour, minute } = localParts(timeZone, now);
  const totalMinutes = hour * 60 + minute;

  if (totalMinutes >= 9 * 60 && totalMinutes <= 11 * 60 + 30) return "Best Time Now";
  if (totalMinutes >= 12 * 60 && totalMinutes <= 13 * 60 + 30) return "Lunch Time";
  if (totalMinutes >= 14 * 60 && totalMinutes <= 17 * 60 + 30) return "Good Time";
  return "After Hours";
}

function contactAction(status: WorkingStatus) {
  if (status === "Best Time Now") return "Call now";
  if (status === "Good Time") return "Send message or call";
  if (status === "Lunch Time") return "Send email";
  if (status === "Weekend") return "Wait until next workday";
  return "Wait until local morning";
}

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<Exclude<Region, "China"> | "All">("All");
  const [statusFilter, setStatusFilter] = useState<WorkingStatus | "All">("All");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const shenzhen = useMemo(() => localParts("Asia/Shanghai", now), [now]);

  const cards = useMemo(() => {
    return markets.map((market) => {
      const parts = localParts(market.timeZone, now);
      const status = workingStatus(market.timeZone, now);

      return {
        ...market,
        ...parts,
        status,
        action: contactAction(status),
      };
    });
  }, [now]);

  const displayCards = useMemo(() => cards.filter((card) => card.timeZone !== "Asia/Shanghai"), [cards]);

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase();

    return displayCards.filter((card) => {
      const matchesRegion = regionFilter === "All" || card.region === regionFilter;
      const matchesStatus = statusFilter === "All" || card.status === statusFilter;
      const matchesSearch =
        !query ||
        [card.country, card.city, card.region, card.timeZone].some((value) =>
          value.toLowerCase().includes(query),
        );

      return matchesRegion && matchesStatus && matchesSearch;
    });
  }, [displayCards, regionFilter, search, statusFilter]);

  const groupedCards = useMemo(() => {
    const order: Array<Exclude<Region, "China">> = [
      "Europe",
      "Middle East",
      "North America",
      "Caribbean",
      "Latin America",
      "Southeast Asia",
      "Asia",
      "Africa",
      "Oceania",
    ];

    return order
      .map((region) => ({
        region,
        markets: filteredCards.filter((card) => card.region === region),
      }))
      .filter((group) => group.markets.length > 0);
  }, [filteredCards]);

  const summary = useMemo(() => {
    const counts = {
      "Best Time Now": displayCards.filter((card) => card.status === "Best Time Now").length,
      "Good Time": displayCards.filter((card) => card.status === "Good Time").length,
      "Lunch Time": displayCards.filter((card) => card.status === "Lunch Time").length,
      "After Hours": displayCards.filter((card) => card.status === "After Hours").length,
      Weekend: displayCards.filter((card) => card.status === "Weekend").length,
    };

    const contactable = displayCards
      .filter((card) => card.status === "Best Time Now" || card.status === "Good Time")
      .map((card) => `${card.city}, ${card.country}`);

    return { counts, contactable };
  }, [displayCards]);

  const weekendMajority = summary.counts.Weekend > cards.length / 2;

  return (
    <main className="page">
      <header className="hero">
        <section className="hero-copy">
          <h1>Global Time Board</h1>
          <p className="subtitle">Check local time across key global markets.</p>
        </section>

        <section className="base-time">
          <div className="base-time-top">
            <span className="base-badge">
              <ClockIcon />
              Shenzhen Time
            </span>
            <small>China base reference</small>
          </div>
          <strong>{shenzhen.time}</strong>
          <p>{shenzhen.date}</p>
          <b>Asia/Shanghai</b>
        </section>
      </header>

      <section className="summary">
        <div className="section-head">
          <div>
            <h2>Time Window Summary</h2>
            <p>Current local availability across key global markets.</p>
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
          <b>Currently reachable:</b>{" "}
          {summary.contactable.length
            ? summary.contactable.join(" | ")
            : "No markets are in a good working-time window right now."}
        </div>

        {weekendMajority ? (
          <div className="weekend-note">
            Most markets are currently in weekend mode. Weekday time windows will update
            automatically.
          </div>
        ) : null}
      </section>

      <section className="filters">
        <label className="search">
          <span>Search markets</span>
          <div className="search-shell">
            <GlobeIcon />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search country, city, region or timezone"
            />
          </div>
        </label>

        <div className="filter-group">
          <span>Region</span>
          <div className="chips">
            {regionFilters.map((region) => (
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
            {statusFilters.map((status) => (
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

      <section className="regions">
        {groupedCards.map((group) => (
          <section className="region-section" key={group.region}>
            <div className="section-head">
              <div>
                <h2>{group.region}</h2>
                <p>{group.markets.length} cities</p>
              </div>
            </div>

            <div className="cards">
              {group.markets.map((market) => (
                <article className="time-card" key={`${market.country}-${market.city}`}>
                  <div className="card-head">
                    <div>
                      <div className="place-line">
                        <PinIcon />
                        <strong>{market.city}</strong>
                      </div>
                      <p>{market.country}</p>
                    </div>
                    <span>{market.region}</span>
                  </div>

                  <div className="time-block">
                    <div className="time">{market.time}</div>
                    <div className="date">{market.date}</div>
                  </div>

                  <div className="meta">{market.timeZone}</div>

                  <div className="card-tags">
                    <div className={`badge ${market.status.toLowerCase().replaceAll(" ", "-")}`}>
                      {market.status}
                    </div>
                    <div className="action-pill">{market.action}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
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
