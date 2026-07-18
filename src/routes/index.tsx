import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Leaf, Mic, ScanLine, Satellite, Sprout, CloudSun, Store, ArrowRight, Play,
  Check, Github, Mail, Twitter, Facebook, Linkedin, ChevronDown, Sparkles,
  Bot, Brain, Eye, Globe, Cpu, Database, Layers, Zap, ShieldCheck, MapPin,
  AlertTriangle, TrendingUp, Users, Award, Clock, Target,
} from "lucide-react";
import heroImg from "@/assets/hero-farmer.jpg";
import satImg from "@/assets/satellite-ndvi.jpg";
import diseaseImg from "@/assets/disease-detection.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
      <Sparkles className="h-3.5 w-3.5 animate-pulse" />
      {children}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}


function Button({
  children, variant = "primary", size = "md", href, onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  href?: string;
  onClick?: () => void;
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap";
  const sizes = { md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    primary: "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.03] hover:shadow-elevated",
    outline: "border border-border bg-card/50 text-foreground hover:bg-accent hover:border-primary/40",
    ghost: "text-foreground hover:bg-accent",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all ${scrolled ? "glass shadow-card" : ""}`}>
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold">Untitled</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">Farming AI</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#modules" className="hover:text-foreground transition">Modules</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#tech" className="hover:text-foreground transition">Technology</a>
            <a href="#roadmap" className="hover:text-foreground transition">Roadmap</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground">Sign in</a>
            <Button size="md">Get Started <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary-glow/25 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="animate-fade-up">
            <SectionLabel>Your AI Farming Companion</SectionLabel>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Bangladesh's{" "}
              <span className="text-gradient animate-gradient inline-block">AI-Powered</span>{" "}
              Farming Assistant
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              An intelligent agriculture platform that helps farmers make better decisions using voice conversations, crop disease detection, satellite imagery, soil intelligence, weather forecasting, and localized agricultural knowledge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">Get Started <ArrowRight className="h-4 w-4" /></Button>
              <Button size="lg" variant="outline"><Play className="h-4 w-4" /> Watch Demo</Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Bangla voice-first</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Works on low-end phones</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Trusted by NGOs</div>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-border/50">
              <img src={heroImg} alt="Bangladeshi farmer using AI farming assistant" width={1536} height={1152} className="w-full h-auto" />
            </div>
            <div className="hidden md:block absolute -left-6 top-10 glass rounded-2xl p-4 shadow-card animate-float w-56">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Leaf className="h-3.5 w-3.5 text-primary" /> Crop Health</div>
              <div className="mt-2 font-display text-2xl font-semibold">92% <span className="text-xs font-normal text-primary">Excellent</span></div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-primary" />
              </div>
            </div>
            <div className="hidden md:block absolute -right-4 bottom-16 glass rounded-2xl p-4 shadow-card animate-float w-60" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5 text-primary" /> Disease Detected</div>
              <div className="mt-1 font-display text-base font-semibold">Rice Blast · 87%</div>
              <div className="mt-1 text-[11px] text-muted-foreground">Apply Tricyclazole within 3 days</div>
            </div>
            <div className="hidden lg:block absolute -bottom-6 left-8 glass rounded-2xl p-3 shadow-card animate-float w-48" style={{ animationDelay: "2s" }}>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-ring">
                  <Mic className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs font-medium">Listening…</div>
                  <div className="text-[10px] text-muted-foreground">বাংলায় বলুন</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, suffix = "", duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Stats() {
  const stats = [
    { label: "Future Farmers", value: 100000, suffix: "+", static: false },
    { label: "District Coverage", value: 64, suffix: "", static: false },
    { label: "Supported Crops", value: 50, suffix: "+", static: false },
    { label: "AI Assistant", value: 24, suffix: "/7", static: true },
    { label: "Detection Accuracy", value: 95, suffix: "%", static: false },
  ];
  return (
    <section className="py-20 border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
                {s.static ? <>{s.value}{s.suffix}</> : <CountUp end={s.value} suffix={s.suffix} />}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const problems = [
    { icon: ScanLine, text: "Farmers cannot quickly identify crop diseases" },
    { icon: CloudSun, text: "Weather changes are unpredictable" },
    { icon: Sprout, text: "Fertilizer misuse reduces crop yield" },
    { icon: AlertTriangle, text: "Pest outbreaks spread rapidly" },
    { icon: Brain, text: "Agricultural knowledge is difficult to access" },
    { icon: Satellite, text: "Satellite data is rarely accessible to farmers" },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Agriculture faces many challenges</h2>
          <p className="mt-4 text-lg text-muted-foreground">Every season, farmers across Bangladesh lose yield to preventable problems. We built Untitled to close that gap.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p) => (
            <div key={p.text} className="group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated hover:border-primary/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <p.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-medium leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="py-28 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <SectionLabel>The Solution</SectionLabel>
        <h2 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
          One AI platform.<br />
          <span className="text-gradient">Complete farming intelligence.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Untitled combines large language models, computer vision, satellite intelligence, and localized agricultural knowledge into one voice-first assistant — specialized for Bangladesh's farms, seasons, and soil.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["Voice-first", "Bangla-native", "Offline-capable", "Satellite-aware", "Government-ready"].map((t) => (
            <span key={t} className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const modules = [
  {
    icon: Mic, tag: "Module 01", title: "AI Voice Assistant",
    desc: "Farmers speak in Bangla instead of typing. Natural conversations with memory and personalized recommendations.",
    features: ["Bangla speech recognition", "Bangla voice replies", "Natural conversations", "Conversation memory", "Voice-first interface"],
    demo: "voice",
  },
  {
    icon: ScanLine, tag: "Module 02", title: "Crop Disease Detection",
    desc: "Upload a photo. AI identifies the disease, severity, and treatment — organic and chemical — plus the nearest agricultural office.",
    features: ["Disease name & confidence", "Severity assessment", "Organic + chemical treatment", "Prevention guidance"],
    demo: "disease",
  },
  {
    icon: Satellite, tag: "Module 03", title: "Satellite Intelligence",
    desc: "NDVI, water stress, flood mapping, yield estimation — powered by Sentinel-2, Landsat, and Google Earth Engine.",
    features: ["Crop health monitoring", "Water stress detection", "Flood mapping", "Disease hotspot identification", "Yield estimation"],
    demo: "satellite",
  },
  {
    icon: Sprout, tag: "Module 04", title: "Soil Intelligence",
    desc: "Enter GPS or upload a soil report. AI predicts suitable crops, NPK, pH, fertilizer needs, and expected yield.",
    features: ["Suitable crops", "pH & organic matter", "Nitrogen, Phosphorus, Potassium", "Fertilizer recommendation", "Yield forecast"],
    demo: "soil",
  },
  {
    icon: CloudSun, tag: "Module 05", title: "Weather Intelligence",
    desc: "BMD, NASA, and OpenWeather combined — explained in simple Bangla, not just numbers.",
    features: ["Rain forecast & humidity", "Cyclone alerts", "Flood warnings", "Heat stress", "Bangla explanations"],
    demo: "weather",
  },
  {
    icon: Store, tag: "Module 06", title: "Marketplace",
    desc: "A digital marketplace connecting farmers with verified buyers, sellers, and machinery — with daily market prices.",
    features: ["Seeds, fertilizers, pesticides", "Machinery rental", "Sell harvested crops", "Daily market prices", "Digital payments"],
    demo: "market",
  },
];

function ModuleDemo({ kind }: { kind: string }) {
  if (kind === "voice") {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0">কৃ</div>
          <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm" style={{ fontFamily: "Noto Sans Bengali, sans-serif" }}>
            আমার ধানের পাতায় দাগ পড়েছে
          </div>
        </div>
        <div className="mt-3 flex items-start gap-3 flex-row-reverse">
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center shrink-0"><Bot className="h-4 w-4 text-primary-foreground" /></div>
          <div className="rounded-2xl rounded-tr-sm bg-gradient-primary text-primary-foreground px-4 py-2.5 text-sm" style={{ fontFamily: "Noto Sans Bengali, sans-serif" }}>
            ছবিটি আপলোড করুন। এটি ব্লাস্ট রোগ হতে পারে। আমি নিশ্চিত করে চিকিৎসা জানাচ্ছি।
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Listening in Bangla…
        </div>
      </div>
    );
  }
  if (kind === "disease") {
    return (
      <div className="rounded-2xl overflow-hidden border border-border shadow-card">
        <img src={diseaseImg} alt="Disease detection" width={1200} height={900} loading="lazy" className="w-full h-56 object-cover" />
        <div className="p-4 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Detected</div>
              <div className="font-semibold">Rice Blast (Magnaporthe oryzae)</div>
            </div>
            <div className="rounded-full bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1">95% confidence</div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg bg-muted p-2"><div className="text-muted-foreground">Severity</div><div className="font-semibold">Moderate</div></div>
            <div className="rounded-lg bg-muted p-2"><div className="text-muted-foreground">Organic</div><div className="font-semibold">Neem oil</div></div>
            <div className="rounded-lg bg-muted p-2"><div className="text-muted-foreground">Chemical</div><div className="font-semibold">Tricyclazole</div></div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "satellite") {
    return (
      <div className="rounded-2xl overflow-hidden border border-border shadow-card relative">
        <img src={satImg} alt="Satellite NDVI" width={1200} height={900} loading="lazy" className="w-full h-64 object-cover" />
        <div className="absolute top-3 left-3 glass rounded-lg px-3 py-1.5 text-xs">
          <div className="text-muted-foreground">NDVI</div>
          <div className="font-semibold">0.74 · Healthy</div>
        </div>
        <div className="absolute bottom-3 right-3 glass rounded-lg px-3 py-1.5 text-xs">
          <MapPin className="h-3 w-3 inline mr-1" /> Rangpur District
        </div>
      </div>
    );
  }
  if (kind === "soil") {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="text-xs text-muted-foreground mb-3">Soil Report · Bogura</div>
        <div className="grid grid-cols-2 gap-3">
          {[{k:"pH",v:"6.4"},{k:"Nitrogen",v:"Med"},{k:"Phosphorus",v:"High"},{k:"Potassium",v:"Low"}].map(x=>(
            <div key={x.k} className="rounded-lg bg-muted p-3">
              <div className="text-xs text-muted-foreground">{x.k}</div>
              <div className="font-display text-xl font-semibold">{x.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-primary/10 text-primary p-3 text-sm">
          <div className="font-semibold">Recommended crop: Rice (BRRI dhan29)</div>
          <div className="text-xs opacity-80">Expected yield: 6.2 t/ha</div>
        </div>
      </div>
    );
  }
  if (kind === "weather") {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Dhaka Division · Tomorrow</div>
            <div className="font-display text-3xl font-semibold">28° / 24°</div>
          </div>
          <CloudSun className="h-12 w-12 text-primary" />
        </div>
        <div className="mt-3 rounded-xl bg-primary/10 text-primary p-3 text-sm" style={{ fontFamily: "Noto Sans Bengali, sans-serif" }}>
          আগামীকাল ভারী বৃষ্টির সম্ভাবনা রয়েছে। আজকে সেচ না দিলেও চলবে।
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          {["Mon","Tue","Wed","Thu"].map(d=>(
            <div key={d} className="flex-1 rounded-lg bg-muted p-2 text-center">
              <div className="text-muted-foreground">{d}</div>
              <div className="font-semibold">29°</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="text-xs text-muted-foreground mb-3">Today's Market Prices</div>
      <div className="space-y-2">
        {[{c:"Rice",p:"৳ 32.50/kg",t:"+1.4%"},{c:"Potato",p:"৳ 22.00/kg",t:"-0.8%"},{c:"Jute",p:"৳ 65.00/kg",t:"+2.1%"}].map(x=>(
          <div key={x.c} className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="font-medium">{x.c}</div>
            <div className="flex items-center gap-3">
              <div className="text-sm">{x.p}</div>
              <div className={`text-xs font-semibold ${x.t.startsWith("+") ? "text-primary" : "text-destructive"}`}>{x.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Modules() {
  return (
    <section id="modules" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>Core Modules</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Six AI systems, one companion</h2>
          <p className="mt-4 text-lg text-muted-foreground">Every module is trained on Bangladesh's crops, weather, and farming realities.</p>
        </div>

        <div className="mt-16 space-y-24">
          {modules.map((m, i) => (
            <div key={m.title} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <div className="text-xs font-mono text-primary tracking-widest">{m.tag}</div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                    <m.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold">{m.title}</h3>
                </div>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg">{m.desc}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2 max-w-lg">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div><ModuleDemo kind={m.demo} /></div>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-3xl border border-border bg-card p-8 md:p-12 shadow-card">
          <h3 className="font-display text-2xl font-semibold">Supported crops</h3>
          <p className="mt-2 text-muted-foreground">Over 50 crops with expanding coverage every season.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Rice","Potato","Tomato","Jute","Mustard","Wheat","Banana","Mango","Corn","Vegetables","Onion","Chili","Lentil","Sugarcane"].map(c=>(
              <span key={c} className="rounded-full border border-border bg-background px-4 py-2 text-sm hover:border-primary/40 hover:text-primary transition">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Localized() {
  const items = ["Bangladesh weather","Bangladesh crops","Local diseases","Local pests","Seasonal farming","Government policies","Fertilizer recommendations","Market prices","Best practices","Soil conditions","Satellite imagery","Flood risks"];
  return (
    <section className="py-28 bg-card/40 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel>Localized AI Knowledge</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Built for Bangladesh — <span className="text-gradient">not translated to it</span></h2>
          <p className="mt-4 text-lg text-muted-foreground">Our models are trained on Bangladeshi crops, soil types, weather patterns, and government policies — so answers actually match the field.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((it) => (
            <div key={it} className="rounded-xl border border-border bg-background p-4 text-sm font-medium hover:border-primary/40 hover:shadow-card transition">
              <Check className="h-4 w-4 text-primary mb-2" />
              {it}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    { n: "01", icon: Mic, title: "Speak or upload", desc: "Ask a question in Bangla or upload a photo of your crop." },
    { n: "02", icon: Brain, title: "AI understands", desc: "Analyzes weather, soil, satellite and agricultural knowledge for your farm." },
    { n: "03", icon: Sparkles, title: "Get recommendations", desc: "Personalized guidance in Bangla — organic or chemical, whatever works." },
  ];
  return (
    <section id="how" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Three steps. Any farm.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-3xl border border-border bg-card p-8 shadow-card">
              <div className="text-6xl font-display font-bold text-primary/10">{s.n}</div>
              <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && <ArrowRight className="hidden md:block absolute -right-5 top-1/2 h-8 w-8 text-primary/40" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tech() {
  const tech = [
    { icon: Brain, name: "LLMs" },
    { icon: Eye, name: "Computer Vision" },
    { icon: Satellite, name: "Satellite Intelligence" },
    { icon: Globe, name: "GIS" },
    { icon: Layers, name: "Earth Engine" },
    { icon: Cpu, name: "PyTorch" },
    { icon: Zap, name: "FastAPI" },
    { icon: Bot, name: "Flutter" },
    { icon: Database, name: "PostgreSQL" },
    { icon: Database, name: "Redis" },
    { icon: Database, name: "Qdrant" },
    { icon: Mic, name: "Whisper" },
  ];
  return (
    <section id="tech" className="py-28 bg-card/40 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>Technology</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Built on modern AI infrastructure</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {tech.map((t) => (
            <div key={t.name} className="group rounded-2xl border border-border bg-background p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-card">
              <t.icon className="h-6 w-6 mx-auto text-primary" />
              <div className="mt-2 text-sm font-medium">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  const items = [
    "Drone crop monitoring", "IoT soil sensors", "Smart irrigation",
    "Livestock assistant", "Pest outbreak prediction", "Yield prediction",
    "Climate adaptation", "Agricultural insurance", "Carbon footprint monitoring",
  ];
  return (
    <section id="roadmap" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>Roadmap</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">What's next</h2>
          <p className="mt-4 text-lg text-muted-foreground">We're expanding beyond the phone — into the sky, the soil, and the marketplace.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div key={it} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/40 transition">
              <div className="text-xs font-mono text-primary">Q{Math.floor(i / 3) + 1} · Coming</div>
              <div className="mt-2 font-display text-lg font-semibold">{it}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const list = [
    { name: "Rahim Uddin", role: "Farmer, Rangpur", quote: "আমি বাংলায় প্রশ্ন করি, AI বাংলায় উত্তর দেয়। এই প্রথম প্রযুক্তি আমার জন্য কাজ করছে।", icon: Users, bn: true },
    { name: "Dr. Fatima Rahman", role: "Agricultural Researcher, BARI", quote: "The disease detection accuracy on rice varieties is remarkable. It's a genuine research-grade tool put in every farmer's pocket.", icon: Award, bn: false },
    { name: "Nasir Ahmed", role: "Upazila Agriculture Officer", quote: "For the first time, my farmers reach me with a diagnosis already in hand. My job is faster and much more effective.", icon: ShieldCheck, bn: false },
    { name: "Green Delta NGO", role: "Field Operations Lead", quote: "We deployed Untitled across 12 districts. Yields improved measurably in one season.", icon: TrendingUp, bn: false },
  ];
  return (
    <section className="py-28 bg-card/40 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Trusted across the field</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {list.map((t) => (
            <div key={t.name} className="rounded-3xl border border-border bg-background p-8 shadow-card">
              <p className="text-lg leading-relaxed" style={t.bn ? { fontFamily: "Noto Sans Bengali, sans-serif" } : {}}>
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center">
                  <t.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How accurate is disease detection?", a: "Our vision models achieve 95% accuracy on Bangladesh's top 10 crops, validated against BARI-labeled datasets." },
    { q: "Can I use Bangla voice?", a: "Yes — Bangla is our primary interface. Speech recognition and replies are fully Bangla-native." },
    { q: "Does it work offline?", a: "Core disease detection and cached weather/soil data work offline. Voice and satellite features need a connection." },
    { q: "How are recommendations generated?", a: "By combining your farm's satellite imagery, soil report, local weather, and BARI/DAE agronomic guidelines." },
    { q: "Which crops are supported?", a: "Over 50 crops today — rice, jute, potato, tomato, wheat, mustard, banana, mango, corn, and more." },
    { q: "Is satellite monitoring free?", a: "Yes, for individual farmers on the free tier. NGOs and government partners get expanded analytics." },
  ];
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Questions, answered</h2>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-muted-foreground animate-fade-up">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-20 shadow-elevated text-center">
          <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">Empower your farm with AI</h2>
            <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">Join farmers, researchers, and organizations building the future of Bangladesh's agriculture.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-3.5 text-base font-medium hover:scale-[1.03] transition-transform">Get Started <ArrowRight className="h-4 w-4" /></a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 text-base font-medium hover:bg-primary-foreground/10 transition"><Play className="h-4 w-4" /> Watch Demo</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-16 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary"><Leaf className="h-5 w-5 text-primary-foreground" /></div>
              <div><div className="font-display font-semibold">Untitled</div><div className="text-xs text-muted-foreground -mt-0.5">Farming AI Companion</div></div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">Empowering Bangladesh's agriculture through localized AI, satellite intelligence, and voice-first interaction.</p>
            <div className="mt-5 flex gap-3">
              {[Github, Twitter, Facebook, Linkedin, Mail].map((I, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary/40 hover:text-primary transition"><I className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: ["Modules", "How it works", "Roadmap", "Technology"] },
            { title: "Resources", links: ["Documentation", "Research", "GitHub", "API"] },
            { title: "Company", links: ["About", "Contact", "Privacy Policy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-semibold text-sm">{col.title}</div>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 Untitled Farming AI Companion · Made for Bangladesh 🇧🇩</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 24/7 AI</span>
            <span className="flex items-center gap-1"><Target className="h-3 w-3" /> 95% accuracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Solution />
        <Modules />
        <Localized />
        <How />
        <Tech />
        <Roadmap />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
