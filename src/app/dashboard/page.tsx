'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AutomotiveWebSearch } from '@/components/automotive-web-search'
import { SearchResult } from '@/lib/web-search'
import { Search, Database, Wrench, Lightbulb, Globe, ArrowRight } from 'lucide-react'
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
          <p className="text-gray-600 mt-2">
            Access your automotive database tools and resources
          </p>
        </div>

        {/* Main Actions Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Vehicle Search Section */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-100 border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Search className="h-5 w-5 text-blue-600" />
                Vehicle Search
              </CardTitle>
              <CardDescription className="text-gray-600">
                Find vehicle problems and solutions by specific vehicle details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/search">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search Vehicle Database
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Problems Database Section */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-100 border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Wrench className="h-5 w-5 text-red-600" />
                Problems Database
              </CardTitle>
              <CardDescription className="text-gray-600">
                Browse and search automotive problems by vehicle specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/problems">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Wrench className="h-4 w-4 mr-2" />
                  Browse Problems Database
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Parts Database Section */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-100 border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Database className="h-5 w-5 text-green-600" />
                Parts Database
              </CardTitle>
              <CardDescription className="text-gray-600">
                Find interchangeable parts with advanced filtering options
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/database">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Database className="h-4 w-4 mr-2" />
                  Search Parts Database
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Tips & Knowledge Section */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-100 border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Mechanic Tips
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access expert mechanic tips and share your knowledge
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href="/tips">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  View Tips & Knowledge
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
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