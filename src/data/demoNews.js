// Demo articles shown when no API key is set or the API fails.
const rows = [
  ["general", "Kathmandu launches new plan to clean the Bagmati riverside", "City officials announced a phased cleanup of the Bagmati corridor, with new walking paths and waste collection points.", "Demo Desk", 1],
  ["general", "Nepal tourism arrivals rise as autumn trekking season begins", "Trekking agencies in Pokhara and Kathmandu report strong bookings for the Annapurna and Everest regions.", "Demo Desk", 2],
  ["general", "Monsoon recovery: roads reopen across several hill districts", "Road crews cleared landslides on key highways, restoring travel between the capital and western Nepal.", "Demo Desk", 3],
  ["general", "Nepal and neighbours discuss new cross-border trade routes", "Officials met in Kathmandu to discuss easier customs procedures for exporters and small traders.", "Demo Desk", 4],
  ["general", "Hydropower output climbs as new Nepal projects connect to the grid", "Engineers say several new plants will help Nepal export more electricity during the wet season.", "Demo Desk", 5],
  ["politics", "Parliament debates budget priorities for the coming year", "Lawmakers in Kathmandu argued over spending on infrastructure, health and education in a long session.", "Demo Politics", 6],
  ["politics", "Local governments in Nepal ask for a bigger share of national funds", "Mayors from several provinces called for clearer rules on how federal funds are shared.", "Demo Politics", 9],
  ["business", "Nepal stock market closes the week higher on banking gains", "The benchmark index rose as investors favoured commercial banks and hydropower companies.", "Demo Business", 3],
  ["business", "Small businesses in Kathmandu adopt QR payments at record pace", "Shops and street vendors say digital payments are growing faster than expected this year.", "Demo Business", 7],
  ["technology", "Nepali startups build AI tools for farmers and small shops", "A new group of developers in Lalitpur is turning local-language voice tools into simple mobile apps.", "Demo Tech", 4],
  ["technology", "Internet speeds improve across Nepal as fibre network expands", "Providers report more fibre connections in towns outside the Kathmandu Valley.", "Demo Tech", 8],
  ["sports", "Nepal cricket team wins thrilling home match in Kirtipur", "A last-over finish sent the crowd home happy after a tense chase in the series opener.", "Demo Sports", 2],
  ["sports", "Young Nepali sprinter sets a new national record", "The athlete lowered the national mark at a meet in Pokhara and eyes regional games next.", "Demo Sports", 10],
  ["entertainment", "Nepali film festival opens in Kathmandu with record submissions", "Filmmakers from across the country are screening short and feature films this week.", "Demo Culture", 5],
  ["entertainment", "Folk musicians bring traditional sounds to a new generation", "A touring group is mixing madal rhythms with modern production for city audiences.", "Demo Culture", 11],
  ["world", "Global leaders meet to discuss climate finance for mountain nations", "Delegates, including voices from Nepal, asked for faster funding to protect Himalayan communities.", "Demo World", 3],
  ["world", "Asian markets steady as central banks signal careful approach", "Investors across the region waited for new data on inflation and growth.", "Demo World", 6],
  ["health", "Hospitals in Nepal expand services to rural districts", "New health posts and mobile clinics aim to reduce long trips to reach basic care.", "Demo Health", 5],
  ["education", "Nepal schools introduce coding clubs in public classrooms", "Teachers say the clubs help students build confidence with computers and problem solving.", "Demo Education", 7],
  ["lifestyle", "Home cooks revive traditional Newari recipes in the city", "Food bloggers are sharing old family recipes and the stories behind each dish.", "Demo Lifestyle", 12],
];

export const demoNews = rows.map(([category, title, description, name, hours], i) => ({
  title,
  description,
  url: `https://example.com/demo-article-${i + 1}`,
  image: "/images/placeholder.svg",
  source: { name },
  publishedAt: new Date(Date.now() - hours * 3600 * 1000).toISOString(),
  category,
}));
