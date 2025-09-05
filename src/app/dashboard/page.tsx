'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AutomotiveWebSearch } from '@/components/automotive-web-search'
import { SearchResult } from '@/lib/web-search'
import { Search, Database, Wrench, Lightbulb, Globe, ArrowRight, Car, Settings } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useUser()

  const handleWebSearchResult = (result: SearchResult) => {
    console.log('Saving search result to database:', result)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">The Pickard</h1>
          <p className="text-gray-600 mt-2">
            The Database made for mechanics by mechanics. The one stop shop to find out about vehicle&apos;s problems both common and not so common and interchangeable parts, upload tips for the next mechanic.
          </p>
        </div>

        {/* Main Actions Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vehicle Search Section */}
          <Link href="/search" className="block">
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:bg-gray-50">
              <CardHeader className="bg-gray-100 border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Car className="h-6 w-6 text-blue-600" />
                  Vehicle Search
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Find vehicle problems and solutions by specific vehicle details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-blue-600">
                  <span className="font-medium">Search Vehicle Database</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Problems Database Section */}
          <Link href="/problems" className="block">
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:bg-gray-50">
              <CardHeader className="bg-gray-100 border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Wrench className="h-6 w-6 text-red-600" />
                  Problems & Solutions
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Browse and search automotive problems by vehicle specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-red-600">
                  <span className="font-medium">Browse Problems Database</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Parts Database Section */}
          <Link href="/database" className="block">
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:bg-gray-50">
              <CardHeader className="bg-gray-100 border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Settings className="h-6 w-6 text-green-600" />
                  Parts Database
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Find interchangeable parts with advanced filtering options
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-green-600">
                  <span className="font-medium">Search Parts Database</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Tips & Knowledge Section */}
          <Link href="/tips" className="block">
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:bg-gray-50">
              <CardHeader className="bg-gray-100 border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                  Expert Tips
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Access expert mechanic tips and share your knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-yellow-600">
                  <span className="font-medium">View Tips & Knowledge</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Web Search Section */}
        <div className="mb-8">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-100 border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Globe className="h-5 w-5 text-purple-600" />
                Web Search
              </CardTitle>
              <CardDescription className="text-gray-600">
                Search the web for automotive repair information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <AutomotiveWebSearch onResultSelect={handleWebSearchResult} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section - Moved to bottom */}
        <div className="mb-8">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-100 border-b border-gray-200">
              <CardTitle className="text-gray-900">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600">
                Your recent database interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <ActivityItem
                  title="Searched for 2019 Ford F-150 transmission problems"
                  time="2 hours ago"
                />
                <ActivityItem
                  title="Saved solution for brake replacement"
                  time="1 day ago"
                />
                <ActivityItem
                  title="Added tip about oil change intervals"
                  time="3 days ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


interface ActivityItemProps {
  title: string
  time: string
}

function ActivityItem({ title, time }: ActivityItemProps) {
  return (
    <div className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
      <p className="text-sm text-gray-700">{title}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  )
}