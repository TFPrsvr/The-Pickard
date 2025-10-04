import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - The Pickard',
  description: 'Terms of Service for The Pickard automotive and powersports mechanics database',
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <p className="text-muted-foreground mb-8"><strong>Last Updated</strong>: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p>
            By accessing or using The Pickard automotive and powersports mechanics database (&quot;Application,&quot; &quot;Service,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;),
            you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
          <p>The Pickard provides:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Automotive and powersports vehicle diagnostics database</li>
            <li>Parts compatibility and interchange information</li>
            <li>Problem and solution documentation</li>
            <li>Expert tips and maintenance guides</li>
            <li>Web search integration for automotive resources</li>
            <li>User account management and saved searches</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Account Creation</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must notify us immediately of any unauthorized access or security breach</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Account Termination</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>You may delete your account at any time through account settings</li>
            <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
            <li>Upon termination, your right to use the Application will immediately cease</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">You Agree To:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Application only for lawful purposes</li>
            <li>Provide accurate information when searching for vehicle data</li>
            <li>Respect intellectual property rights</li>
            <li>Follow professional and ethical standards when using repair information</li>
            <li>Use information for legitimate automotive repair and maintenance purposes</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">You Agree NOT To:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Attempt to gain unauthorized access to the Application or related systems</li>
            <li>Introduce viruses, malware, or harmful code</li>
            <li>Scrape, harvest, or collect user information</li>
            <li>Use automated systems (bots, scrapers) without permission</li>
            <li>Interfere with or disrupt the Application&apos;s operation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
          <p className="mb-4 uppercase font-semibold">
            The Application is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4" role="alert">
            <p className="font-semibold">Automotive Repair Disclaimer</p>
            <p className="mt-2">
              The information provided is for educational and informational purposes only. Always consult professional mechanics
              and follow manufacturer guidelines. We are not responsible for damages resulting from use of this information.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="mb-4">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>We shall not be liable for indirect, incidental, special, consequential, or punitive damages</li>
            <li>We shall not be liable for loss of profits, revenue, data, or use</li>
            <li>Our total liability shall not exceed the amount you paid to use the Application (currently free)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="mb-4">The Application uses third-party services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Clerk</strong> for authentication</li>
            <li><strong>Neon</strong> for database hosting</li>
            <li><strong>Google Custom Search API</strong> for web search</li>
          </ul>
          <p>Your use of these services is subject to their respective terms and privacy policies.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting.
            Your continued use of the Application after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-4">For questions about these Terms:</p>
          <p><strong>Email</strong>: legal@thepickard.com</p>
          <p><strong>Response Time</strong>: We respond to inquiries within 5-7 business days</p>
        </section>

        <section className="mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="font-semibold uppercase">Acknowledgment</p>
            <p className="mt-2">
              By using The Pickard, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <p className="text-sm text-muted-foreground">
            <strong>Effective Date</strong>: {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            These Terms comply with applicable laws including consumer protection, data privacy, and electronic commerce regulations.
          </p>
        </section>
      </article>
    </div>
  )
}
