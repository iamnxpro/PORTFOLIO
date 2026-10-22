# تقييمي للموقع — بورتفوليو "دفتر المبدع"

**التاريخ:** 22 أكتوبر 2026
**المجلد:** `C:\lol\portfolio`
**النطاق:** قراءة كاملة للكود + مراجعة عملية قبل إضافة مشروعك ونشر الموقع.

> **تحديث 22 أكتوبر 2026:** تم إصلاح المشكلات الثلاث الحرجة المذكورة في القسم 3، إضافةً إلى
> إصلاح مسار النشر ومشكلة وسم التحليلات. راجع القسم 9 للتفاصيل.

---

## 1. ملخص سريع

الموقع بورتفوليو شخصي ثنائي اللغة (عربي/إنجليزي) مبني على **React 19 + Vite 7 + Tailwind CSS 4**، بتصميم تحريري دافئ على طراز "دفتر المبدع": ورق كريمي، حبر فحمي، أخضر زيتوني، ولمسة مرجانية.

الفكرة التصميمية **ممتازة ومنفّذة بشكل جيد**: الموقع لا يشبه القوالب التقنية الجاهزة.

الموقع **جاهز من ناحية الشكل**، لكنه **ليس جاهزًا للنشر بعد**، وفيه **ثلاث مشاكل تقنية حقيقية** تمنع النشر على GitHub Pages بسلاسة. التفاصيل في القسم 4.

---

## 2. نقاط القوة

### 2.1 نظام التصميم متسق ومحكم
ألوان قليلة ومحددة، وكلها مستخدمة في مواضعها:

| اللون | القيمة | الاستخدام |
|---|---|---|
| ورق كريمي | `#f5f0e5` | الخلفية العامة |
| حبر فحمي | `#222420` | النصوص والتذييل |
| أخضر زيتوني | `#254f43` | الأقسام الأساسية، الأزرار، قسم المشاريع |
| مرجاني مطفأ | `#cf6248` | أزرار الأفعال، الشارات، قسم التواصل |

التباين بين الأقسام حقيقي (فاتح ← زيتوني ← مرجاني ← غامق)، فتُقرأ بنية الصفحة دون الحاجة لأي زخرفة.

### 2.2 دعم العربية (RTL) مدروس بشكل صحيح
هذه ليست نقطة تفصيلية، بل أهم ما يميّز الموقع:

- `document.documentElement.dir` يتبدّل بين `rtl` و`ltr` حسب اللغة المختارة.
- كل التنسيقات تستخدم **الخصائص المنطقية** بدل اليمين واليسار الثابتين:
  `padding-inline-start` و `inset-inline-end` و `border-inline-end` و `margin-inline-start`.
- النصوص العربية تستخدم خط **Noto Serif Arabic** للعناوين و **Manrope** للنصوص، مع اتجاه كتابة صحيح.

النتيجة: تبديل اللغة يقلب التخطيط بشكل سليم بدون أي تمديد (hack). أغلب المواقع العربية تفشل هنا.

### 2.3 المحتوى في ملف واحد (Single Source of Truth)
كل النصوص في `client/src/data/portfolio.ts` بشكل `LocalizedText = { ar, en }`. هذا يعني:
- إضافة مشروع = إضافة كائن واحد، بدون لمس الواجهة.
- لا تكرار للنصوص بين الملفات.
- استبدال المحتوى الكامل يتم في ثوانٍ.

هذا التصميم يفوق كثيرًا من مشاريع البورتفوليو التي تخلط المحتوى بـ JSX.

### 2.4 الطباعة والحركة
- عناوين بخط `clamp()` تتكيّف مع حجم الشاشة (`clamp(45px, 5.45vw, 86px)`) — حجم عرض كبير ومريح.
- حركات الدخول فقط عبر CSS (`reveal-up`)، بلا مكتبة أنيميشن ثقيلة في مسار العرض الفعلي.
- **احترام تفضيل تقليل الحركة** مطبّق بشكل صحيح: `@media (prefers-reduced-motion: no-preference)` يلف كل الحركات.
- حركات التحويم خفيفة ومقصودة (2–3px) — لا تشتيت.

### 2.5 إمكانية الوصول (Accessibility) جيدة
- `aria-labelledby` على كل قسم، و`aria-label` على أزرار التنقل.
- حالة `role="status"` للإشعارات المنبثقة.
- `focus-visible` بحoutline مرجاني واضح.
- عناصر دلالية (`aside` / `header` / `main` / `section` / `footer`).
- النصوص الفاصلة (`—`) والمحتوى مكرّر بلغتين، مما يحسّن إمكانية الوصول.

---

## 3. المشكلات الحرجة الثلاث — **تم إصلاحها جميعًا** ✅

> التفاصيل في القسم 9.

### 3.1 الصور كلها مكسورة عند النشر على GitHub Pages ⚠️ (مشكلة حرجة)

كل الصور في الموقع تشير إلى مسارات `/manus-storage/...`:

```ts
// client/src/data/portfolio.ts
heroImage: "/manus-storage/portfolio-hero-editorial_adf449f7.jpg",
markImage: "/manus-storage/portfolio-mark_ec612b47.png",
image: "/manus-storage/portfolio-project-dashboard_a1d9c043.jpg",
```

وهذا المسار **لا يعمل إلا داخل بيئة Manus أثناء التطوير**. السبب في `vite.config.ts`: المسار يُخدم عبر إضافة Vite تعمل **في وضع التطوير فقط** وتطلب متغيرات بيئة خاصة (`BUILT_IN_FORGE_API_URL` و `BUILT_IN_FORGE_API_KEY`):

```ts
function vitePluginStorageProxy(): Plugin {
  return {
    name: "manus-storage-proxy",
    configureServer(server) { /* يعمل فقط في dev */ },
  };
}
```

**النتيجة عند النشر:** الصورة البطل + شعار العلامة + الصور الثلاث للمشاريع + أيقونة الموقع (favicon) = **كلها ترجع 404**.

**الحل (5 دقائق):**
1. أنشئ `client/public/images/`
2. ضع صورك فيها: `client/public/images/hero.jpg` و `mark.png` و `my-project.jpg`
3. في `portfolio.ts` غيّر المسار لـ `images/hero.jpg` (بدون `/` في البداية)
4. في `client/index.html` غيّر الـ favicon إلى `<link rel="icon" href="%BASE_URL%images/mark.png" />`

> دالة `imageUrl()` في `Home.tsx` تتعامل مع هذا بشكل صحيح تلقائيًا عبر `import.meta.env.BASE_URL`، فالمسار `images/xxx.jpg` سيُبنى صحيحًا.

### 3.2 رابط المشروع مكتوب في البيانات لكن لا يُفتح أبدًا ⚠️ (مشكلة حرجة)

البيانات تحتوي حقل `link` لكل مشروع:

```ts
link: "https://github.com/your-username/learner-dashboard",
```

لكن الواجهة **لا تستخدمه إطلاقًا**:

```tsx
// client/src/pages/Home.tsx — السطر 221
<button className="project-link" onClick={showProjectHint}>
  {copy.viewProject}<MoveUpRight size={17} />
</button>
```

الزر لا يفتح الرابط، بل يعرض إشعارًا يقول «رابط تجريبي». أي أن التعليمات في `EDIT_GUIDE.md` و `README.md` عن وضع رابط مشروعك **لا تعمل فعليًا**.

**الحل:** استبدل `button` بـ `a`:

```tsx
<a className="project-link" href={project.link} target="_blank" rel="noreferrer">
  {copy.viewProject}<MoveUpRight size={17} />
</a>
```

### 3.3 ملف النشر إلى GitHub Pages غير موجود ⚠️

كل من `README.md` و `EDIT_GUIDE.md` يقول إن ملف النشر جاهز في:

```text
.github/workflows/deploy.yml
```

**لكن مجلد `.github` غير موجود في المستودع إطلاقًا.** عليك إنشاؤه بنفسك (الخطوات في القسم 5).

---

## 4. مشاكل ثانوية (مهمة لكنها لا تُعطّل النشر)

| # | المشكلة | الأثر | الحل |
|---|---|---|---|
| 1 | لا يوجد `base` في `vite.config.ts` | عند النشر على `user.github.io/repo/` كل المسارات تنكسر | أضف `base: "/اسم-المستودع/"` في `defineConfig` |
| 2 | `index.html` فيه وسم تحليلات وهمي | `%VITE_ANALYTICS_ENDPOINT%/umami` يُبنى إلى مسار مكسور `/umami` | احذف السطر 14 أو اضبط متغيرات البيئة |
| 3 | `<title>` و `meta description` ثابتة بالإنجليزية | SEO ضعيف + لا يوجد `og:` tags ولا صورة مشاركة | اجعلها ديناميكية من `siteData` |
| 4 | `App.tsx` لم يعد يستخدم `wouter` | صفحة `NotFound.tsx` كود ميت، و`wouter` تبعية زائدة | احذف الصفحة أو أعد تفعيل الراوتر |
| 5 | 60+ مكوّن `components/ui/` غير مستخدم | تضخيم المشروع بلا فائدة (لا يضر حجم الحزمة(Tree-shaking) لكن يربك الصيانة) | احذف ما لا تحتاجه أو تجاهله |
| 6 | `client/public/__manus__/debug-collector.js` يُنسخ إلى الإنتاج | ملف تصحيح يُنشر مع الموقع بلا داعٍ | احذف المجلد قبل النشر |
| 7 | `client/src/const.ts` + `shared/const.ts` فيها منطق OAuth | كود ميت يشير لبيئة Manus (`VITE_APP_ID`) | احذفه إن لم تكن تحتاج مصادقة |
| 8 | `hover` في RTL يتحرك يسارًا دائمًا | `transform: translateX(-3px)` في `.project-link` و `.contact-links a` | استخدم `translateX` مع اتجاه أو استخدم `margin-inline-start` |
| 9 | قوائم الجوال لا تُغلق بـ Escape | تسرب تركيز Focus | أضف `onKeyDown` للـ Escape + `aria-expanded` |
| 10 | لا يوجد ESLint | `tsc --noEmit` و Prettier فقط | أضف ESLint لاحقًا (اختياري) |
| 11 | `identity.initials` = `"AS"` | الاسم المعروض «أمين» والاختصار يناقضه | غيّرها إلى `"A"` أو `"أ"` |
| 12 | نصوص تجريبية باقية | «مشروع تجريبي»، «رابط تجريبي»، «محتوى تجريبي قابل للتعديل» | احذفها كلها قبل النشر |

---

## 5. كيف تضع مشروعك في الموقع (الخطوات الدقيقة)

### الخطوة 1 — جهّز الصورة
- مقاس مقترح: أفقي بنسبة `4:3` (مثلًا `1600×1200`).
- ضعها في `client/public/images/my-project.jpg`

### الخطوة 2 — أضف كائن المشروع في ملف البيانات
افتح `client/src/data/portfolio.ts`، واذهب إلى `projects`، وأضف كائنًا جديدًا **قبل** القوس الأخير `]`:

```ts
{
  number: "04",
  title: { ar: "اسم مشروعك", en: "Your Project Name" },
  category: { ar: "نوع المشروع", en: "Project Type" },
  status: { ar: "قيد التطوير", en: "In progress" },
  description: {
    ar: "وصف مختصر لمشروعك بالعربية، سطر أو سطران يوضحان المشكلة والحل.",
    en: "A short English description of your project — two lines maximum.",
  },
  stack: ["React", "TypeScript", "PostgreSQL"],
  image: "images/my-project.jpg",
  link: "https://github.com/اسمك/اسم-المستودع",
}
```

> **انتبه:** الفاصلة `,` لازمة بعد كل مشروع ما عدا آخر واحد. لا تنسَها — أكثر خطأ شائع.

### الخطوة 3 — أصلح زر الرابط (إلزامي)
في `client/src/pages/Home.tsx`، غيّر السطر:
```tsx
<button className="project-link" onClick={showProjectHint}>{copy.viewProject}<MoveUpRight size={17} /></button>
```
إلى:
```tsx
<a className="project-link" href={project.link} target="_blank" rel="noreferrer">{copy.viewProject}<MoveUpRight size={17} /></a>
```

### الخطوة 4 — حدّث بياناتك الشخصية
في نفس الملف، عدّل `identity`:
```ts
identity: {
  initials: "A",
  name: { ar: "اسمك", en: "Your Name" },
  role: { ar: "مطور ومصمم", en: "Developer & Designer" },
  location: { ar: "مدينتك، بلدك", en: "Your City, Country" },
  availability: { ar: "متاح للعمل", en: "Open to work" },
  email: "your@email.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  heroImage: "images/hero.jpg",
  markImage: "images/mark.png",
}
```

### الخطوة 5 — نظّف النصوص التجريبية
في `Home.tsx`، داخل كائن `ui`:
- `viewProject: "رابط تجريبي"` → `"مشاهدة المشروع"`
- `projectHint: "ضع رابط مشروعك الحقيقي..."` → احذف التليح
- `social: "روابط تجريبية"` → `"روابط التواصل"`
- `builtWith: "... محتوى تجريبي قابل للتعديل"` → `"صُمم بعناية"`
- في `portfolio.ts`: `status: { ar: "مشروع تجريبي" }` → `"مكتمل"`

### الخطوة 6 — اختبر محليًا
```bash
pnpm install
pnpm dev
```
الموقع يعمل على `http://localhost:3000` (أو منفذ تالٍ إذا كان 3000 مشغولًا).

### الخطوة 7 — تحقّق من الأنواع
```bash
pnpm check
```
يجب أن يمرّ `tsc --noEmit` بدون أخطاء.

### الخطوة 8 — ابنِ النسخة النهائية
```bash
pnpm build
```
الناتج في `dist/public/`.

---

## 6. النشر على GitHub Pages — الخطوات الناقصة

بما أن `.github/workflows/deploy.yml` غير موجود، أنشئه:

**المجلد:** `.github/workflows/`
**الملف:** `deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

ثم:
1. `git add . && git commit -m "..." && git push`
2. من المستودع: **Settings → Pages → Source → GitHub Actions**
3. تابع البناء من تبويب **Actions**

### لو نشرت على نطاق فرعي (`user.github.io/repo/`)
أضف في `vite.config.ts` داخل `defineConfig`:
```ts
base: "/repo/",
```
وغيّر السطر في `client/index.html`:
```html
<link rel="icon" href="%BASE_URL%images/mark.png" />
```

---

## 7. قائمة تحقق نهائية قبل النشر

- [ ] كل الصور في `client/public/images/` والمسارات بصيغة `images/xxx.jpg`
- [ ] لا يوجد أي `manus-storage` في `portfolio.ts` ولا في `index.html`
- [ ] روابط GitHub و LinkedIn والبريد حقيقية (لا `your-username`)
- [ ] زر المشروع يفتح الرابط فعلًا (`<a href>`)
- [ ] النصوص التجريبية محذوفة من `Home.tsx` و `portfolio.ts`
- [ ] `pnpm check` يمرّ بدون أخطاء
- [ ] `pnpm build` ينجح
- [ ] المعاينة على الجوال (عرض 390px) سليمة
- [ ] `.github/workflows/deploy.yml` موجود
- [ ] `base` مضبوط إذا كان النشر على نطاق فرعي

---

## 8. الخلاصة

**الحكم:** الموقع **أفضل من 90% من البورتفوليوهات الشخصية** من حيث التصميم والإتقان العربي تحديدًا. الفكرة التحريرية منفّذة بإتقان، ونظام الألوان متماسك، وRTL صحيح تقنيًا لا شكلًا.

**ما ينقصه:** الموقع جاهز للنظر، وليس جاهزًا للنشر. ثلاث مشاكل فقط تفصله عن نشر نظيف:
1. **الصور** — تُحل بنقلها إلى `client/public/images/` (5 دقائق).
2. **زر الرابط** — يُحل بتغيير `button` إلى `a` (دقيقة واحدة).
3. **ملف النشر** — يُحل بإنشاء `.github/workflows/deploy.yml` (نسخ من القسم 6).

بعدها الموقع جاهز لإضافة مشروعك مباشرة بخطوة واحدة في ملف البيانات.

---

*ملاحظة: هذه المراجعة مبنية على قراءة الكود مباشرةً. لم أشغّل الموقع بصريًا في هذه الجلسة، لذا التوصيات أعلاه قائمة على تحليل الشيفرة وليست على معاينة بصرية.*

---

## 9. سجل الإصلاحات المنفَّذة (22 أكتوبر 2026)

### المشكلة 1 — الصور المكسورة ✅

**ما تم:**
- أُنشئ المجلد `client/public/images/` وخُزّنت فيه خمس صور بصيغة JPEG:
  `mark.jpg` (512×512) و `hero.jpg` (1600×1200) و `project-1.jpg` / `project-2.jpg` / `project-3.jpg` (1600×1200 بنسبة 4:3).
- الصور مولّدة بألوان الموقع نفسها (ورق كريمي، حبر فحمي، أخضر زيتوني، مرجاني) وهي **صور مؤقتة** — استبدلها بصورك الحقيقية بنفس الأسماء.
- حُدِّثت المسارات في `client/src/data/portfolio.ts`:
  - `heroImage: "images/hero.jpg"`
  - `markImage: "images/mark.jpg"`
  - `image: "images/project-1.jpg"` / `2` / `3`
- حُدِّث أيقونة الموقع في `client/index.html` إلى `<link rel="icon" href="%BASE_URL%images/mark.jpg" />`.
- حُذفت حالة `/manus-storage/` من دالة `imageUrl()` في `Home.tsx`، فلا يعود هناك أي اعتماد على مسار تطوير مؤقت.

**النتيجة:** لا يوجد أي ذكر لـ `manus-storage` في الشيفرة المبنية (تم التحقق).

### المشكلة 2 — رابط المشروع غير فعّال ✅

**ما تم:** في `Home.tsx` أصبح زر المشروع رابطًا حقيقيًا:

```tsx
{project.link ? (
  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
    {copy.viewProject}<MoveUpRight size={17} />
  </a>
) : (
  <button className="project-link" onClick={showProjectHint}>
    {copy.viewProject}<MoveUpRight size={17} />
  </button>
)}
```

- يفتح الرابط في تبويب جديد مع `rel="noreferrer"`.
- يبقى الزر البديل يظهر إشعارًا مفيدًا **فقط** إذا كان `link` فارغًا — فلا يختفي السلوك المفيد.
- نصوص experimentale أُزيلت: `«رابط تجريبي» ← «مشاهدة المشروع»` و `«روابط تجريبية» ← «روابط التواصل»`.

**النتيجة:** تم التحقق في الحزمة المبنية: `href:M.link, target:"_blank", rel:"noreferrer"`.

### المشكلة 3 — ملف النشر مفقود ✅

**ما تم:** أُنشئ `.github/workflows/deploy.yml` كاملًا مع:
- تهيئة pnnpm بإصدار `10.4.1` مطابقًا تمامًا لحقل `packageManager`.
- خطوة `actions/configure-pages@v5` لتحديد مسار النشر تلقائيًا.
- تمرير `BASE_PATH` إلى البناء (يكون `/` لموقع مستخدم، و`/<اسم-المستودع>/` لمشروع).
- رفع `dist/public` ونشره عبر `actions/deploy-pages@v4`.

### إصلاحات إضافية (لأن النشر كان سيتأثر بها)

1. **دعم المسارات الفرعية** — أُضيف `base: process.env.BASE_PATH || "/"` إلى `vite.config.ts`.
   بدونه كان النشر على `user.github.io/repo/` سيكسر كل المسارات.
2. **وسم التحليلات المكسور** — حُذف وسم `%VITE_ANALYTICS_ENDPOINT%/umami` لأنه كان يُنتج طلب 404 في كل زيارة. بقي كتعليق توضيحي في `index.html`.
3. **حجم HTML** — كانت بيئة Manus تضيف **359 كيلوبايت** من كود المعاينة داخل `index.html`. أُضيف `GITHUB_PAGES=true` في ملف النشر لاستبعادها، فانخفض الحجم إلى **1.01 كيلوبايت**.
4. **`pnpm install` كان يفشل محليًا** — لأن `C:\lol\pnpm-workspace.yaml` في المجلد الأعلى لا يحتوي على `packages`. أُضيف `portfolio/pnpm-workspace.yaml` بـ `packages: []` ليجعل المشروع مستقلًا.
5. **سكربتات البناء** — أُضيف `pnpm.onlyBuiltDependencies` إلى `package.json` للسماح لـ `esbuild` و `@tailwindcss/oxide` بتشغيل خطوات التثبيت.
6. **اتجاه التحويم في RTL** — كان `translateX(-3px)` يتحرك يسارًا في العربية. أُضيفت قاعدة `html[dir="rtl"]` لكل من `.project-link` و `.contact-links a`.

### نتائج التحقق

| الاختبار | النتيجة |
|---|---|
| `pnpm check` (tsc --noEmit) | ✅ بلا أخطاء |
| `pnpm install --frozen-lockfile` | ✅ ناجح (الملف القفل متزامن) |
| `pnpm build` | ✅ ناجح بلا تحذيرات |
| `BASE_PATH=/portfolio-demo/` | ✅ المسارات كلها أصبحت `/portfolio-demo/...` |
| تشغيل خادم الإنتاج | ✅ الصفحة 200، والصور الخمس 200 من نوع `image/jpeg` |
| بحث `manus-storage` في الحزمة المبنية | ✅ صفر نتيجة |
| بحث `manus-runtime` في `index.html` المبني | ✅ صفر نتيجة |

### ما يبقى عليك

- [ ] استبدال الصور الخمس بصورك الحقيقية (نفس الأسماء، أو عدّل المسارات في `portfolio.ts`)
- [ ] وضع روابط GitHub و LinkedIn والبريد الحقيقية
- [ ] إضافة مشاريعك في `portfolio.ts`
- [ ] في GitHub: **Settings → Pages → Source → GitHub Actions**
