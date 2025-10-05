'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Plus, Trash2, ExternalLink, Save } from 'lucide-react'

interface PinterestBoard {
  name: string
  url: string
}

interface PinterestProfileManagerProps {
  initialProfile?: string
  initialBoards?: PinterestBoard[]
  onSave?: (data: { pinterestProfile: string; pinterestBoards: PinterestBoard[] }) => Promise<void>
}

export function PinterestProfileManager({
  initialProfile = '',
  initialBoards = [],
  onSave
}: PinterestProfileManagerProps) {
  const [pinterestProfile, setPinterestProfile] = useState(initialProfile)
  const [boards, setBoards] = useState<PinterestBoard[]>(initialBoards)
  const [newBoardName, setNewBoardName] = useState('')
  const [newBoardUrl, setNewBoardUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const addBoard = () => {
    if (!newBoardName.trim() || !newBoardUrl.trim()) return

    setBoards([...boards, { name: newBoardName.trim(), url: newBoardUrl.trim() }])
    setNewBoardName('')
    setNewBoardUrl('')
  }

  const removeBoard = (index: number) => {
    setBoards(boards.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (onSave) {
        await onSave({ pinterestProfile, pinterestBoards: boards })
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-white fill-current" />
          </div>
          <div>
            <CardTitle className="text-2xl">Pinterest Integration</CardTitle>
            <CardDescription>Connect your Pinterest profile to share automotive resources</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pinterest Profile URL */}
        <div className="space-y-2">
          <Label htmlFor="pinterest-profile" className="text-base font-semibold">
            Pinterest Profile URL
          </Label>
          <div className="flex gap-2">
            <Input
              id="pinterest-profile"
              type="url"
              placeholder="https://pinterest.com/yourusername"
              value={pinterestProfile}
              onChange={(e) => setPinterestProfile(e.target.value)}
              className="flex-1 rounded-md"
            />
            {pinterestProfile && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(pinterestProfile, '_blank')}
                className="rounded-md"
                aria-label="Visit Pinterest profile"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Add your Pinterest profile URL to showcase your automotive resources
          </p>
        </div>

        {/* Pinterest Boards */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">Pinterest Boards</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Link specific boards or pins related to automotive repairs and diagnostics
            </p>
          </div>

          {/* Existing Boards */}
          {boards.length > 0 && (
            <div className="space-y-2">
              {boards.map((board, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-md border border-purple-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-purple-900">{board.name}</p>
                    <a
                      href={board.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 hover:underline flex items-center gap-1"
                    >
                      {board.url}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBoard(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                    aria-label={`Remove ${board.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Board */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-md border border-gray-200">
            <Label className="text-sm font-semibold">Add Board or Pin</Label>
            <div className="space-y-2">
              <Input
                placeholder="Board/Pin name (e.g., Engine Diagnostics)"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && newBoardName.trim() && newBoardUrl.trim() && addBoard()}
                className="rounded-md"
              />
              <Input
                type="url"
                placeholder="Board/Pin URL (https://pinterest.com/...)"
                value={newBoardUrl}
                onChange={(e) => setNewBoardUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && newBoardName.trim() && newBoardUrl.trim() && addBoard()}
                className="rounded-md"
              />
              <Button
                onClick={addBoard}
                disabled={!newBoardName.trim() || !newBoardUrl.trim()}
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 rounded-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Board/Pin
              </Button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-purple-600 hover:bg-purple-700 px-8 rounded-md"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Pinterest Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
