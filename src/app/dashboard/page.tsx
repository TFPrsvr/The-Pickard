'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import PropTypes from 'prop-types'

interface ServiceCategory {
  label: string
  description: string
  href: string
  icon: string
  color: string
  bg: string
  border: string
  iconColor: string
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    label: 'Vehicle Search',
    description: 'Search by year, make & model',
    href: '/search-by-category',
    icon: 'fi-rr-car-alt',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Problems & Solutions',
    description: 'Browse known issues & fixes',
    href: '/problems',
    icon: 'fi-rr-wrench',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-600',
  },
  {
    label: 'Parts Database',
    description: 'Find interchangeable parts',
    href: '/parts',
    icon: 'fi-rr-settings',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-600',
  },
  {
    label: 'Expert Tips',
    description: 'Mechanic-shared knowledge',
    href: '/tips',
    icon: 'fi-rr-bulb',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    iconColor: 'text-yellow-600',
  },
  {
    label: 'Parts Finder',
    description: 'Shop & compare parts',
    href: '/parts',
    icon: 'fi-rr-apps',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    iconColor: 'text-orange-600',
  },
  {
    label: 'Repair Guides',
    description: 'Step-by-step procedures',
    href: '/guides',
    icon: 'fi-rr-book-alt',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    iconColor: 'text-indigo-600',
  },
  {
    label: 'Diagrams',
    description: 'Wiring & system diagrams',
    href: '/diagrams',
    icon: 'fi-rr-diagram-project',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    iconColor: 'text-teal-600',
  },
  {
    label: 'Web Search',
    description: 'Search repair resources',
    href: '/search',
    icon: 'fi-rr-search',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    label: 'Web Resources',
    description: 'Forums, manuals & more',
    href: '/search?tab=web',
    icon: 'fi-rr-globe',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    iconColor: 'text-sky-600',
  },
]

interface ServiceTileProps {
  category: ServiceCategory
}

function ServiceTile({ category }: ServiceTileProps) {
  const iconId = `icon-${category.label.toLowerCase().replace(/\s+/g, '-')}`
  const descId = `desc-${category.label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <Link
      href={category.href}
      role="button"
      aria-label={category.label}
      aria-describedby={descId}
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 ${category.border} ${category.bg} p-4 min-h-[120px] min-w-[48px] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      <div
        id={iconId}
        role="img"
        aria-label={`${category.label} icon`}
        className={`flex items-center justify-center w-12 h-12 rounded-full ${category.bg} border ${category.border}`}
      >
        <i className={`fi ${category.icon} text-2xl ${category.iconColor}`} aria-hidden="true" />
      </div>
      <span className={`text-sm font-semibold ${category.color} text-center leading-tight`}>
        {category.label}
      </span>
      <span id={descId} className="text-xs text-gray-500 text-center leading-tight hidden sm:block">
        {category.description}
      </span>
    </Link>
  )
}

ServiceTile.propTypes = {
  category: PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
    border: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
  }).isRequired,
}

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            The database built for mechanics, by mechanics.
          </p>
        </div>

        {/* 3×3 Service Category Matrix */}
        <section aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-base font-semibold text-gray-700 mb-4">
            Services
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {SERVICE_CATEGORIES.map((category) => (
              <ServiceTile key={category.href} category={category} />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section aria-labelledby="activity-heading">
          <h2 id="activity-heading" className="text-base font-semibold text-gray-700 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            <ActivityItem title="Searched for 2019 Ford F-150 transmission problems" time="2 hours ago" />
            <ActivityItem title="Saved solution for brake replacement" time="1 day ago" />
            <ActivityItem title="Added tip about oil change intervals" time="3 days ago" />
          </div>
        </section>

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
    <div className="flex justify-between items-start px-4 py-3">
      <p className="text-sm text-gray-700">{title}</p>
      <p className="text-xs text-gray-400 ml-4 shrink-0">{time}</p>
    </div>
  )
}

ActivityItem.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
}
