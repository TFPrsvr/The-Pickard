'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Database, Wrench, Lightbulb, User, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s your automotive database dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Recent Searches"
          value="12"
          icon={<Search className="h-6 w-6" />}
          change="+5 this week"
        />
        <StatCard
          title="Saved Problems"
          value="8"
          icon={<Wrench className="h-6 w-6" />}
          change="+2 this week"
        />
        <StatCard
          title="Tips Created"
          value="3"
          icon={<Lightbulb className="h-6 w-6" />}
          change="+1 this week"
        />
        <StatCard
          title="Profile Views"
          value="24"
          icon={<User className="h-6 w-6" />}
          change="+8 this week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you can perform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <QuickAction
              title="Search Database"
              description="Find vehicle problems and solutions"
              href="/search"
              icon={<Search className="h-5 w-5" />}
            />
            <QuickAction
              title="Browse Problems"
              description="View common automotive issues"
              href="/problems"
              icon={<Wrench className="h-5 w-5" />}
            />
            <QuickAction
              title="View Tips"
              description="Access expert mechanic tips"
              href="/tips"
              icon={<Lightbulb className="h-5 w-5" />}
            />
            <QuickAction
              title="Parts Lookup"
              description="Find interchangeable parts"
              href="/database"
              icon={<Database className="h-5 w-5" />}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
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
              <ActivityItem
                title="Updated profile information"
                time="1 week ago"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  change: string
}

function StatCard({ title, value, icon, change }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

interface QuickActionProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

function QuickAction({ title, description, href, icon }: QuickActionProps) {
  return (
    <Link href={href} className="block">
      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
        <div className="text-primary">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}

interface ActivityItemProps {
  title: string
  time: string
}

function ActivityItem({ title, time }: ActivityItemProps) {
  return (
    <div className="flex justify-between items-start">
      <p className="text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  )
}