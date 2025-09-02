'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { Camera, Edit, Save, X } from 'lucide-react'
import { generateUserInitials } from '@/lib/utils'
import PropTypes from 'prop-types'

export default function ProfilePage() {
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    specialties: [] as string[],
    experienceYears: 0,
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        bio: (user.publicMetadata?.bio as string) || '',
        specialties: (user.publicMetadata?.specialties as string[]) || [],
        experienceYears: (user.publicMetadata?.experienceYears as number) || 0,
      })
    }
  }, [user])

  const handleSave = async () => {
    try {
      await user?.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
      })
      
      await user?.update({
        publicMetadata: {
          bio: formData.bio,
          specialties: formData.specialties,
          experienceYears: formData.experienceYears,
        }
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        bio: (user.publicMetadata?.bio as string) || '',
        specialties: (user.publicMetadata?.specialties as string[]) || [],
        experienceYears: (user.publicMetadata?.experienceYears as number) || 0,
      })
    }
    setIsEditing(false)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Your avatar image
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {generateUserInitials(formData.firstName, formData.lastName)}
                </div>
              )}
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={() => user.setProfileImage({ file: null })}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <ProfileField
                label="First Name"
                value={formData.firstName}
                isEditing={isEditing}
                onChange={(value) => setFormData({ ...formData, firstName: value })}
              />
              <ProfileField
                label="Last Name"
                value={formData.lastName}
                isEditing={isEditing}
                onChange={(value) => setFormData({ ...formData, lastName: value })}
              />
            </div>
            
            <ProfileField
              label="Username"
              value={formData.username}
              isEditing={isEditing}
              onChange={(value) => setFormData({ ...formData, username: value })}
            />
            
            <ProfileField
              label="Bio"
              value={formData.bio}
              isEditing={isEditing}
              onChange={(value) => setFormData({ ...formData, bio: value })}
              multiline
            />
            
            <ProfileField
              label="Years of Experience"
              value={formData.experienceYears.toString()}
              isEditing={isEditing}
              onChange={(value) => setFormData({ ...formData, experienceYears: parseInt(value) || 0 })}
              type="number"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface ProfileFieldProps {
  label: string
  value: string
  isEditing: boolean
  onChange: (value: string) => void
  multiline?: boolean
  type?: string
}

function ProfileField({ label, value, isEditing, onChange, multiline = false, type = "text" }: ProfileFieldProps) {
  if (!isEditing) {
    return (
      <div>
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <p className="mt-1">{value || 'Not specified'}</p>
      </div>
    )
  }

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full px-3 py-2 border rounded-md resize-none h-24"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      )}
    </div>
  )
}

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  type: PropTypes.string,
}