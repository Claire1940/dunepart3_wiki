import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dunepart3.wiki'
  const path = '/about'

  return {
    title: 'About Dune Part 3 Wiki - Your Ultimate Dune Part Three Fan Guide',
    description: 'Learn about Dune Part 3 Wiki, a community-driven fan resource hub providing comprehensive guides, release date info, trailer coverage, cast details, story analysis, and IMAX information for Dune: Part Three.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Dune Part 3 Wiki',
      title: 'About Dune Part 3 Wiki',
      description: 'Learn about our mission to provide the best Dune: Part Three fan resources and guides.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'Dune Part 3 Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Dune Part 3 Wiki',
      description: 'Learn about our mission to provide the best Dune: Part Three fan resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Dune Part 3 Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for Dune: Part Three
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Dune Part 3 Wiki</h2>
            <p>
              Dune Part 3 Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping fans
              explore the film &ldquo;Dune: Part Three&rdquo;. We are a community-driven platform that provides comprehensive
              release date coverage, trailer breakdowns, cast and character guides, story analysis, and premium format
              information to enhance your journey back to Arrakis.
            </p>
            <p>
              Whether you&rsquo;re a longtime reader of Frank Herbert&rsquo;s novels counting down to the premiere or a
              newcomer drawn in by Denis Villeneuve&rsquo;s cinematic vision, Dune Part 3 Wiki is here to support you every
              step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower Dune fans with accurate, up-to-date information
              and a rich knowledge base</strong> that helps them fully experience the film. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest release date shifts, casting news, trailer drops, and production updates</li>
              <li><strong>Build useful guides:</strong> Develop character profiles, story analyses, watch-order guides, and Dune Messiah connections that help fans go deeper</li>
              <li><strong>Foster community:</strong> Create a welcoming space where fans can learn, share theories, and celebrate the saga together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for fans of all levels of familiarity with the Dune universe</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Dune Part 3 Wiki as the <strong>go-to destination</strong> for every Dune fan seeking
              to deepen their understanding of Part Three. We want to be the resource that fans trust and rely on,
              whether they need cast details, want to decode a trailer frame-by-frame, or are looking for IMAX
              showtime information and premium format comparisons.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎟️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release Date &amp; Showtimes</h3>
              <p className="text-slate-300">
                Up-to-date release date coverage, theatrical rollout schedules, and availability info
                across regions. Never miss the premiere of Dune: Part Three.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Trailer Coverage</h3>
              <p className="text-slate-300">
                Official trailer and teaser breakdowns, frame-by-frame analysis, and Easter eggs.
                Catch every detail hidden in each new Dune: Part Three trailer drop.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-2">Cast &amp; Characters</h3>
              <p className="text-slate-300">
                Complete cast profiles and character guides covering Paul Atreides, Chani, Lady Jessica,
                and the full ensemble. Know the players shaping the saga&rsquo;s conclusion.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📖</div>
              <h3 className="text-xl font-semibold text-white mb-2">Story &amp; Timeline</h3>
              <p className="text-slate-300">
                Story analysis, plot predictions, and watch-order guides connecting Dune: Part One,
                Part Two, and Part Three. Navigate the saga&rsquo;s epic timeline with clarity.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎥</div>
              <h3 className="text-xl font-semibold text-white mb-2">IMAX &amp; Premium Formats</h3>
              <p className="text-slate-300">
                IMAX, 70mm, and premium format availability and comparisons so you can experience
                Villeneuve&rsquo;s vision the way it was meant to be seen.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🏜️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Dune Messiah Connections</h3>
              <p className="text-slate-300">
                Deep dives into how Dune: Part Three adapts Frank Herbert&rsquo;s &ldquo;Dune Messiah&rdquo;,
                connecting book lore to the screen for readers and newcomers alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Dune Part 3 Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from fans of all levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Fan feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> Trailer breakdowns, theories, and details spotted by eagle-eyed fans</li>
              <li><strong>Official news:</strong> We monitor Warner Bros. Pictures and Legendary announcements and update our content accordingly</li>
              <li><strong>Book lore:</strong> We connect Herbert&rsquo;s novels to the films, enriching the experience for readers</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you&rsquo;ve decoded a trailer frame, uncovered a casting rumor,
              or have suggestions for new guides, we&rsquo;d love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Dune Part 3 Wiki is maintained by a dedicated team of passionate film fans and writers who love
              the Dune saga as much as you do. We&rsquo;re fans first, constantly dissecting trailers, revisiting the
              novels, and staying updated with the latest production news.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Film analysis:</strong> Deep understanding of Villeneuve&rsquo;s Dune films and their cinematic craft</li>
              <li><strong>Literary background:</strong> Familiarity with Frank Herbert&rsquo;s novels and the broader Dune universe</li>
              <li><strong>Content creation:</strong> Writing clear, engaging guides and breakdowns for fans</li>
              <li><strong>Community management:</strong> Listening to fan feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: &ldquo;Arrakis&rdquo; &ndash; Walking the desert together, one grain of spice at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Dune Part 3 Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with Warner Bros. Pictures, Legendary Pictures, Denis Villeneuve, or the
              estate of Frank Herbert (author of the original Dune novels), or the rights holders of Dune: Part Three.
            </p>
            <p>
              All movie content, trademarks, characters, and assets are the property of their respective owners.
              We use movie-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Dune Part 3 Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We&rsquo;d love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@dunepart3.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@dunepart3.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@dunepart3.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@dunepart3.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@dunepart3.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@dunepart3.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@dunepart3.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@dunepart3.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest guides, trailer breakdowns, and Dune: Part Three news.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
