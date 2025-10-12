'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Lightbulb,
  ArrowLeft,
  Plus,
  X,
  Upload,
  Link as LinkIcon,
  Tag
} from 'lucide-react'
import Link from 'next/link'

export default function CreateTipPage() {
  const router = useRouter()
  const { user, isSignedIn } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')

  const categories = [
    { value: 'tools', label: 'Tools' },
    { value: 'technique', label: 'Technique' },
    { value: 'safety', label: 'Safety' },
    { value: 'time-saver', label: 'Time Saver' },
    { value: 'lesson-learned', label: 'Lesson Learned' }
  ]

  const vehicleTypes = [
    { value: 'car', label: 'Car' },
    { value: 'truck', label: 'Truck' },
    { value: '18-wheeler', label: '18-Wheeler' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'atv', label: 'ATV' },
    { value: 'utv', label: 'UTV' },
    { value: 'snowmobile', label: 'Snowmobile' },
    { value: 'watercraft', label: 'Watercraft' },
    { value: 'rv', label: 'RV' }
  ]

  const handleVehicleTypeToggle = (type: string) => {
    if (selectedVehicleTypes.includes(type)) {
      setSelectedVehicleTypes(selectedVehicleTypes.filter(t => t !== type))
    } else {
      setSelectedVehicleTypes([...selectedVehicleTypes, type])
    }
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim().toLowerCase()])
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSignedIn) {
      alert('You must be signed in to share a tip')
      return
    }

    if (!title.trim() || !description.trim() || !category || selectedVehicleTypes.length === 0) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Implement API call to save tip
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Success - redirect to tips page
      router.push('/tips')
    } catch (error) {
      console.error('Error submitting tip:', error)
      alert('Failed to submit tip. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Redirect if not signed in
  if (!isSignedIn) {
    return (
      <div className="py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 text-center">
            <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sign in to share tips</h2>
            <p className="text-muted-foreground mb-4">
              You need to be signed in to share tips with the community
            </p>
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/tips">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tips
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">Share Your Tip</h1>
        <p className="text-muted-foreground">
          Share your knowledge and help other mechanics learn from your experience
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tip Details</CardTitle>
            <CardDescription>
              Provide information about your tip
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                placeholder="e.g., Quick Oil Change Tool Organization"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                {title.length}/100 characters
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                placeholder="Describe your tip in detail. What problem does it solve? How do you do it? What are the benefits?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground">
                {description.length}/1000 characters
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vehicle Types */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Applies To <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">
                Select all vehicle types this tip applies to
              </p>
              <div className="flex flex-wrap gap-2">
                {vehicleTypes.map((type) => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={selectedVehicleTypes.includes(type.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleVehicleTypeToggle(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
              {selectedVehicleTypes.length === 0 && (
                <p className="text-xs text-red-500">
                  Please select at least one vehicle type
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="tags"
                    placeholder="Add tags (press Enter)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-9"
                  />
                </div>
                <Button type="button" onClick={handleAddTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-muted rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500"
                        aria-label={`Remove ${tag} tag`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Media URL */}
            <div className="space-y-2">
              <label htmlFor="mediaUrl" className="text-sm font-medium">
                Media URL (Optional)
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="mediaUrl"
                  type="url"
                  placeholder="YouTube video URL or image URL"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Add a YouTube video link or image URL to support your tip
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button type="button" variant="outline" asChild>
                <Link href="/tips">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Share Tip
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
