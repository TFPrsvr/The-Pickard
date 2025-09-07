'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import PropTypes from 'prop-types'

interface ContactFormProps {
  title?: string
  description?: string
}

export function ContactForm({ title = "Contact Us", description = "Send us a message and we'll get back to you soon" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call - replace with actual email service
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message

  return (
    <Card className="shadow-lg border-0 max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Mail className="h-6 w-6" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-blue-100 mt-2">{description}</p>
        )}
      </CardHeader>
      <CardContent className="p-6">
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-green-800 font-medium">Message sent successfully!</p>
              <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-red-800 font-medium">Failed to send message</p>
              <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Subject *
              </label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diagnostic-help">Diagnostic Help</SelectItem>
                  <SelectItem value="parts-inquiry">Parts Inquiry</SelectItem>
                  <SelectItem value="technical-support">Technical Support</SelectItem>
                  <SelectItem value="account-issue">Account Issue</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message *
            </label>
            <Textarea
              id="message"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              rows={5}
              className="border-gray-300 focus:border-blue-500 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Need immediate help? Call us at{' '}
            <span className="font-semibold text-blue-600">(555) 123-AUTO</span> or email{' '}
            <span className="font-semibold text-blue-600">support@thepickard.com</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

ContactForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}