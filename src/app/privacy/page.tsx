import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - The Pickard',
  description: 'Privacy Policy for The Pickard automotive and powersports mechanics database',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-muted-foreground mb-8"><strong>Last Updated</strong>: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            The Pickard (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates an automotive and powersports mechanics database application.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
          <p>We collect information that you provide directly to us when you:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Create an account (name, email address, username)</li>
            <li>Complete your user profile (bio, specialties, experience level, avatar)</li>
            <li>Save search results or vehicle configurations</li>
            <li>Contact us for support</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
          <p>When you use The Pickard, we automatically collect:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Device information (operating system, browser type, device type)</li>
            <li>Usage data (pages viewed, features accessed, time spent)</li>
            <li>Vehicle search queries and filters</li>
            <li>Parts search history</li>
            <li>Saved web search results</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Cookies and Similar Technologies</h3>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Maintain your login session</li>
            <li>Remember your preferences</li>
            <li>Analyze usage patterns</li>
            <li>Improve application performance</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and maintain the application</li>
            <li>Personalize your experience with vehicle-specific recommendations</li>
            <li>Save your search history and preferences</li>
            <li>Send service-related communications</li>
            <li>Improve application features and functionality</li>
            <li>Analyze usage patterns and trends</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Clerk Authentication</h3>
          <p>
            We use Clerk for secure user authentication and account management. Clerk processes email addresses, names, profile information, and authentication tokens.
          </p>
          <p className="mt-2">
            <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Clerk&apos;s Privacy Policy
            </a>
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Neon Database</h3>
          <p>
            We use Neon for database hosting. User data is stored securely on Neon&apos;s infrastructure.
          </p>
          <p className="mt-2">
            <a href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Neon&apos;s Privacy Policy
            </a>
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">Google Custom Search API</h3>
          <p>
            We use Google Custom Search API for web search functionality. Search queries may be processed by Google.
          </p>
          <p className="mt-2">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Google&apos;s Privacy Policy
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not sell your personal information. We may share information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>With service providers</strong>: Clerk, Neon, and other essential infrastructure providers</li>
            <li><strong>For legal compliance</strong>: When required by law or legal process</li>
            <li><strong>To protect rights</strong>: To protect our rights, property, or safety, or that of others</li>
            <li><strong>With your consent</strong>: When you explicitly authorize data sharing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">Depending on your location, you may have rights to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Access</strong>: Request a copy of your personal data</li>
            <li><strong>Correction</strong>: Update or correct your information</li>
            <li><strong>Deletion</strong>: Request deletion of your account and data</li>
            <li><strong>Portability</strong>: Export your data in a machine-readable format</li>
            <li><strong>Opt-out</strong>: Unsubscribe from marketing communications</li>
            <li><strong>Restriction</strong>: Limit how we process your data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>We implement industry-standard security measures to protect your information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Encryption in transit (HTTPS/TLS)</li>
            <li>Secure authentication (Clerk)</li>
            <li>Regular security audits</li>
            <li>Access controls and monitoring</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">If you have questions about this Privacy Policy or wish to exercise your rights, contact us:</p>
          <p><strong>Email</strong>: privacy@thepickard.com</p>
          <p><strong>Response Time</strong>: We respond to privacy requests within 30 days.</p>
        </section>

        <section className="mb-8">
          <p className="text-sm text-muted-foreground">
            <strong>Effective Date</strong>: {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This Privacy Policy complies with GDPR, CCPA, and other applicable privacy laws.
          </p>
        </section>
      </article>
    </div>
  )
}
