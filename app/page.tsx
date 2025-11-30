import { CountdownTimer } from "@/components/countdown-timer"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <CountdownTimer targetDate="2026-04-18T00:00:00" />
    </main>
  )
}
