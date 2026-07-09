"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Eye,
  ExternalLink,
  Hammer,
  Play,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Conditionally render text as a link or plain span.
// linkData comes from buildModuleLinkMap; while content/ has no matching articles,
// linkData stays undefined and titles render as plain text (no internal links).
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined;
  children: React.ReactNode;
  className?: string;
  locale: string;
}) {
  if (linkData) {
    const href = locale === "en" ? linkData.url : `/${locale}${linkData.url}`;
    return (
      <Link
        href={href}
        className={`${className || ""} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}

type IconType = React.ComponentType<{ className?: string }>;

// Shared module heading: icon + title (plain text, theme-colored) + intro
function ModuleHeader({
  icon: Icon,
  title,
  intro,
  linkData,
  locale,
}: {
  icon: IconType;
  title: string;
  intro: string;
  linkData: { url: string; title: string } | null | undefined;
  locale: string;
}) {
  return (
    <div className="text-center mb-10 md:mb-14 scroll-reveal">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Icon className="w-8 h-8 text-[hsl(var(--nav-theme-light))]" />
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          <LinkedTitle linkData={linkData} locale={locale}>
            {title}
          </LinkedTitle>
        </h2>
      </div>
      <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
        {intro}
      </p>
    </div>
  );
}

// External source link footer for modules that credit official sources.
// (Module 1 intentionally has no sources and never renders this.)
function SourceLinks({
  sources,
}: {
  sources?: { label: string; url: string }[];
}) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-2 scroll-reveal">
      <span className="text-xs font-medium text-muted-foreground mr-1">
        Sources:
      </span>
      {sources.map((s, i) => (
        <a
          key={s.url}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
        >
          {s.label}
          <ExternalLink className="w-3 h-3" />
        </a>
      ))}
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.dunepart3.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Dune Part 3 Wiki",
        description:
          "Dune Part 3 Wiki is a complete fan guide to Dune: Part Three — release date, official trailer, full cast, story, IMAX details, characters, and Dune Messiah connections.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Dune Part Three - Official Movie Guide",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Dune Part 3 Wiki",
        alternateName: "Dune Part 3",
        url: siteUrl,
        description:
          "Dune Part 3 Wiki — a fan resource hub for Dune: Part Three release, trailer, cast, story, IMAX, characters, and Dune Messiah coverage.",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Dune Part 3 Wiki - Official Movie Guide",
        },
        sameAs: [
          "https://www.dunemovie.com/",
          "https://www.instagram.com/dunemovie/",
          "https://x.com/dunemovie",
          "https://www.tiktok.com/@dunemovie",
          "https://www.facebook.com/dune/",
          "https://www.reddit.com/r/dune/",
        ],
      },
      {
        "@type": "Movie",
        name: "Dune: Part Three",
        url: siteUrl,
        description:
          "Dune: Part Three is the epic conclusion to Denis Villeneuve's Dune trilogy, based on Frank Herbert's Dune Messiah, in theaters and IMAX December 18, 2026.",
        genre: ["Action", "Adventure", "Drama", "Sci-Fi"],
        datePublished: "2026-12-18",
        director: {
          "@type": "Person",
          name: "Denis Villeneuve",
        },
        actor: [
          { "@type": "Person", name: "Timothée Chalamet" },
          { "@type": "Person", name: "Zendaya" },
          { "@type": "Person", name: "Jason Momoa" },
          { "@type": "Person", name: "Florence Pugh" },
          { "@type": "Person", name: "Robert Pattinson" },
          { "@type": "Person", name: "Javier Bardem" },
        ],
        image: `${siteUrl}/images/hero.webp`,
        trailer: {
          "@type": "VideoObject",
          name: "Dune: Part Three | Official Teaser Trailer",
          embedUrl: "https://www.youtube.com/embed/3_9vCamtuPY",
          url: "https://www.youtube.com/watch?v=3_9vCamtuPY",
          thumbnailUrl: `${siteUrl}/images/hero.webp`,
        },
      },
      {
        "@type": "VideoObject",
        name: "Dune: Part Three | Official Teaser Trailer",
        description:
          "Official teaser trailer for Dune: Part Three, the epic conclusion to Denis Villeneuve's Dune trilogy, filmed for IMAX and in theaters December 18.",
        uploadDate: "2026-03-17",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/3_9vCamtuPY",
        url: "https://www.youtube.com/watch?v=3_9vCamtuPY",
      },
    ],
  };

  // Plot accordion state
  const [plotExpanded, setPlotExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Tools Grid cards map 1:1 to module section anchors
  const toolsSectionIds = [
    "release-date-and-theaters",
    "trailer-and-official-footage",
    "cast-and-characters",
    "plot-and-dune-messiah-story",
    "paul-and-chani-guide",
    "imax-70mm-tickets",
    "production-and-filming",
    "watch-order-and-recap",
  ];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("official-trailer")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.dunemovie.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section */}
      <section id="official-trailer" className="scroll-mt-24 px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="3_9vCamtuPY"
              title="Dune: Part Three | Official Teaser Trailer"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards (module navigator) */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = toolsSectionIds[index];
              return (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Dune Part 3 Release Date and Theaters (no source links) */}
      <section id="release-date-and-theaters" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Clock}
            title={t.modules.dunePart3ReleaseDate.title}
            intro={t.modules.dunePart3ReleaseDate.intro}
            linkData={moduleLinkMap["dunePart3ReleaseDate"]}
            locale={locale}
          />
          <div className="scroll-reveal grid gap-3 md:gap-4">
            {t.modules.dunePart3ReleaseDate.items.map((row: any, i: number) => (
              <div
                key={row.label}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                  <span className="text-sm font-semibold text-[hsl(var(--nav-theme-light))] md:w-1/3 flex-shrink-0">
                    {row.label}
                  </span>
                  <div className="flex-1 mt-1 md:mt-0">
                    <span className="font-bold text-base md:text-lg">
                      {row.value}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {row.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 2: Dune Part 3 Trailer and Official Footage */}
      <section
        id="trailer-and-official-footage"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Eye}
            title={t.modules.dunePart3Trailer.title}
            intro={t.modules.dunePart3Trailer.intro}
            linkData={moduleLinkMap["dunePart3Trailer"]}
            locale={locale}
          />
          <div className="scroll-reveal grid gap-4 md:grid-cols-2">
            {t.modules.dunePart3Trailer.items.map((v: any, i: number) => (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {v.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {v.releaseWindow}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[hsl(var(--nav-theme-light))] transition-colors">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground">{v.focus}</p>
              </a>
            ))}
          </div>
          <SourceLinks sources={t.modules.dunePart3Trailer.sources} />
        </div>
      </section>

      {/* 广告位 4: 阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 3: Dune Part 3 Cast and Characters */}
      <section id="cast-and-characters" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Users}
            title={t.modules.dunePart3Cast.title}
            intro={t.modules.dunePart3Cast.intro}
            linkData={moduleLinkMap["dunePart3Cast"]}
            locale={locale}
          />
          <div className="scroll-reveal grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.modules.dunePart3Cast.items.map((c: any, i: number) => (
              <div
                key={c.actor}
                className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {c.character}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{c.actor}</h3>
                <p className="text-sm text-muted-foreground">{c.roleSummary}</p>
              </div>
            ))}
          </div>
          <SourceLinks sources={t.modules.dunePart3Cast.sources} />
        </div>
      </section>

      {/* Module 4: Dune Part 3 Plot and Dune Messiah Story */}
      <section
        id="plot-and-dune-messiah-story"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={BookOpen}
            title={t.modules.dunePart3Plot.title}
            intro={t.modules.dunePart3Plot.intro}
            linkData={moduleLinkMap["dunePart3Plot"]}
            locale={locale}
          />
          <div className="scroll-reveal space-y-2 max-w-3xl mx-auto">
            {t.modules.dunePart3Plot.items.map((item: any, i: number) => (
              <div
                key={item.question}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setPlotExpanded(plotExpanded === i ? null : i)
                  }
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${plotExpanded === i ? "rotate-180" : ""}`}
                  />
                </button>
                {plotExpanded === i && (
                  <div className="px-5 pb-5 text-muted-foreground text-sm">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <SourceLinks sources={t.modules.dunePart3Plot.sources} />
        </div>
      </section>

      {/* Module 5: Dune Part 3 Paul and Chani Guide */}
      <section id="paul-and-chani-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Sparkles}
            title={t.modules.dunePart3PaulAndChani.title}
            intro={t.modules.dunePart3PaulAndChani.intro}
            linkData={moduleLinkMap["dunePart3PaulAndChani"]}
            locale={locale}
          />
          <div className="scroll-reveal relative pl-6 md:pl-8 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 md:space-y-8 max-w-3xl mx-auto">
            {t.modules.dunePart3PaulAndChani.items.map((item: any, i: number) => (
              <div key={item.label} className="relative">
                <div className="absolute -left-[1.4rem] md:-left-[1.7rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <span className="text-xs font-semibold text-[hsl(var(--nav-theme-light))] uppercase tracking-wide">
                    {item.label}
                  </span>
                  <h3 className="font-bold text-lg mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.characters.map((ch: string, ci: number) => (
                      <span
                        key={`${ch}-${ci}`}
                        className="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 6: Dune Part 3 IMAX and 70mm Tickets */}
      <section
        id="imax-70mm-tickets"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Star}
            title={t.modules.dunePart3ImaxTickets.title}
            intro={t.modules.dunePart3ImaxTickets.intro}
            linkData={moduleLinkMap["dunePart3ImaxTickets"]}
            locale={locale}
          />
          <div className="scroll-reveal grid gap-3 md:gap-4">
            {t.modules.dunePart3ImaxTickets.items.map((row: any, i: number) => (
              <div
                key={row.format}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-4 mb-2">
                  <span className="font-bold text-base md:text-lg text-[hsl(var(--nav-theme-light))] md:w-1/4 flex-shrink-0">
                    {row.format}
                  </span>
                  <span className="font-semibold md:flex-1">{row.status}</span>
                </div>
                <div className="grid gap-2 mt-2 text-sm text-muted-foreground md:grid-cols-2">
                  <p>
                    <span className="text-foreground/70">Best for: </span>
                    {row.bestFor}
                  </p>
                  <p>
                    <span className="text-foreground/70">Where to check: </span>
                    {row.whereToCheck}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Dune Part 3 Production and Filming */}
      <section id="production-and-filming" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Hammer}
            title={t.modules.dunePart3Production.title}
            intro={t.modules.dunePart3Production.intro}
            linkData={moduleLinkMap["dunePart3Production"]}
            locale={locale}
          />
          <div className="scroll-reveal relative pl-6 md:pl-8 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 md:space-y-8 max-w-3xl mx-auto">
            {t.modules.dunePart3Production.items.map((item: any, i: number) => (
              <div key={item.date} className="relative">
                <div className="absolute -left-[1.4rem] md:-left-[1.7rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {item.date}
                  </span>
                  <h3 className="font-bold text-lg mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.keyPeople.map((p: string, pi: number) => (
                      <span
                        key={`${p}-${pi}`}
                        className="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Dune Part 3 Watch Order and Recap */}
      <section
        id="watch-order-and-recap"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={ArrowRight}
            title={t.modules.dunePart3WatchOrder.title}
            intro={t.modules.dunePart3WatchOrder.intro}
            linkData={moduleLinkMap["dunePart3WatchOrder"]}
            locale={locale}
          />
          <div className="scroll-reveal space-y-4 max-w-3xl mx-auto">
            {t.modules.dunePart3WatchOrder.items.map((item: any, i: number) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                  <span className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.whyItMatters}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.recapFocus.map((r: string, ri: number) => (
                      <span
                        key={`${r}-${ri}`}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)]"
                      >
                        <Check className="w-3 h-3 text-[hsl(var(--nav-theme-light))]" />
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/dunemovie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/dunemovie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/dune/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@dunemovie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
