import { useState } from "react";

const COLORS = {
  green: "#4CAF50",
  greenDark: "#388E3C",
  cream: "#FDF8F0",
  softBlack: "#2D2D2D",
  pink: "#E88B8B",
  purple: "#8B6BAE",
  gold: "#F5C85C",
  warmGray: "#B8B0A8",
  white: "#FFFFFF",
};

const TABS = [
  { id: "overview", label: "Campaign Overview" },
  { id: "lifeforces", label: "Life Forces" },
  { id: "headlines", label: "Headlines & Hooks" },
  { id: "calendar", label: "Campaign Calendar" },
  { id: "visual", label: "Visual Direction" },
  { id: "influencer", label: "Influencer Briefs" },
  { id: "emails", label: "Email Flows" },
  { id: "ads", label: "Paid Social" },
];

const LF_DATA = [
  {
    id: "LF7",
    name: "Care & Protection",
    tag: "PRIMARY DRIVER",
    color: COLORS.green,
    tension: "Am I giving them enough?",
    relief: "One pack. 60 ingredients. 21 vitamins. They think it's candy.",
    hook: "You fought her on broccoli for nine years. She never saw you fight for yourself.",
    headlines: [
      "She thinks it's a gummy bear. You know it's 60 ingredients.",
      "The smallest thing you do together might be the biggest thing they remember.",
      "You can't make them eat their vegetables. But you can make vegetables taste like candy.",
      "What if the healthiest habit your kid ever builds... they learned by watching you?",
    ],
  },
  {
    id: "LF1",
    name: "Survival / Life Extension",
    tag: "THE LONG GAME",
    color: COLORS.gold,
    tension: "I wish someone had taught me this earlier.",
    relief: "Break the cycle. Make it normal. Start now.",
    hook: "Nobody taught you. So you taught yourself at 35, the hard way, after something broke. Teach them now. Before something has to.",
    headlines: [
      "You're not just feeding them. You're programming them.",
      "The adults who feel great at 40 had parents who made it look easy.",
      "You can't give them your health. But you can give them the habit.",
      "Healthy at 50 starts at 5.",
    ],
  },
  {
    id: "LF3",
    name: "Freedom From Fear",
    tag: "THE QUIET WORRY",
    color: COLORS.purple,
    tension: "Am I doing enough? Are they getting what they need?",
    relief: "60 ingredients. Third-party tested. Pharmacist approved. One decision, done.",
    hook: "You can't protect them from everything. But you can stop wondering if they're getting enough.",
    headlines: [
      "You can't be with them every second. But 60 ingredients can.",
      "The worry never stops. But it can get quieter.",
      "You Googled 'kids vitamins' at midnight. We built the answer.",
      "One less thing to wonder about. One more thing handled.",
    ],
  },
  {
    id: "LF2",
    name: "Enjoyment of Food",
    tag: "THE TROJAN HORSE",
    color: COLORS.pink,
    tension: "They won't eat anything healthy.",
    relief: "They don't have to know it's healthy. It tastes like fruit snacks.",
    hook: "She won't touch spinach. She won't look at kale. She asks for Grüns by name every morning. You didn't win the war. You just changed the battlefield.",
    headlines: [
      "They think it's candy. You know it's 60 ingredients. Let them think they're winning.",
      "The only vegetable your teenager will voluntarily eat... is shaped like a bear.",
      "What if the healthiest thing in their lunchbox was also their favorite?",
      "You stopped fighting the vegetable war. You just changed the weapon.",
    ],
  },
  {
    id: "LF5",
    name: "Simplicity",
    tag: "DECISION FATIGUE",
    color: COLORS.warmGray,
    tension: "I can't add one more thing to my morning.",
    relief: "It replaces five things. One pack. No blender. No cleanup. No argument.",
    hook: "You have 47 tabs open in your brain. Close one.",
    headlines: [
      "One pack. The whole family. Done before the school bus.",
      "You used to buy 5 supplements. Now you buy one subscription.",
      "Mornings are hard enough. This is the easy part.",
      "No blender. No powder. No cleanup. No argument.",
    ],
  },
  {
    id: "LF6",
    name: "Social Identity",
    tag: "COOL PARENT",
    color: COLORS.gold,
    tension: "I want to be the parent who has it figured out.",
    relief: "Matching packs. Parent + kid. The group chat will ask.",
    hook: "She brought Grüns to the playdate. Three moms texted her by dinner.",
    headlines: [
      "The group chat is about to ask you what those gummy bears are.",
      "Your kid's lunchbox just became the most interesting thing at the table.",
      "You're the parent who found it first. Own that.",
    ],
  },
  {
    id: "LF8",
    name: "Social Approval",
    tag: "ANTI-LECTURE",
    color: COLORS.green,
    tension: "I don't want to be the preachy health parent.",
    relief: "It looks like a snack. No explanation needed.",
    hook: "You don't have to be the health parent. You just have to be the parent who made it easy.",
    headlines: [
      "Health without the lecture. For you and them.",
      "No blender on the counter. No green mustache. Just gummy bears.",
      "The wellness brand that doesn't make you explain yourself.",
    ],
  },
];

const CALENDAR = [
  {
    phase: "PHASE 1: THE SETUP",
    dates: "April 1–14",
    goal: "Introduce the parent angle. Plant the seed. No hard sell.",
    items: [
      { date: "Apr 1", channel: "Email", content: "Soft intro — story-driven", lf: "LF7", headline: "She thinks it's a gummy bear." },
      { date: "Apr 3", channel: "IG/TikTok", content: "UGC reel: parent + kid morning routine", lf: "LF2, LF7", headline: "The only vitamin she asks for by name." },
      { date: "Apr 5", channel: "Email", content: "The Spiral Effect — long-form story", lf: "LF1", headline: "Nobody taught you." },
      { date: "Apr 7", channel: "Paid Social", content: "Carousel: 5 supplements → 1 pack", lf: "LF5", headline: "One pack. Done before the school bus." },
      { date: "Apr 9", channel: "Blog/SEO", content: "Why the Healthiest Adults Were Taught Young", lf: "LF1, LF7", headline: "Educational content" },
      { date: "Apr 12", channel: "Email", content: "Parent testimonials", lf: "LF3, LF8", headline: "You Googled 'kids vitamins' at midnight." },
      { date: "Apr 14", channel: "IG Story", content: "Poll: veggies vs vitamins?", lf: "LF2", headline: "Engagement driver" },
    ],
  },
  {
    phase: "PHASE 2: THE BUILD",
    dates: "April 15–30",
    goal: "Deepen emotional connection. Product specifics. Drive trial.",
    items: [
      { date: "Apr 15", channel: "Email", content: "Ingredient spotlight: D3, B12, Zinc, Fiber", lf: "LF3", headline: "The 5 that matter most for your kid." },
      { date: "Apr 18", channel: "Paid Social", content: "Before/after: cabinet → one subscription", lf: "LF5", headline: "You used to buy 5. Now you buy 1." },
      { date: "Apr 20", channel: "Influencer", content: "Mom creator: 'Our new morning ritual'", lf: "LF7, LF6", headline: "Drop 1" },
      { date: "Apr 22", channel: "Email", content: "The Trojan Horse angle", lf: "LF2", headline: "She asks for Grüns by name." },
      { date: "Apr 25", channel: "TikTok", content: "Kid taste test compilation", lf: "LF2", headline: "We let the kids decide." },
      { date: "Apr 27", channel: "Email", content: "Founder story: Chad + Axel", lf: "LF7, LF1", headline: "I built this for my kid." },
      { date: "Apr 30", channel: "Paid Social", content: "Retargeting with parent testimonials", lf: "LF3, LF8", headline: "Still thinking about it?" },
    ],
  },
  {
    phase: "PHASE 3: THE PUSH",
    dates: "May 1–21",
    goal: "Convert. Mother's Day (May 11). Bundle push.",
    items: [
      { date: "May 1", channel: "Email", content: "Campaign manifesto: Start With You", lf: "ALL", headline: "They're watching." },
      { date: "May 3", channel: "Paid Social", content: "Mother's Day pre-roll", lf: "LF7, LF6", headline: "The gift that actually lasts." },
      { date: "May 5", channel: "Email", content: "Mother's Day Gift Guide", lf: "LF7, LF5", headline: "For the mom who does everything." },
      { date: "May 8", channel: "Influencer", content: "Dad creator: 'My parents didn't teach me this'", lf: "LF1, LF7", headline: "Drop 2" },
      { date: "May 11", channel: "Email + Social", content: "Mother's Day send (8am)", lf: "LF7", headline: "She made it look easy." },
      { date: "May 14", channel: "Email", content: "Post-Mother's Day self-purchase", lf: "LF5, LF8", headline: "Treat yourself." },
      { date: "May 18", channel: "Paid Social", content: "Summer preview: camp-proof nutrition", lf: "LF3, LF5", headline: "Camp-proof nutrition." },
      { date: "May 21", channel: "Email", content: "The Summer Switch", lf: "LF5, LF7", headline: "Routines change. This one doesn't." },
    ],
  },
  {
    phase: "PHASE 4: SUMMER BRIDGE",
    dates: "May 22 – June 30",
    goal: "Extend into summer. Camp, travel, activity season.",
    items: [
      { date: "May 25", channel: "Email", content: "Pack Light, Pack Right", lf: "LF5", headline: "Fits in a carry-on." },
      { date: "Jun 1", channel: "Paid Social", content: "Summer camp creative", lf: "LF7, LF3", headline: "You can't go with them. But this can." },
      { date: "Jun 5", channel: "Email", content: "Father's Day preview", lf: "LF1, LF7", headline: "For the dad who learned the hard way." },
      { date: "Jun 10", channel: "Influencer", content: "Family vacation content", lf: "LF5, LF8", headline: "Drop 3" },
      { date: "Jun 15", channel: "Email + Social", content: "Father's Day", lf: "LF1, LF7", headline: "The habit he'll hand down." },
      { date: "Jun 22", channel: "Email", content: "Mid-summer retention check-in", lf: "LF1", headline: "30 days in. Here's what changed." },
      { date: "Jun 30", channel: "Email", content: "Phase 1 wrap", lf: "ALL", headline: "The smallest ritual. The biggest lesson." },
    ],
  },
];

const SHOT_LIST = [
  { id: "HERO-01", desc: "Parent + kid at kitchen counter, both ripping open Grüns packs. Morning light. Kid in pajamas.", lf: "LF7, LF1", use: "Email hero, landing page, paid social" },
  { id: "HERO-02", desc: "Kid's hand reaching into Grüns pack on car dashboard. Backpack in backseat. Motion blur windshield.", lf: "LF5, LF2", use: "Email hero, IG story" },
  { id: "HERO-03", desc: "Two packs side by side on counter — adult + kids. Coffee mug nearby. Real kitchen.", lf: "LF7, LF5", use: "Product feature, landing page" },
  { id: "DET-01", desc: "Gummies spilled on wooden cutting board. Single gummy held between kid's fingers.", lf: "LF2", use: "Product detail, social" },
  { id: "DET-02", desc: "Inside open lunchbox: sandwich, apple, Grüns pack tucked in side.", lf: "LF5, LF7", use: "Social, email" },
  { id: "DET-03", desc: "Grüns pack in mom's tote / dad's gym bag with keys, phone, sunglasses.", lf: "LF5", use: "Social, retargeting" },
  { id: "LIFE-01", desc: "Family at park. Kid running. Parent sitting with open Grüns pack. Not posed.", lf: "LF1, LF8", use: "Brand awareness, YouTube" },
  { id: "LIFE-02", desc: "Teenager doing homework, Grüns open next to laptop. Parent cooking in bg.", lf: "LF1, LF6", use: "Email, blog, retargeting" },
  { id: "LIFE-03", desc: "Parent packing backpack. Grüns pack going in alongside water bottle.", lf: "LF7, LF5", use: "Social, email" },
];

const INFLUENCER_PILLARS = [
  { name: "The Morning Ritual", key: "This is the one thing we never skip.", desc: "Parent + kid grab Grüns packs at the same time. Before the chaos starts." },
  { name: "The Trojan Horse", key: "She asked me if she could have MORE vitamins.", desc: "Kid thinks it's a snack. Show the taste reaction. That's the whole point." },
  { name: "The Simplifier", key: "I used to buy 5 things. Now I buy this.", desc: "Before: counter full of bottles. After: one pack each, done." },
  { name: "The Long Game", key: "My parents didn't teach me this. I'm teaching mine.", desc: "Talk about what you wish you'd learned. Emotional. Honest." },
  { name: "The Summer Prep", key: "Routines change. This one doesn't.", desc: "Packing for camp, vacation, sports. Grüns goes in the bag. Handled." },
];

const TAGLINES = [
  "Start with you. They're watching.",
  "The habit that fits in a lunchbox.",
  "60 ingredients. Zero arguments.",
  "Teach them easy.",
  "Good habits grow. Start small.",
  "Health they'll keep. From a parent they believe.",
  "You lead. They follow. It tastes like candy.",
  "The smallest ritual. The biggest lesson.",
];

function Badge({ children, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: color || COLORS.green,
        color: "#fff",
      }}
    >
      {children}
    </span>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.white,
        borderRadius: "14px",
        padding: "24px",
        border: "1px solid #E8E4DF",
        transition: "box-shadow 0.2s, transform 0.15s",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)";
        if (onClick) e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "26px",
          fontWeight: 800,
          color: COLORS.softBlack,
          margin: 0,
        }}
      >
        {children}
      </h2>
      {sub && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.warmGray, fontSize: "14px", marginTop: "6px" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function OverviewTab() {
  return (
    <div>
      <SectionTitle sub="Grüns × Parent Angle × Spring 2026">Campaign: "Start With You"</SectionTitle>

      <Card style={{ marginBottom: "20px", background: `linear-gradient(135deg, ${COLORS.green}15, ${COLORS.gold}15)` }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", fontWeight: 700, color: COLORS.softBlack, margin: 0, lineHeight: 1.4 }}>
          "The healthiest adults weren't born that way. Someone made it look easy. Be that someone."
        </p>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Target", value: "Parents 35-45", icon: "👨‍👩‍👧‍👦" },
          { label: "Duration", value: "Apr – Jun 2026", icon: "📅" },
          { label: "Products", value: "Adults + Kids", icon: "🐻" },
          { label: "Channels", value: "Email, Paid, UGC, Influencer", icon: "📡" },
        ].map((s) => (
          <Card key={s.label}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.warmGray, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "16px", fontWeight: 700, color: COLORS.softBlack, marginTop: "4px" }}>{s.value}</div>
          </Card>
        ))}
      </div>

      <SectionTitle sub="Rotating across all channels">Campaign Taglines</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
        {TAGLINES.map((t, i) => (
          <Card key={i} style={{ padding: "16px 20px" }}>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "15px", color: COLORS.softBlack }}>"{t}"</span>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: "32px" }}>
        <SectionTitle sub="The emotional thesis">The Spiral Effect</SectionTitle>
        <Card style={{ background: COLORS.cream }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.7, color: COLORS.softBlack, margin: 0 }}>
            Spring is when parenting pressure spikes. Under-HS kids: playdates, independence battles, sports. High schoolers: nuclear "I want freedom" energy. In both cases, fewer touchpoints.
            <br /><br />
            But kids are always watching. Even when they're not listening. The kid who never learned healthy habits becomes the 30-year-old with kidney issues, the crashed energy, the broken back. The kid who watched their parent make health look effortless? They grow up with a subconscious that says: taking care of myself is normal, easy, and it doesn't suck.
            <br /><br />
            <strong>The guilty pleasure reframe:</strong> The thing that looks like a treat IS the nutrition. The tension between "guilty pleasure" and "good for you" dissolves. That's the campaign's magic trick.
          </p>
        </Card>
      </div>
    </div>
  );
}

function LifeForcesTab() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div>
      <SectionTitle sub="Cashvertising LF8 mapped to the parent angle">Life Force Breakdown</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {LF_DATA.map((lf) => (
          <Card key={lf.id} onClick={() => setExpanded(expanded === lf.id ? null : lf.id)} style={{ borderLeft: `4px solid ${lf.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Badge color={lf.color}>{lf.tag}</Badge>
                <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, margin: "8px 0 4px", color: COLORS.softBlack }}>{lf.id} — {lf.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.warmGray, margin: 0 }}>Tension: "{lf.tension}"</p>
              </div>
              <span style={{ fontSize: "20px", color: COLORS.warmGray, transition: "transform 0.2s", transform: expanded === lf.id ? "rotate(180deg)" : "none" }}>▾</span>
            </div>

            {expanded === lf.id && (
              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #E8E4DF" }}>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.warmGray, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "6px" }}>Relief</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.softBlack, margin: 0 }}>{lf.relief}</p>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.warmGray, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "6px" }}>Burning Soul Hook</div>
                  <div style={{ background: COLORS.cream, borderRadius: "10px", padding: "14px 18px", fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 600, fontStyle: "italic", color: COLORS.softBlack, lineHeight: 1.5 }}>
                    "{lf.hook}"
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.warmGray, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "10px" }}>Headlines</div>
                  {lf.headlines.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                      <span style={{ color: lf.color, fontWeight: 700, fontSize: "14px", marginTop: "1px" }}>→</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.softBlack }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function HeadlinesTab() {
  const allHeadlines = LF_DATA.flatMap((lf) => lf.headlines.map((h) => ({ text: h, lf: lf.id, color: lf.color, name: lf.name })));
  const allHooks = LF_DATA.map((lf) => ({ text: lf.hook, lf: lf.id, color: lf.color, name: lf.name, tag: lf.tag }));

  return (
    <div>
      <SectionTitle sub="Every headline and Burning Soul hook in one place">Headlines & Hooks Bank</SectionTitle>

      <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>Burning Soul Hooks</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
        {allHooks.map((h, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${h.color}`, background: COLORS.cream }}>
            <Badge color={h.color}>{h.tag}</Badge>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "16px", fontWeight: 600, fontStyle: "italic", color: COLORS.softBlack, margin: "10px 0 0", lineHeight: 1.5 }}>
              "{h.text}"
            </p>
          </Card>
        ))}
      </div>

      <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>All Headlines</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "10px" }}>
        {allHeadlines.map((h, i) => (
          <Card key={i} style={{ padding: "14px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.softBlack, lineHeight: 1.5 }}>{h.text}</span>
              <Badge color={h.color}>{h.lf}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: "36px" }}>
        <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>Video Ad Hook Bank (First 3 Seconds)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
          {[
            "My kid thinks this is candy.",
            "I replaced our entire supplement shelf with this.",
            "The one thing we never skip.",
            "Nobody taught me healthy habits as a kid.",
            "My teenager willingly takes her vitamins now.",
            "Three moms asked me about these at pickup.",
            "I stopped worrying about their nutrition.",
            "60 ingredients. Tastes like fruit snacks.",
            "We pack two things: water and Grüns.",
            "This is the habit I want them to keep forever.",
          ].map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", background: i % 2 === 0 ? COLORS.cream : COLORS.white, borderRadius: "8px" }}>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: COLORS.green, fontSize: "14px", minWidth: "24px" }}>#{i + 1}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.softBlack }}>"{h}"</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalendarTab() {
  const [activePhase, setActivePhase] = useState(0);
  const channelColors = { Email: COLORS.green, "Paid Social": COLORS.purple, "IG/TikTok": COLORS.pink, "IG Story": COLORS.pink, TikTok: COLORS.pink, Influencer: COLORS.gold, "Blog/SEO": COLORS.warmGray, "Email + Social": COLORS.greenDark };

  return (
    <div>
      <SectionTitle sub="April through June 2026">Campaign Calendar</SectionTitle>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {CALENDAR.map((phase, i) => (
          <button
            key={i}
            onClick={() => setActivePhase(i)}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "13px",
              fontWeight: activePhase === i ? 800 : 600,
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: activePhase === i ? COLORS.green : "#E8E4DF",
              color: activePhase === i ? "#fff" : COLORS.softBlack,
              transition: "all 0.2s",
            }}
          >
            {phase.phase}
          </button>
        ))}
      </div>

      <Card style={{ marginBottom: "20px", background: COLORS.cream }}>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, color: COLORS.green }}>{CALENDAR[activePhase].dates}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.softBlack, marginTop: "4px" }}>{CALENDAR[activePhase].goal}</div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {CALENDAR[activePhase].items.map((item, i) => (
          <Card key={i} style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", fontWeight: 800, color: COLORS.softBlack }}>{item.date}</span>
                  <Badge color={channelColors[item.channel] || COLORS.warmGray}>{item.channel}</Badge>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.warmGray }}>{item.lf}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.softBlack, margin: 0 }}>{item.content}</p>
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", fontWeight: 600, fontStyle: "italic", color: COLORS.green, maxWidth: "260px", textAlign: "right" }}>
                "{item.headline}"
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function VisualTab() {
  return (
    <div>
      <SectionTitle sub="Nano Banana specs, shot list, color, typography">Visual & Aesthetic Direction</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <Card>
          <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 12px" }}>Camera</h4>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, lineHeight: 1.6, margin: 0 }}>
            Film-simulated digital. Fujifilm X-T5 with Classic Neg or Pro Neg Hi. Slightly desaturated. Warm undertone. Never clinical. Never stock.
          </p>
        </Card>
        <Card>
          <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 12px" }}>Lighting</h4>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, lineHeight: 1.6, margin: 0 }}>
            <strong>Hero:</strong> Natural morning light. Golden hour through windows. Soft shadows.<br />
            <strong>Detail:</strong> Overhead soft, slightly diffused. Food photography style.<br />
            <strong>Lifestyle:</strong> Backlit. Rim light. Slightly blown-out backgrounds.
          </p>
        </Card>
        <Card>
          <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 12px" }}>Color Grading</h4>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, lineHeight: 1.6, margin: 0 }}>
            Warm highlights (golden, never orange). Lifted shadows (never crushed). Grüns green as accent. Cream backgrounds. Pops of strawberry pink + grape purple.
          </p>
        </Card>
        <Card>
          <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 12px" }}>Styling</h4>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, lineHeight: 1.6, margin: 0 }}>
            Casual clothing. Loungewear. Real kitchens. Real mess. Coffee stains allowed. Kids ages 5-14. No one looks at camera. Everyone mid-moment.
          </p>
        </Card>
      </div>

      <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>Color Palette</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
        {[
          { name: "Grüns Green", hex: "#4CAF50" },
          { name: "Warm Cream", hex: "#FDF8F0" },
          { name: "Soft Black", hex: "#2D2D2D" },
          { name: "Strawberry", hex: "#E88B8B" },
          { name: "Grape", hex: "#8B6BAE" },
          { name: "Morning Gold", hex: "#F5C85C" },
          { name: "Warm Gray", hex: "#B8B0A8" },
        ].map((c) => (
          <div key={c.name} style={{ textAlign: "center" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "12px", background: c.hex, border: c.hex === "#FDF8F0" ? "1px solid #E8E4DF" : "none" }} />
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: COLORS.warmGray, marginTop: "6px" }}>{c.name}</div>
            <div style={{ fontFamily: "monospace", fontSize: "10px", color: COLORS.softBlack }}>{c.hex}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>Shot List</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {SHOT_LIST.map((shot) => (
          <Card key={shot.id} style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", fontWeight: 800, color: COLORS.green }}>{shot.id}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.warmGray }}>{shot.lf}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, margin: 0, lineHeight: 1.5 }}>{shot.desc}</p>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.purple, maxWidth: "180px", textAlign: "right" }}>{shot.use}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InfluencerTab() {
  return (
    <div>
      <SectionTitle sub="Messaging pillars and creative direction for creators">Influencer Briefs</SectionTitle>

      <Card style={{ marginBottom: "24px", background: COLORS.cream }}>
        <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 8px" }}>Creator Profile</h4>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, lineHeight: 1.6, margin: 0 }}>
          Mom and dad creators, 30-45. Followers: 10K-500K (micro to mid-tier). Aesthetic: real homes, real life, not aspirational-wealthy. Platforms: TikTok, Instagram Reels, YouTube Shorts.
        </p>
      </Card>

      <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>Messaging Pillars</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
        {INFLUENCER_PILLARS.map((p, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${[COLORS.green, COLORS.pink, COLORS.purple, COLORS.gold, COLORS.warmGray][i]}` }}>
            <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "16px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 6px" }}>{p.name}</h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, margin: "0 0 10px", lineHeight: 1.5 }}>{p.desc}</p>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 600, fontStyle: "italic", color: COLORS.green }}>Key phrase: "{p.key}"</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card style={{ background: "#FFF5F5" }}>
          <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: "#C0392B", margin: "0 0 12px" }}>Do NOT Say</h4>
          {["\"Use code [X]\" at the start", "\"This changed my life\"", "\"Link in bio\" more than once", "Anything about weight loss", "Compare to AG1 by name"].map((d, i) => (
            <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, marginBottom: "6px" }}>✕ {d}</div>
          ))}
        </Card>
        <Card style={{ background: "#F0FFF0" }}>
          <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.green, margin: "0 0 12px" }}>Creative Direction</h4>
          {["NO ring light — natural only", "NO studio — real kitchen, car, backyard", "Handheld camera, slightly imperfect", "Kids doing kid things, not performing", "Talk to camera like a friend"].map((d, i) => (
            <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, marginBottom: "6px" }}>✓ {d}</div>
          ))}
        </Card>
      </div>

      <Card style={{ marginTop: "24px" }}>
        <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 12px" }}>Mandatory Mentions</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["60+ whole-food ingredients", "21 vitamins & minerals", "Adults AND Kids versions", "Subscription = savings + never run out", "\"The first supplement you actually want to take\""].map((m, i) => (
            <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", padding: "6px 12px", background: COLORS.cream, borderRadius: "6px", color: COLORS.softBlack }}>{m}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}

function EmailsTab() {
  const welcomeFlow = [
    { day: "Day 0", subject: "Welcome to the easiest part of your day.", shot: "HERO-03", desc: "What Grüns is. Why it works for the whole family. What to expect.", cta: "Here's how to make it a ritual." },
    { day: "Day 2", subject: "What's actually inside.", shot: "DET-01", desc: "Spotlight: Vitamin D3 (bones + immunity), B12 (energy + brain), Zinc (immune), Prebiotic Fiber (gut), Vitamin A (eyes + growth).", cta: "See the full ingredient list." },
    { day: "Day 5", subject: "The Spiral Effect.", shot: "LIFE-02", desc: "Story about habits compounding. Kid who learned health was easy vs. the kid who didn't.", cta: "Start the spiral in the right direction." },
    { day: "Day 8", subject: "Parent testimonials.", shot: "UGC collage", desc: "3-4 testimonials from parents. Focus on: 'my kids ask for them,' 'replaced 5 bottles,' 'ritual we actually keep.'", cta: "Join 80,000+ families." },
    { day: "Day 12", subject: "You lead. They follow.", shot: "HERO-01", desc: "The manifesto. Short. Burning Soul energy. Ends with campaign tagline.", cta: "Start with you." },
  ];

  const winback = [
    { subject: "We noticed something.", desc: "You stopped. That's okay. But here's the thing — they notice too. Soft, not guilt-trippy." },
    { subject: "One less thing.", desc: "Remind them of simplicity. 'Remember when you didn't have to think about this?' Offer: 15% off family bundle." },
    { subject: "They're still growing.", desc: "Final push. LF7 heavy. 'Every day they're building the body and brain they'll live in for the rest of their life.'" },
  ];

  return (
    <div>
      <SectionTitle sub="Welcome flow + winback sequence for parent segment">Email Flows</SectionTitle>

      <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>Welcome Flow (Parent Segment)</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.warmGray, marginBottom: "16px" }}>Trigger: New subscriber tagged "parent" or purchased Kids + Adult</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
        {welcomeFlow.map((e, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${COLORS.green}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Badge color={COLORS.green}>{e.day}</Badge>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.warmGray }}>Hero: {e.shot}</span>
                </div>
                <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 6px" }}>"{e.subject}"</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, margin: "0 0 8px", lineHeight: 1.5 }}>{e.desc}</p>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", fontWeight: 600, color: COLORS.green }}>CTA: {e.cta}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>Winback Flow (Churned Parents)</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {winback.map((e, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${COLORS.pink}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <Badge color={COLORS.pink}>Email {i + 1}</Badge>
            </div>
            <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 6px" }}>"{e.subject}"</h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, margin: 0, lineHeight: 1.5 }}>{e.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdsTab() {
  const formats = [
    { format: "Static carousel (5 slides)", platform: "Meta, Pinterest", content: "5 supplements → 1 Grüns pack story", lf: "LF5" },
    { format: "UGC-style video (15-30s)", platform: "TikTok, Meta", content: "Parent + kid morning routine", lf: "LF7, LF2" },
    { format: "Before/after static", platform: "Meta, Pinterest", content: "Medicine cabinet → Grüns pack", lf: "LF5" },
    { format: "Testimonial compilation (30-60s)", platform: "YouTube, Meta", content: "3-4 parent clips, quick cuts", lf: "LF3, LF8" },
    { format: "Kid taste test (15s)", platform: "TikTok", content: "Real reactions, no script", lf: "LF2" },
    { format: "Story ad (single image)", platform: "Instagram", content: "Lunchbox shot with Grüns pack", lf: "LF7" },
    { format: "Manifesto video (60s)", platform: "YouTube pre-roll", content: "'Start With You' campaign film", lf: "ALL" },
  ];

  return (
    <div>
      <SectionTitle sub="Format matrix, hook bank, and platform strategy">Paid Social Creative</SectionTitle>

      <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700, color: COLORS.softBlack, marginBottom: "14px" }}>Ad Format Matrix</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
        {formats.map((f, i) => (
          <Card key={i} style={{ padding: "14px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 4px" }}>{f.format}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: COLORS.warmGray, margin: 0 }}>{f.content}</p>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: COLORS.purple }}>{f.platform}</span>
                <Badge color={COLORS.green}>{f.lf}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ background: `linear-gradient(135deg, ${COLORS.green}10, ${COLORS.purple}10)` }}>
        <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.softBlack, margin: "0 0 12px" }}>Testing Strategy</h4>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.softBlack, lineHeight: 1.6, margin: 0 }}>
          Each video ad tests 3-5 hook variations in the first 3 seconds. Win rates determine which hooks scale into dedicated landing pages and email sequences. Follow Grüns' proven playbook: start with research-driven hooks, test fast on Meta, spin out dedicated pages when angles prove themselves, then invest in creator-scale production.
        </p>
      </Card>
    </div>
  );
}

const TAB_COMPONENTS = {
  overview: OverviewTab,
  lifeforces: LifeForcesTab,
  headlines: HeadlinesTab,
  calendar: CalendarTab,
  visual: VisualTab,
  influencer: InfluencerTab,
  emails: EmailsTab,
  ads: AdsTab,
};

export default function GrunsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: COLORS.white, borderBottom: "1px solid #E8E4DF", padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "28px" }}>🐻</span>
              <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", fontWeight: 800, color: COLORS.softBlack, margin: 0 }}>
                Grüns — "Start With You"
              </h1>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.warmGray, margin: "4px 0 0 38px" }}>
              Creative Architecture Dashboard · Parent Campaign · Spring 2026
            </p>
          </div>
          <Badge color={COLORS.green}>LIVE CAMPAIGN</Badge>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ background: COLORS.white, borderBottom: "1px solid #E8E4DF", padding: "0 28px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "0" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: activeTab === tab.id ? 700 : 500,
                padding: "14px 18px",
                border: "none",
                borderBottom: activeTab === tab.id ? `3px solid ${COLORS.green}` : "3px solid transparent",
                cursor: "pointer",
                background: "transparent",
                color: activeTab === tab.id ? COLORS.green : COLORS.warmGray,
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px", maxWidth: "1100px" }}>
        <ActiveComponent />
      </div>

      {/* Footer */}
      <div style={{ padding: "20px 28px", borderTop: "1px solid #E8E4DF", marginTop: "40px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: COLORS.warmGray, margin: 0 }}>
          Campaign architecture by Zen Richards / Engine Command · Built with Cashvertising LF8 + Burning Soul system
        </p>
      </div>
    </div>
  );
}
