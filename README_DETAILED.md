# mxnan.com - Portfolio & Component Library

A modern, full-featured portfolio website and interactive component library built with cutting-edge web technologies. This project showcases web development capabilities through a beautiful, performant, and feature-rich site.

**Live Demo:** https://mxnan.vercel.app/

---

## 📋 Table of Contents

- [Tech Stack Overview](#tech-stack-overview)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure-deep-dive)
- [Content Management System](#content-management-system-velite)
- [Component System](#component-system)
- [Routing & Pages](#routing--pages)
- [Styling & Theming](#styling--theming)
- [Forms & Email Integration](#forms--email-integration)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)

---

## 🛠️ Tech Stack Overview

### Core Framework
- **Next.js 14.2.7** - React framework with App Router (SSG, SSR, API routes)
- **React 18** - UI library with latest hooks and concurrency features
- **TypeScript 5** - Type safety and better developer experience

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework with CSS variables for theming
- **Shadcn UI (Radix UI)** - Unstyled, accessible component library
- **Framer Motion 11.3.31** - Advanced animations and page transitions
- **next-view-transitions** - Smooth page transitions using View Transitions API

### Content & Data
- **Velite 0.1.1** - MDX-based static content generation for blogs and components
- **Rehype Plugins:**
  - `rehype-slug` - Auto-generate heading IDs
  - `rehype-pretty-code` - Beautiful syntax highlighting with themes
  - `rehype-autolink-headings` - Auto-link headings for better navigation

### Forms & Validation
- **React Hook Form 7.53.0** - Performant form library with minimal re-renders
- **Zod 3.23.8** - TypeScript-first schema validation
- **@hookform/resolvers 3.9.0** - Integration for Zod with React Hook Form

### Email & Communication
- **EmailJS Browser 4.4.1** - Client-side email sending (no backend required)

### Additional Libraries
- **Lucide React 0.438.0** - Beautiful icon library (438+ icons)
- **Sonner 1.5.0** - Toast notifications (accessible and beautiful)
- **next-themes 0.3.0** - Dark mode management with system preference detection
- **clsx** - Conditional className utilities
- **tailwind-merge** - Merge Tailwind CSS classes with priority handling

### Developer Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformations (Tailwind compilation)
- **Vercel Speed Insights** - Performance monitoring

---

## 🏗️ Project Architecture

### High-Level Data Flow

```
Content (MDX files)
    ↓
Velite (builds to .velite/)
    ↓
Shadcn/Radix UI Components
    ↓
App Router Pages
    ↓
Framer Motion Animations
    ↓
Tailwind CSS Styling
    ↓
Static Site (SSG) or Vercel Deployment
```

### Build Process

1. **Development**: `npm run dev`
   - Next.js dev server starts
   - Velite watches for content changes and rebuilds
   - Changes instantly reflect in the browser

2. **Production**: `npm run build`
   - Velite compiles all MDX content to `.velite/` directory
   - Next.js builds static and dynamic pages
   - Optimizes bundles and generates Static Site Generation (SSG)

### Architecture Patterns

**Server Components (Default)** - Pages and most components use React Server Components for better performance and security.

**Client Components** - Interactive features use `"use client"` directive:
- Forms (with real-time validation)
- Theme toggle
- Mobile navigation
- Animations requiring browser APIs

**Dynamic Imports** - Heavy components use dynamic imports with fallbacks:
```tsx
const BlogCard = dynamic(() => import("@/components/blog-card"), {
  ssr: false,
  loading: () => <BounceLoader />,
});
```

---

## 📂 Project Structure Deep Dive

### Root Level Files

```
├── package.json              # Dependencies & scripts
├── package-lock.json         # Dependency lock file
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration + Velite webpack plugin
├── tailwind.config.ts       # Tailwind CSS configuration with custom colors/themes
├── components.json          # Shadcn UI configuration
├── postcss.config.mjs       # PostCSS configuration (Tailwind/Autoprefixer)
├── velite.config.ts         # Velite configuration (content structure)
├── README.md                # Original README
└── LICENSE                  # Project license
```

### `/app` - Next.js App Router

```
app/
├── layout.tsx              # Root layout (HTML, Providers, Header, Footer)
├── page.tsx                # Home page (loads from MDX content)
├── globals.css             # Global styles (CSS variables, resets)
├── providers.tsx           # Client providers (ThemeProvider)
├── (pages)/               # Route group for organized structure
│   ├── blogs/
│   │   ├── page.tsx       # Blogs listing page
│   │   └── [...slug]/
│   │       └── page.tsx   # Individual blog post pages with dynamic routing
│   ├── components/
│   │   ├── layout.tsx     # Components section layout with sidebar
│   │   ├── page.tsx       # Component categories overview
│   │   └── [category]/
│   │       └── [slug]/
│   │           └── page.tsx # Individual component showcase pages
│   ├── contact/
│   │   └── page.tsx       # Contact page with EmailJS form
│   └── demo/
│       └── page.tsx       # Demo/playground page
└── api/
    └── og/
        └── route.tsx      # Dynamic Open Graph image generation
```

**Key Files Explained:**

- **`layout.tsx`** - Root layout with:
  - Metadata configuration (SEO, OG, Twitter cards)
  - Viewport settings for theme colors
  - ViewTransitions wrapper for smooth page transitions
  - Providers (ThemeProvider, Sonner Toaster, Speed Insights)
  - Header and Footer navigation
  - Main content area with flex layout

- **`page.tsx`** - Home page that:
  - Fetches "components/home" slug from Velite content
  - Renders MDX content with custom components
  - Metadata set to "Home | mxnan"

- **Blogs Structure** - Data-driven approach:
  - List page filters and sorts all blogs
  - Dynamic slug pages generate routes for each blog
  - Uses `generateStaticParams()` for SSG optimization
  - Displays MDX content with syntax highlighting

- **Components Structure** - Nested dynamic routes:
  - Category system (Playground, Blocks, Buttons, Loaders, Text)
  - Each component is an MDX file with preview/code examples
  - Sidebar navigation generated from config

### `/components` - React Components

```
components/
├── blog-card.tsx           # Card component for blog listing
├── form-section.tsx        # EmailJS contact form with validation
├── home-page-hero.tsx      # Home page hero section
├── icons.tsx               # Custom icon components (SVG exports)
├── theme-toggle.tsx        # Dark mode toggle button
├── custom/
│   └── retro-grid.tsx     # Custom animated background grid
├── mdx/                    # MDX rendering components
│   ├── mdx-components.tsx # MDX provider (maps <h1>, <img>, etc.)
│   ├── base-mdx.tsx       # Base wrapper for MDX content
│   ├── component-preview.tsx # Interactive component preview
│   ├── pre-with-copy.tsx  # Code block with copy functionality
│   ├── custom-link.tsx    # Custom link with view transitions
│   ├── callout.tsx        # Callout/alert component
│   ├── collapsible-codeblock.tsx # Expandable code blocks
│   ├── mdx-card.tsx       # Card wrapper for MDX content
│   ├── toc.tsx            # Table of contents from headings
│   ├── video-from-src.tsx # Video embedding
│   └── progress-bar.tsx   # Reading progress indicator
├── navigation/
│   ├── header.tsx         # Sticky header with logo and nav
│   ├── top-nav.tsx        # Desktop navigation menu
│   ├── mobile-nav.tsx     # Mobile hamburger menu
│   ├── footer.tsx         # Site footer with links
│   └── responsive-sidebar.tsx # Sidebar for components section
└── ui/                     # Shadcn UI components
    ├── button.tsx
    ├── label.tsx
    ├── input.tsx
    ├── sonner.tsx         # Toast wrapper
    ├── bounce-loader.tsx  # Custom loading animation
    └── ... (other shadcn components)
```

**Component Details:**

- **`form-section.tsx`** - Contact form with:
  - React Hook Form for state management
  - Zod validation schema (firstname, lastname, email)
  - EmailJS integration for sending emails
  - Toast notifications (success/error)
  - Framer Motion animated button states (loading, success)
  - Gradient divider separator

- **`mdx/` Components** - Enable rich content in MDX:
  - `mdx-components.tsx` exports an object mapping HTML tags to custom components
  - `component-preview.tsx` renders live component previews from code
  - `pre-with-copy.tsx` enhances code blocks with copy buttons
  - `toc.tsx` auto-generates table of contents from headings

### `/content` - MDX Content Files

```
content/
├── blogs/                  # Blog posts (MDX files)
│   ├── slug-format-date.mdx
│   └── ...
└── components/            # Component documentation (MDX files)
    ├── home.mdx          # Home page content
    ├── playground/
    │   ├── image-card.mdx
    │   ├── particles.mdx
    │   └── blur-vignette.mdx
    ├── blocks/
    │   ├── gallery.mdx
    │   ├── pixel.mdx
    │   └── accordion.mdx
    ├── buttons/
    │   ├── hover-reveal.mdx
    │   └── magnet.mdx
    ├── loaders/
    │   ├── spin.mdx
    │   └── shuriken.mdx
    └── text/
        ├── bubble.mdx
        └── fade.mdx
```

**MDX File Format Example:**

```mdx
---
title: Component Title
description: Brief description
category: buttons
tags: [animation, interactive]
date: 2024-01-15
status: published
---

# Component Overview

Content with **markdown** formatting.

## Features
- Feature 1
- Feature 2

<ComponentPreview componentName="HoverReveal" />
```

### `/hooks` - Custom React Hooks

```
hooks/
├── use-mounted.ts      # Determines if component is mounted (hydration)
└── use-dimension.ts    # Get element dimensions and window size
```

**Hook Implementations:**

- **`use-mounted.ts`** - Prevents hydration mismatch:
  ```tsx
  export const useMounted = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
  };
  ```

- **`use-dimension.ts`** - Get responsive dimensions:
  ```tsx
  export const useDimension = () => {
    const [dimension, setDimension] = useState({});
    useEffect(() => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, []);
    return dimension;
  };
  ```

### `/lib` - Utilities & Helper Functions

```
lib/
└── utils.ts            # Utility functions used across project
```

**Functions:**

- **`cn(...inputs)`** - Merge Tailwind classes safely
  ```tsx
  cn("px-2", ["py-1"], { "text-red": isError })
  // Prevents conflicts: cn("w-10 w-20") → "w-20"
  ```

- **`formatDate(input)`** - Human-readable date formatting
  ```
  2024-01-01 → "3 months ago"
  2024-02-01 → "2 weeks ago"
  ```

- **`sortBlogs(blogs)`** - Sort blogs by date (newest first)

### `/styles` - Global Styles

```
styles/
└── globals.css         # Global styles and CSS variables
```

Contains:
- CSS custom properties for theming (colors, spacing, radius)
- Global resets and typography
- Animation definitions
- Accessibility utilities

### `/public` - Static Assets

```
public/
├── opengraph-image.png # Default OG image (1200x630)
├── icon1.png
├── icon2.png
├── Anybody-Bold.ttf    # Custom font file
└── static/             # Generated assets from Velite (images, etc.)
    └── ...
```

### `/config` - Configuration Files

```
config/
└── site.ts             # Centralized site configuration
```

**`site.ts` Contents:**

- **Site Metadata**
  ```ts
  name: "mxnan.com"
  description: "Personal website..."
  url: "https://mxnan.com"
  author: "@mxnan"
  ```

- **Navigation Links**
  ```ts
  topNavLinks: [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: "Components", href: "/components" },
    { label: "Contact", href: "/contact" },
  ]
  ```

- **Social Links**
  ```ts
  links: {
    twitter: "https://twitter.com/etc_etcx",
    github: "https://github.com/mxnan",
    linkedin: "https://www.linkedin.com/in/mxnan/",
  }
  ```

- **Component Sidebar Categories** - Auto-generates sidebar navigation structure

### `/showcase` - Demo Components

```
showcase/
├── _components/        # Custom demo components
│   ├── fade-text.tsx
│   └── ...
└── demo/              # Showcase/demo implementations
    └── ...
```

### `/.next`, `/.velite` - Generated Build Directories

- **`.next/`** - Next.js build output (compiled pages, chunks, cache)
- **`.velite/`** - Velite build output (compiled MDX content and types)
  - Auto-generated types for content
  - Processed MDX files with syntax highlighting
  - Asset references

---

## 📝 Content Management System (Velite)

### What is Velite?

Velite is a build-time content generation tool that:
- Compiles MDX files to JavaScript/TypeScript
- Generates static types from content schemas
- Applies remark/rehype plugins for enhancement
- Supports dynamic routing and static generation

### How It Works

1. **Config** (`velite.config.ts`) defines:
   - Content root directory: `content/`
   - Output directory: `.velite/`
   - Collections: `blogs` and `components`

2. **Schema Definition** - Each collection has a Zod schema:

```typescript
// Blogs collection
{
  slug: string          // Path like "blogs/my-post"
  title: string         // Max 20 characters
  description: string   // Max 99 characters (optional)
  date: Date           // ISO date string
  status: "published" | "draft"
  image: string        // Cover image URL (optional)
  tags: string[]       // Array of tags (optional)
  toc: TableOfContents // Auto-generated from headings
  content: MDXContent  // Compiled MDX JSX
  slugAsParams: string // Computed field for routing
}

// Components collection
{
  slug: string
  title: string        // Max 50 characters
  description: string  // Max 200 characters
  category: string     // Extracted from slug path
  tags: string[]
  content: MDXContent
  slugAsParams: string
}
```

3. **Computed Fields** - Add derived data:
```typescript
const computedFields = (data) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});
```

4. **Plugin Pipeline** - Transforms MDX:

```typescript
mdx: {
  rehypePlugins: [
    rehypeSlug,           // Add IDs to headings
    rehypePrettyCode,     // Syntax highlighting (vitesse-black theme)
    rehypeAutoLinkHeadings // Make headings clickable
  ]
}
```

### Generated Types

After build, `.velite/index.ts` exports:

```typescript
export const blogs: Blogs[]  // Array of all published blogs
export const components: Components[]  // Array of all components

export type Blogs = { ... }
export type Components = { ... }
```

**Usage in Pages:**

```tsx
import { blogs, components } from "#site/content"

// Get all blogs
const allBlogs = blogs.filter(b => b.status === "published")

// Find single item
const post = blogs.find(b => b.slug === "blogs/my-post")
```

### Adding New Content

1. Create MDX file in appropriate directory
2. Add frontmatter with required fields
3. Velite auto-detects and builds
4. Access via generated types

---

## 🎨 Component System

### Shadcn UI Integration

**Setup** (`components.json`):
```json
{
  "style": "new-york",     // Component style variant
  "rsc": true,            // React Server Components
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "stone"   // Base color for theme
  }
}
```

**Available Components:**
- Form elements: Button, Input, Label, Select, Textarea
- Layout: Card, Tabs, Collapsible, Dialog, Popover
- Navigation: Drawer, Dropdown Menu
- Feedback: Toast (Sonner), Progress

### Custom Components

**Framer Motion Integration:**

```tsx
// Example: Animated fade text
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Animation Libraries Used:**
- Framer Motion - Spring animations, layout animations
- Tailwind CSS - Utility animations (@keyframes)
- CSS custom properties - Theme transitions

---

## 🛣️ Routing & Pages

### Route Structure

```
/                   → Home page (MDX-based hero)
/blogs              → Blog listing
/blogs/[...slug]    → Individual blog posts
/components         → Component categories
/components/[category]/[slug]  → Individual components
/contact            → Contact form page
/demo               → Demo/playground page
/api/og             → Dynamic OG image generation
```

### Dynamic Route Generation (SSG)

**Blogs Dynamic Route:**

```tsx
// app/(pages)/blogs/[...slug]/page.tsx
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug.split("/").slice(1),
  }));
}

export default async function BlogPage({ params }) {
  const blog = blogs.find(b => b.slug === `blogs/${params.slug.join("/")}`)
  return <MDXContent code={blog.content} />
}
```

### Metadata Generation

Each page exports static or dynamic metadata for SEO:

```tsx
export const metadata = {
  title: "Blogs | mxnan",
  description: "Read my latest blog posts",
  openGraph: {
    title: "Blogs",
    type: "website",
    url: "https://mxnan.vercel.app/blogs",
  },
}
```

---

## 🎯 Styling & Theming

### Tailwind CSS Configuration

**CSS Variables System** (in `globals.css`):

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.6%;
  --card: 0 0% 100%;
  --primary: 0 0% 3.6%;
  --secondary: 0 0% 96.1%;
  --accent: 0 0% 13.9%;
  /* ... more variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    /* ... dark mode overrides */
  }
}
```

**Color System:**

- Primary, Secondary, Accent - Brand colors
- Destructive - Error/warning states
- Muted - Secondary text/disabled states
- Chart colors - Data visualization
- Border, Input, Ring - UI states

### Dark Mode Implementation

**next-themes Configuration:**

```tsx
<ThemeProvider
  attribute="class"           // Use class attribute
  defaultTheme="system"       // Follow OS preference
  enableSystem={true}         // Listen to system changes
  disableTransitionOnChange   // No flash on change
>
  {children}
</ThemeProvider>
```

**Usage:**

```tsx
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </button>
  )
}
```

---

## 📧 Forms & Email Integration

### Contact Form Implementation

**Technology Stack:**
- React Hook Form - Form state ("firstname", "lastname", "email")
- Zod - Validation schema with custom messages
- EmailJS - Send emails directly from browser
- Framer Motion - Animate button state transitions
- Sonner - Toast notifications

**Form Flow:**

```
User Input
    ↓
React Hook Form validates against Zod schema
    ↓
Valid? Send via EmailJS
    ↓
EmailJS sends to configured email address
    ↓
Show success/error toast
    ↓
Reset form on success
```

**Validation Schema:**

```typescript
const formSchema = z.object({
  firstname: z.string().min(3, "Firstname must be at least 3 characters"),
  lastname: z.string().min(2, "Lastname must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
});
```

**EmailJS Configuration:**

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Form States:**

- **Idle** - Button shows "Send ?" with Send icon
- **Submitting** - Shows Loader2 spinner
- **Success** - Shows "Sent !" with MailCheck icon

---

## 🚀 Development Workflow

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Next.js runs on `http://localhost:3000`
   - Velite watches for content changes
   - Hot Module Reloading (HMR) enabled

### Development Commands

```bash
# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Code Style

**ESLint Configuration** (`.eslintrc.json`):
- Enforces Next.js best practices
- React hooks rules
- Import organization

**TypeScript** (`tsconfig.json`):
- Strict mode enabled
- Path aliases configured (`@/`, `#site/`)
- JSX react-jsx for React 17+

### Testing Content Changes

1. **Add Blog:**
   - Create `content/blogs/my-blog.mdx`
   - Velite auto-detects
   - Appears on `/blogs`

2. **Add Component:**
   - Create `content/components/category/component-name.mdx`
   - Update sidebar in `config/site.ts`
   - Appears at `/components/category/component-name`

3. **Edit Home Page:**
   - Edit `content/components/home.mdx`
   - Changes reflected instantly on `/`

---

## 🌐 Deployment

### Vercel (Recommended)

**Process:**
1. Push code to GitHub
2. Vercel auto-detects Next.js project
3. Runs `npm run build` (Velite + Next.js)
4. Deploys static/dynamic content
5. Automatic deployments on git push

**Vercel Speed Insights:**
- Monitors Core Web Vitals
- Shows performance metrics
- Integrated via `SpeedInsights` component

**Custom Domain:**
- Configure in Vercel dashboard
- DNS records auto-setup
- SSL certificate auto-managed

### Static Hosting (Alternative)

Since most content is SSG (Static Site Generation):

```bash
npm run build
# Output: .next/static/ (fully static)
```

Can deploy to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Cloudflare Pages

### Build Output

**Next.js Build Artifacts:**
- `.next/static/` - Static JavaScript bundles
- `.next/server/` - Server-side code
- `.next/cache/` - Build cache

**Velite Output:**
- `.velite/index.ts` - Compiled MDX + types
- `.velite/index.d.ts` - TypeScript declaration

---

## 🔍 Advanced Features

### Dynamic OG Image Generation

**Route:** `app/api/og/route.tsx`

Generates unique Open Graph images dynamically:
- Uses `next/og` (Vercel's OG image library)
- Card-style design with blog title/author
- Cached for performance
- Shared on social media

### Syntax Highlighting

**Implementation:**
- `rehype-pretty-code` plugin
- Theme: `vitesse-black`
- Supports 100+ languages
- Line highlighting and code tabs

### Table of Contents

Auto-generated from MDX headings:
- Click scrolls to section
- Sticky on desktop
- Collapsible on mobile

### Performance Features

- **Image Optimization** - Next.js Image component with LQIP
- **Code Splitting** - Dynamic imports for heavy components
- **Caching** - Vercel's CDN caching strategy
- **Analytics** - Speed Insights integration
- **Bundle Analysis** - Check with `npm install --save-dev webpack-bundle-analyzer`

---

## 📚 File Dependencies Map

```
app/layout.tsx
  ├── app/globals.css
  ├── components/navigation/header.tsx
  ├── components/navigation/footer.tsx
  ├── app/providers.tsx
  │   └── next-themes (ThemeProvider)
  └── components/ui/sonner.tsx

app/(pages)/blogs/page.tsx
  ├── lib/utils.ts (sortBlogs)
  ├── components/blog-card.tsx
  └── #site/content (blogs)

content/blogs/*.mdx
  └── Velite compilation
    ├── rehype-pretty-code (highlighting)
    ├── rehype-slug (IDs)
    └── rehype-autolink-headings

MDX Rendering
  └── components/mdx/mdx-components.tsx
    ├── components/mdx/pre-with-copy.tsx
    ├── components/mdx/custom-link.tsx
    ├── components/mdx/toc.tsx
    ├── lucide-react (Icons)
    └── framer-motion (Animations)
```

---

## ✨ Key Design Patterns

### Composition Pattern
Components are small and composable:
```tsx
// Reusable container
<LabelInputContainer>
  <Label>Name</Label>
  <Input />
</LabelInputContainer>
```

### Render Optimization
- Dynamic imports with loading states
- Server Components by default
- `use client` only where needed
- Memoization for expensive renders

### Type Safety
- Full TypeScript throughout
- Zod schemas for validation
- Generated types from content
- Path aliases for clean imports

### Accessibility
- Semantic HTML (buttons, labels, headings)
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast compliance

---

## 🎓 Learning Resources Used

Based on design patterns from:
- **shadcn/ui** - Component library architecture
- **Taxonomy** - Next.js 13+ patterns
- **Aceternity UI** - Premium animations
- **Magic UI** - Modern component designs

---

## 📝 Notes for Rebuilding

When migrating to the new agent-based architecture:

- **Preserve these concepts:**
   - Velite for content management (or migrate to Keystatic/ContentLayer)
   - Shadcn UI component system
   - Server/Client component split
   - Tailwind CSS styling approach


---

## 📞 Support

For issues or contributions, see the original repository configuration.

---

**Built with 💻 by mxnan**
