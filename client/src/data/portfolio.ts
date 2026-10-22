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

export const siteData = {
  identity: {
    initials: "AS",
    name: { ar: "امين", en: "Adam Salim" },
    role: { ar: "مطور عام ومصمم رقمي", en: "General Developer & Digital Designer" },
    location: { ar: "الدار البيضاء، المغرب", en: "Casablanca, Morocco" },
    availability: { ar: "متاح لفرص جديدة", en: "Open to new opportunities" },
    email: "hello@adamsalim.dev",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username",
    heroImage: "images/hero.jpg",
    markImage: "images/mark.jpg",
  },
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
      title: { ar: "لوحة إدارة المتعلم", en: "Learner Dashboard" },
      category: { ar: "واجهة ويب", en: "Web interface" },
      status: { ar: "مشروع تجريبي", en: "Concept project" },
      description: {
        ar: "واجهة مركزة تساعد المتعلم على تنظيم المهام والدروس والتقدم اليومي دون ازدحام بصري.",
        en: "A focused interface that helps a learner organize tasks, lessons, and daily progress without visual noise.",
      },
      stack: ["React", "TypeScript", "CSS"],
      image: "images/project-1.jpg",
      link: "https://github.com/your-username/learner-dashboard",
    },
    {
      number: "02",
      title: { ar: "دفتر يومي", en: "Daily Note" },
      category: { ar: "تجربة هاتف", en: "Mobile experience" },
      status: { ar: "قيد التطوير", en: "In progress" },
      description: {
        ar: "فكرة تطبيق هاتف بسيطة لتجميع الملاحظات والمهام القصيرة في مساحة هادئة وسريعة.",
        en: "A simple mobile concept for gathering short notes and tasks in one calm, quick space.",
      },
      stack: ["React Native", "Expo", "UI Design"],
      image: "images/project-2.jpg",
      link: "https://github.com/your-username/daily-note",
    },
    {
      number: "03",
      title: { ar: "موقع الاستوديو", en: "Studio Landing Page" },
      category: { ar: "هوية وموقع", en: "Brand & website" },
      status: { ar: "مشروع تجريبي", en: "Concept project" },
      description: {
        ar: "صفحة تعريفية لاستوديو إبداعي تجمع قصة العلامة والخدمات ونماذج العمل في مسار بصري واضح.",
        en: "A studio introduction page that combines brand story, services, and selected work in a clear visual sequence.",
      },
      stack: ["Figma", "React", "Motion"],
      image: "images/project-3.jpg",
      link: "https://github.com/your-username/studio-landing",
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
