/**
 * CONTENT FILE — عدّل المعلومات هنا فقط لتغيير محتوى البورتفوليو.
 * كل نص يملك نسخة عربية (ar) وإنجليزية (en)، وكل صورة مشروع تملك رابطًا مستقلًا.
 * عند النشر على GitHub Pages: ضع صورك في client/public/images ثم اكتب مثلًا: images/project-1.jpg
 * ويمكنك أيضًا وضع رابط كامل يبدأ بـ https:// لصورة مستضافة على الإنترنت.
 */
export type Language = "ar" | "en";

export type LocalizedText = {
  ar: string;
  en: string;
};

export type SocialLink = {
  id: string;
  label: { ar: string; en: string };
  href: string;
  icon?: string; // path to custom icon in public/images
  type?: "lucide" | "custom";
};

export const siteData = {
  identity: {
    initials: "AM",
    name: { ar: "امين", en: "Amin" },
    role: { ar: "مطور عام ومصمم رقمي", en: "General Developer & Digital Designer" },
    location: { ar: "الدار البيضاء، المغرب", en: "Casablanca, Morocco" },
    availability: { ar: "متاح لفرص جديدة", en: "Open to new opportunities" },
    email: "iamnx.amin.pro@gmail.com",
    github: "https://github.com/iamnxpro",
    linkedin: "https://www.linkedin.com/in/your-username",
    heroImage: "images/hero.jpg",
    markImage: "images/mark.jpg",
  },
  social: [
    { id: "whatsapp", label: { ar: "واتساب", en: "WhatsApp" }, href: "https://wa.me/212754427433", icon: "images/logo.jpg", type: "custom" },
    { id: "instagram", label: { ar: "إنستغرام", en: "Instagram" }, href: "https://www.instagram.com/iamnx_pro/", icon: "images/instalogo.jpg", type: "custom" },
    { id: "facebook", label: { ar: "فيسبوك", en: "Facebook" }, href: "https://web.facebook.com/iamnxpro", icon: "images/facelogo.jpg", type: "custom" },
    { id: "github", label: { ar: "جيتهاب", en: "GitHub" }, href: "https://github.com/iamnxpro", type: "lucide" },
    { id: "discord", label: { ar: "ديسكورد", en: "Discord" }, href: "https://discord.com/users/1218123666361942127", icon: "images/vU8pcbf.png", type: "custom" },
    { id: "email", label: { ar: "البريد", en: "Email" }, href: "mailto:iamnx.amin.pro@gmail.com", icon: "images/gmail.jpg", type: "custom" },
  ] as SocialLink[],
  hero: {
    eyebrow: { ar: "ملاحظات من الاستوديو · 2026", en: "Notes from the studio · 2026" },
    title: { ar: "أصمّم تجارب رقمية واضحة، ثم أبنيها لتعمل.", en: "I design clear digital experiences, then build them to work." },
    description: {
      ar: "مطور ومصمم أركز على المواقع والواجهات التي تجمع بين المنطق، الوضوح، والتفاصيل التي تشعر بها العين قبل أن تلاحظها.",
      en: "A developer and designer focused on websites and interfaces where logic, clarity, and the small details work together.",
    },
  },
  profile: {
    kicker: { ar: "نبذة قصيرة", en: "A short introduction" },
    title: { ar: "أتعلم دائمًا، وأبني بعناية.", en: "Always learning. Building with care." },
    body: {
      ar: "أستمتع بتحويل الأفكار الأولية إلى منتجات رقمية مفهومة. أعمل بين التصميم والبرمجة، وأهتم بأن تكون الواجهة سهلة قبل أن تكون ملفتة.",
      en: "I enjoy turning early ideas into understandable digital products. I work between design and code, making sure an interface feels useful before it tries to impress.",
    },
    note: { ar: "المهارة تُبنى بالمشاريع الصغيرة المتقنة.", en: "Skill grows through small, well-finished projects." },
  },
  skills: [
    { title: { ar: "الواجهة", en: "Front-end" }, items: ["HTML", "CSS", "JavaScript", "React"] },
    { title: { ar: "التصميم", en: "Design" }, items: ["Figma", "UI Design", "Prototyping", "Design Systems"] },
    { title: { ar: "العمل", en: "Workflow" }, items: ["Git", "GitHub", "Responsive Design", "Problem Solving"] },
  ],
  projects: [
    {
      number: "01",
      title: { ar: "IAMNXLauncher", en: "IAMNXLauncher" },
      category: { ar: "تطبيق سطح مكتب", en: "Desktop application" },
      status: { ar: "قيد الإصلاح", en: "Under Repair" },
      description: {
        ar: "لانشر ماين كرافت مبني على بريزم لانشر",
        en: "A Minecraft launcher built on Prism Launcher",
      },
      stack: ["C++", "CMake", "Java", "QML"],
      image: "images/project-1.jpg",
      link: "https://github.com/iamnxpro/IAMNXLauncher",
    },
    {
      number: "02",
      title: { ar: "قيد التطوير", en: "Under Development" },
      category: { ar: "قيد التطوير", en: "In development" },
      status: { ar: "قيد التطوير", en: "In development" },
      description: {
        ar: "مشروع جديد قادم قريبًا...",
        en: "A new project coming soon...",
      },
      stack: ["TBD"],
      image: "images/project-2.jpg",
      link: "",
    },
    {
      number: "03",
      title: { ar: "قيد التطوير", en: "Under Development" },
      category: { ar: "قيد التطوير", en: "In development" },
      status: { ar: "قيد التطوير", en: "In development" },
      description: {
        ar: "مشروع جديد قادم قريبًا...",
        en: "A new project coming soon...",
      },
      stack: ["TBD"],
      image: "images/project-3.jpg",
      link: "",
    },
  ],
  contact: {
    title: { ar: "هل لديك فكرة تستحق أن تُبنى؟", en: "Have an idea worth building?" },
    body: {
      ar: "أنا دائمًا مهتم بالتعرف على مشروع جيد، تحدٍّ جديد، أو فرصة للتعلّم والعمل معًا.",
      en: "I am always interested in a good project, a new challenge, or an opportunity to learn and build together.",
    },
  },
} as const;
