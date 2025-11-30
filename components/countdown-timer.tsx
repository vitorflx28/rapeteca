"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Heart, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Can%27t%20Take%20My%20Eyes%20Off%20You%20-%20Frankie%20Valli%20x%20Lauryn%20Hill%20%28Joseph%20Vincent%20Cover%29%20%5BGIG38MD_l3k%5D-UqqLrNaDVMid0R2icTFDVG89kuVw0D.mp3",
    )
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [mounted])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (!mounted) return

    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date()

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, mounted])

  if (!mounted || !timeLeft) {
    return (
      <div className="w-full max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Heart className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-balance">Rapeteca Day</h1>
          <p className="text-lg md:text-xl text-muted-foreground">18 de Abril de 2026</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl text-center space-y-12 animate-in fade-in duration-1000">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={togglePlay}
          size="icon"
          variant="outline"
          className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-primary" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center mb-6">
          <Heart className="w-12 h-12 text-primary animate-pulse" fill="currentColor" />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-balance leading-tight">Rapeteca Day</h1>
        <p className="text-lg md:text-xl text-muted-foreground">18 de Abril de 2026</p>
      </div>

      <div className="relative w-full max-w-md mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 rounded-2xl blur-xl" />
        <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl">
          <Image
            src="/images/88ddb835498390131d2e90a5acf4b925.jpg"
            alt="Romantic couple artwork"
            width={1080}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tabular-nums">{timeLeft.days}</div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">Dias</div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent tabular-nums">{timeLeft.hours}</div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">Horas</div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tabular-nums">
              {timeLeft.minutes}
            </div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">Minutos</div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-sm hover:shadow-lg hover:border-accent/40 transition-all">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent tabular-nums">
              {timeLeft.seconds}
            </div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">Segundos</div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <p className="text-base md:text-lg text-muted-foreground italic max-w-2xl mx-auto">
          You're just too good to be true,
          <br />
          <span className="text-primary font-medium">Can't take my eyes off you</span>
        </p>
      </div>
    </div>
  )
}
