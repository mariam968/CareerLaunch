import { useEffect, useState } from 'react'
import InternshipCard from '../components/InternshipCard'

function Dashboard() {
  const [greeting, setGreeting] = useState('Good morning')

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning')
      } else if (hour >= 12 && hour < 17) {
        setGreeting('Good afternoon')
      } else {
        setGreeting('Good evening')
      }
    }

    updateGreeting()

    const interval = setInterval(updateGreeting, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          {greeting}, Mariam 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Find opportunities that launch your career.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* Applications */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Applications
            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              📄
            </div>
          </div>

          <h3 className="mt-4 text-3xl font-bold text-slate-900">
            12
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Total applications
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              ⏳
            </div>
          </div>

          <h3 className="mt-4 text-3xl font-bold text-slate-900">
            5
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Applications awaiting review
          </p>
        </div>

        {/* Interviews */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Interviews
            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              ✓
            </div>
          </div>

          <h3 className="mt-4 text-3xl font-bold text-slate-900">
            2
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Interviews scheduled
          </p>
        </div>

      </div>

      {/* Recommended internships */}
      <section className="mt-10">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Recommended Internships
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Opportunities that may be a good match for you.
            </p>
          </div>

          <button className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:text-blue-700">
            View all →
          </button>

        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          <InternshipCard
            title="Software Developer Intern"
            company="TechNova Uganda"
            location="Kampala"
            type="Full-time"
          />

          <InternshipCard
            title="Frontend Developer Intern"
            company="Digital Solutions Ltd"
            location="Kampala"
            type="Hybrid"
          />

        </div>

      </section>

    </div>
  )
}

export default Dashboard