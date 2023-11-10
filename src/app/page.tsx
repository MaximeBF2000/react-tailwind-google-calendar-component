import { Calendar } from './Calendar'

export default function Home() {
  return (
    <div className="w-full h-screen p-20 bg-green-300">
      <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
        <Calendar />
      </div>
    </div>
  )
}
