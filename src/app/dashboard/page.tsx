import AmbitionsList from '@/components/AmbitionsList'
import TimeTracker from '@/components/TimeTracker'

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <AmbitionsList />
      </div>
      <div className="w-full md:w-1/2">
        <TimeTracker />
      </div>
    </div>
  )
}