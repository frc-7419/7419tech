'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnnouncementBannerProps {
  show: boolean
  onClose: () => void
}

export function AnnouncementBanner({ show, onClose }: AnnouncementBannerProps) {
  if (!show) return null

  return (
    <div className="bg-primary text-primary-foreground p-4">
      <div className="container flex items-center justify-center">
        <span className="text-sm font-medium">
          Upcoming robotics competition - March 15, 2025
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground ml-4"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
