'use client'

import { useState, useEffect, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Send } from 'lucide-react'

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

function emailjsErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'text' in err) {
    try {
      const raw = (err as { text: string }).text
      const parsed = JSON.parse(raw) as { message?: string; text?: string }
      return parsed.message || parsed.text || raw
    } catch {
      return String((err as { text: string }).text)
    }
  }
  if (err instanceof Error) return err.message
  return 'Something went wrong.'
}

export function ContactForm() {
  const { toast } = useToast()
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  })

  const configured = Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID)

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init({ publicKey: PUBLIC_KEY })
    }
  }, [PUBLIC_KEY])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!configured || !PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      toast({
        title: 'Contact form unavailable',
        description: 'Email is not configured yet. Please set EmailJS environment variables.',
        variant: 'destructive',
      })
      return
    }

    setSending(true)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.from_name.trim(),
          from_email: form.from_email.trim(),
          subject: form.subject.trim() || 'Message from 7419.tech contact form',
          message: form.message.trim(),
          to_email: 'qls7419leadership@gmail.com',
        },
        { publicKey: PUBLIC_KEY }
      )

      toast({
        title: 'Message sent',
        description: 'Thanks — we will get back to you soon.',
      })
      setForm({ from_name: '', from_email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      const detail = emailjsErrorMessage(err)
      toast({
        title: 'Could not send',
        description: detail,
        variant: 'destructive',
      })
    } finally {
      setSending(false)
    }
  }

  if (!configured) {
    return (
      <div className="mx-auto w-full max-w-xl rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100 text-center sm:text-left">
        <p className="font-medium">Contact form is not configured on this deployment.</p>
        <p className="mt-1 text-amber-100/80">
          Add <code className="rounded bg-black/20 px-1">NEXT_PUBLIC_EMAILJS_PUBLIC_KEY</code>,{' '}
          <code className="rounded bg-black/20 px-1">NEXT_PUBLIC_EMAILJS_SERVICE_ID</code>, and{' '}
          <code className="rounded bg-black/20 px-1">NEXT_PUBLIC_EMAILJS_TEMPLATE_ID</code> to your environment
          (see EmailJS dashboard). You can still reach us at{' '}
          <a href="mailto:qls7419leadership@gmail.com" className="underline">
            qls7419leadership@gmail.com
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl space-y-5 text-left">
      <div className="space-y-2">
        <label htmlFor="from_name" className="block text-sm font-medium text-gray-200">
          Name <span className="text-red-400">*</span>
        </label>
        <Input
          id="from_name"
          name="from_name"
          required
          autoComplete="name"
          value={form.from_name}
          onChange={(e) => setForm((f) => ({ ...f, from_name: e.target.value }))}
          className="border-white/20 bg-white/10 text-white placeholder:text-gray-400"
          placeholder="Your name"
          disabled={sending}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="from_email" className="block text-sm font-medium text-gray-200">
          Email <span className="text-red-400">*</span>
        </label>
        <Input
          id="from_email"
          name="from_email"
          type="email"
          required
          autoComplete="email"
          value={form.from_email}
          onChange={(e) => setForm((f) => ({ ...f, from_email: e.target.value }))}
          className="border-white/20 bg-white/10 text-white placeholder:text-gray-400"
          placeholder="you@example.com"
          disabled={sending}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-200">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="border-white/20 bg-white/10 text-white placeholder:text-gray-400"
          placeholder="Optional"
          disabled={sending}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-200">
          Message <span className="text-red-400">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="border-white/20 bg-white/10 text-white placeholder:text-gray-400 resize-y min-h-[140px]"
          placeholder="How can we help?"
          disabled={sending}
        />
      </div>
      <div className="flex w-full justify-center">
        <Button
          type="submit"
          disabled={sending}
          className="w-full bg-[#ffc14a] text-[#11224e] hover:bg-[#ffcd6b] sm:w-auto sm:min-w-[200px] sm:px-8"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
