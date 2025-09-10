'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Award, Clock, MapPin, Phone, Mail, Wrench, Car, Database } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About The Pickard</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Your trusted automotive database and diagnostic center, serving mechanics and vehicle owners 
            with comprehensive repair solutions, parts identification, and expert guidance since day one.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Mission Statement */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto shadow-lg border-0">
            <CardHeader className="bg-white rounded-t-lg">
              <CardTitle className="text-3xl text-blue-600 mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe every vehicle deserves expert care and every mechanic deserves the right tools. 
                The Pickard bridges knowledge gaps with cutting-edge diagnostic databases, comprehensive parts catalogs, 
                and proven repair solutions that keep vehicles running safely and efficiently.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardHeader className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-blue-600">Diagnostic Center</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-600 text-center">
                  Advanced vehicle diagnostics with step-by-step troubleshooting guides for cars, trucks, and 18-wheelers.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardHeader className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-600">Parts Database</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-600 text-center">
                  Comprehensive parts catalog with compatibility matching and interchangeable alternatives.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardHeader className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-orange-600">Expert Solutions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-600 text-center">
                  Proven repair procedures, technical bulletins, and professional tips from certified mechanics.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose The Pickard?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Certified Expertise</h3>
              <p className="text-gray-600 text-sm">ASE certified technicians and verified repair procedures</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Always Available</h3>
              <p className="text-gray-600 text-sm">24/7 database access with emergency diagnostic support</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-gray-600 text-sm">Built by mechanics, for mechanics and vehicle owners</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Comprehensive Data</h3>
              <p className="text-gray-600 text-sm">Extensive database covering all vehicle types and years</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Expertise</h2>
          <Card className="shadow-lg border-0 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Professional Automotive Team</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                  The Pickard database is built and maintained by a dedicated team of ASE certified automotive technicians, 
                  database specialists, and technical writers. Our combined decades of experience across all vehicle types 
                  ensures accurate, up-to-date diagnostic information and repair procedures for mechanics worldwide.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">ASE</div>
                    <div className="text-sm text-gray-600">Certified Team</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Support Available</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Technical Support</h3>
              <p className="text-gray-600 mb-2">Emergency diagnostics available 24/7</p>
              <p className="text-blue-600 font-semibold text-lg">(555) PICKARD</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                Contact Support
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-gray-600 mb-2">Get detailed technical assistance</p>
              <p className="text-green-600 font-semibold">support@thepickard.com</p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Send Message
              </Button>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              <strong>Online Database Access:</strong> Available 24/7 for registered users<br/>
              <strong>Emergency Support:</strong> Call anytime for critical diagnostic assistance
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of mechanics and vehicle owners who trust The Pickard for reliable automotive solutions.
          </p>
          <div className="space-x-4">
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <Link href="/sign-up">Register Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
              <Link href="/search">Try Diagnostic Center</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}