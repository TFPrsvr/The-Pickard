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
          <Card className="max-w-4xl mx-auto shadow-lg border-0 rounded-md">
            <CardHeader className="bg-white rounded-t-md pb-2">
              <CardTitle className="text-3xl text-blue-600">Our Mission</CardTitle>
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
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="h-10 w-10 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Certified Technicians</h3>
                    <p className="text-gray-600">
                      Our team includes ASE certified automotive technicians with decades of hands-on experience 
                      across all vehicle types and systems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="h-10 w-10 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Database Specialists</h3>
                    <p className="text-gray-600">
                      Technical writers and data analysts who ensure our information is accurate, 
                      up-to-date, and easily accessible for quick diagnostics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}