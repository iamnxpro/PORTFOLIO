/**
 * DESIGN NOTE — "دفتر المبدع": مسار تحريري دافئ، ورق كريمي وحبر فحمي،
 * مع حركات انتقال خفيفة وواضحة تضع المشاريع قبل الزخرفة.
 */
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Code2,
  Copy,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  X,
} from "lucide-react";
import { type Language, type LocalizedText, siteData } from "@/data/portfolio";

const ui = {
  ar: {
    work: "الأعمال",
    about: "نبذة",
    skills: "المهارات",
    contact: "تواصل",
    selectedWork: "أعمال مختارة",
    viewProject: "مشاهدة المشروع",
    projectHint: "أضف رابط مشروعك في ملف البيانات: client/src/data/portfolio.ts",
    toolkit: "صندوق الأدوات",
    approach: "طريقة العمل",
    approachTitle: "من الفكرة إلى واجهة مفهومة.",
    steps: ["أفهم المشكلة", "أرسم المسار", "أبني وأحسّن"],
    emailCopied: "تم نسخ البريد الإلكتروني",
    copyEmail: "نسخ البريد",
    sendEmail: "أرسل بريدًا",
    social: "روابط التواصل",
    menu: "القائمة",
    close: "إغلاق",
    scroll: "اكتشف الأعمال",
    builtWith: "صُمم بعناية · محتوى تجريبي قابل للتعديل",
    year: "السجل الحالي",
    language: "English",
  },
  en: {
    work: "Work",
    about: "About",
    skills: "Skills",
    contact: "Contact",
    selectedWork: "Selected work",
    viewProject: "View project",
    projectHint: "Add your project link in client/src/data/portfolio.ts",
    toolkit: "Toolkit",
    approach: "Process",
    approachTitle: "From an idea to an interface that makes sense.",
    steps: ["Understand the problem", "Sketch the path", "Build and refine"],
    emailCopied: "Email copied to clipboard",
    copyEmail: "Copy email",
    sendEmail: "Send an email",
    social: "Social links",
    menu: "Menu",
    close: "Close",
    scroll: "Explore work",
    builtWith: "Built with care · editable placeholder content",
    year: "Current log",
    language: "العربية",
  },
} as const;

const translate = (text: LocalizedText, language: Language) => text[language];

/**
 * Supports external previews as well as local images placed in client/public/images for GitHub Pages.
 * Local paths are resolved against Vite's BASE_URL, so they also work when the site is
 * deployed to a GitHub Pages sub-path such as https://<user>.github.io/<repo>/.
 */
const imageUrl = (source: string) => {
  if (source.startsWith("http")) return source;
  return `${import.meta.env.BASE_URL}${source.replace(/^\//, "")}`;
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const copy = ui[language];
  const identity = siteData.identity;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = `${translate(identity.name, language)} — ${translate(identity.role, language)}`;
  }, [identity.name, identity.role, language]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setNotice(copy.emailCopied);
      window.setTimeout(() => setNotice(""), 2400);
    } catch {
      setNotice(identity.email);
    }
  };

  const showProjectHint = () => {
    setNotice(copy.projectHint);
    window.setTimeout(() => setNotice(""), 3200);
  };

  const navItems = [
    { id: "work", label: copy.work },
    { id: "about", label: copy.about },
    { id: "skills", label: copy.skills },
    { id: "contact", label: copy.contact },
  ];

  return (
    <div className="portfolio-shell" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="paper-noise" aria-hidden="true" />
      {notice && <div className="notice" role="status"><Check size={15} /> {notice}</div>}

      <aside className="side-rail" aria-label="Portfolio identity">
        <button className="brand-stamp" onClick={() => scrollTo("top")} aria-label="Back to top">
          <img src={imageUrl(identity.markImage)} alt="" />
          <span>{identity.initials}</span>
        </button>
        <div className="rail-line" />
        <div className="rail-meta">
          <span>{translate(identity.location, language)}</span>
          <span>© 2026</span>
        </div>
      </aside>

      <header className="topbar" id="top">
        <button className="wordmark" onClick={() => scrollTo("top")}>
          <span className="wordmark-name">{translate(identity.name, language)}</span>
          <span className="wordmark-role">{translate(identity.role, language)}</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language-toggle" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}>
            <Globe2 size={15} /> {copy.language}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? copy.close : copy.menu}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}><span>{item.label}</span><ArrowDownRight size={18} /></button>
          ))}
        </nav>
      )}

      <main>
        <section className="hero-section section-grid" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <p className="eyebrow"><CircleDot size={15} /> {translate(siteData.hero.eyebrow, language)}</p>
            <h1 id="hero-title">{translate(siteData.hero.title, language)}</h1>
            <p className="hero-description">{translate(siteData.hero.description, language)}</p>
            <div className="hero-actions">
              <button className="ink-button" onClick={() => scrollTo("work")}>
                {copy.scroll}<ArrowDownRight size={18} />
              </button>
              <span className="availability"><span className="availability-dot" />{translate(identity.availability, language)}</span>
            </div>
          </div>
          <figure className="hero-portrait reveal reveal-delay">
            <img src={imageUrl(identity.heroImage)} alt={translate(identity.name, language)} />
            <figcaption>
              <span>{translate(identity.role, language)}</span>
              <span>01 / 03</span>
            </figcaption>
          </figure>
          <div className="hero-marker" aria-hidden="true"><span>✦</span><span>WEB / DESIGN</span></div>
        </section>

        <section className="about-section section-grid" id="about" aria-labelledby="about-title">
          <div className="section-label"><span>01</span>{translate(siteData.profile.kicker, language)}</div>
          <div className="about-content">
            <h2 id="about-title">{translate(siteData.profile.title, language)}</h2>
            <p>{translate(siteData.profile.body, language)}</p>
            <blockquote>“{translate(siteData.profile.note, language)}”</blockquote>
          </div>
          <div className="about-ornament" aria-hidden="true"><span>MADE WITH</span><strong>CARE</strong><span>— 2026</span></div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div className="section-label"><span>02</span>{copy.selectedWork}</div>
            <h2 id="work-title">{language === "ar" ? "مشاريع بدأت بسؤال." : "Projects that started with a question."}</h2>
          </div>
          <div className="project-list">
            {siteData.projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.number}>
                <div className="project-image-wrap">
                  <img src={imageUrl(project.image)} alt={translate(project.title, language)} className="project-image" />
                  <span className="project-number">{project.number}</span>
                  <span className="project-status">{translate(project.status, language)}</span>
                </div>
                <div className="project-details">
                  <div>
                    <p className="project-category">{translate(project.category, language)}</p>
                    <h3>{translate(project.title, language)}</h3>
                  </div>
                  <p>{translate(project.description, language)}</p>
                  <div className="project-footer">
                    <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                    {project.link ? (
                      <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                        {copy.viewProject}<MoveUpRight size={17} />
                      </a>
                    ) : (
                      <button className="project-link" onClick={showProjectHint}>
                        {copy.viewProject}<MoveUpRight size={17} />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section section-grid" id="skills" aria-labelledby="skills-title">
          <div className="process-intro">
            <div className="section-label"><span>03</span>{copy.approach}</div>
            <h2 id="skills-title">{copy.approachTitle}</h2>
            <div className="process-steps">
              {copy.steps.map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}
            </div>
          </div>
          <div className="skills-paper">
            <div className="skills-paper-header"><Layers3 size={18} /><span>{copy.toolkit}</span><span className="paper-pin" /></div>
            {siteData.skills.map((group) => (
              <div className="skill-group" key={group.title.en}>
                <h3>{translate(group.title, language)}</h3>
                <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-grid-mark" aria-hidden="true"><span>✦</span><span>LET&apos;S<br />MAKE<br />SOMETHING</span></div>
          <div className="contact-copy">
            <p className="eyebrow"><Mail size={15} /> {copy.contact}</p>
            <h2 id="contact-title">{translate(siteData.contact.title, language)}</h2>
            <p>{translate(siteData.contact.body, language)}</p>
            <div className="contact-actions">
              <a className="ink-button" href={`mailto:${identity.email}`}>{copy.sendEmail}<ArrowUpRight size={18} /></a>
              <button className="email-copy" onClick={copyEmail}><Copy size={16} />{copy.copyEmail}</button>
            </div>
          </div>
          <div className="contact-links">
            <span>{copy.social}</span>
            <a href={identity.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={15} /></a>
            <a href={identity.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} /></a>
            <a href={`mailto:${identity.email}`}><Mail size={18} /> {identity.email} <ArrowUpRight size={15} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span><Code2 size={15} /> {copy.builtWith}</span>
        <button onClick={() => scrollTo("top")}>{copy.year}<ChevronDown size={15} /></button>
      </footer>
    </div>
  );
}
