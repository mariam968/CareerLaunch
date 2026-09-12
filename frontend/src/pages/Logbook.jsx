import { useState } from 'react'

function Logbook() {
  const [entries, setEntries] = useState([])

  const [formData, setFormData] = useState({
    date: '',
    activity: '',
    hours: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newEntry = {
      id: Date.now(),
      date: formData.date,
      activity: formData.activity,
      hours: Number(formData.hours),
    }

    setEntries((previous) => [
      newEntry,
      ...previous,
    ])

    setFormData({
      date: '',
      activity: '',
      hours: '',
    })
  }

  const totalHours = entries.reduce(
    (total, entry) => total + entry.hours,
    0
  )

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-blue-600 shadow-sm">

          <div className="px-6 py-7 sm:px-8">

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                📋
              </div>

              <div>
                <p className="text-sm font-medium text-blue-100">
                  CareerLaunch Internship Tracker
                </p>

                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  Internship Logbook
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                  Record your daily activities, track your working hours,
                  and keep a clear record of your internship experience.
                </p>
              </div>

            </div>

          </div>

          <div className="h-1 bg-blue-700" />

        </div>

        {/* Internship Information */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                💼
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Internship Information
                </h2>

                <p className="text-sm text-slate-500">
                  Overview of your current internship.
                </p>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-3">

            {/* Company */}
            <div className="rounded-xl bg-slate-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-sm">
                  🏢
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Company
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    TechNova Uganda
                  </p>
                </div>

              </div>

            </div>

            {/* Internship */}
            <div className="rounded-xl bg-slate-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-sm">
                  💻
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Internship
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    Software Developer Intern
                  </p>
                </div>

              </div>

            </div>

            {/* Total Hours */}
            <div className="rounded-xl bg-blue-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">
                  ⏱️
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                    Total Hours
                  </p>

                  <p className="mt-1 text-lg font-bold text-blue-700">
                    {totalHours} hours
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Add Entry */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                ➕
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add Daily Entry
                </h2>

                <p className="text-sm text-slate-500">
                  Record what you worked on today.
                </p>
              </div>

            </div>

          </div>

          <div className="p-6 sm:p-8">

            <form onSubmit={handleSubmit}>

              {/* Date and Hours */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Date */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Date
                  </label>

                  <div className="relative mt-2">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                      📅
                    </span>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>
                </div>

                {/* Hours */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Hours Worked
                  </label>

                  <div className="relative mt-2">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                      ⏰
                    </span>

                    <input
                      type="number"
                      name="hours"
                      min="0"
                      max="24"
                      value={formData.hours}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 7"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>
                </div>

              </div>

              {/* Activity */}
              <div className="mt-5">

                <label className="text-sm font-semibold text-slate-700">
                  Activities / Work Done
                </label>

                <textarea
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Describe what you worked on today..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Include important tasks, skills practiced, meetings,
                  or lessons learned.
                </p>

              </div>

              {/* Submit */}
              <div className="mt-6 flex justify-end">

                <button
                  type="submit"
                  className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                  Add Entry →
                </button>

              </div>

            </form>

          </div>

        </div>

        {/* Daily Entries */}
        <div className="mt-8">

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Daily Entries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your recorded internship activities.
              </p>
            </div>

            {entries.length > 0 && (
              <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                {entries.length}{' '}
                {entries.length === 1
                  ? 'entry'
                  : 'entries'}
              </div>
            )}

          </div>

          {/* Empty State */}
          {entries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm sm:p-14">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                📋
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No entries yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Start documenting your internship experience by
                adding your first daily entry above.
              </p>

            </div>
          ) : (

            /* Entries */
            <div className="space-y-4">

              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >

                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                    <div className="flex gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                        📅
                      </div>

                      <div>

                        <p className="text-sm font-bold text-blue-600">
                          {entry.date}
                        </p>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                          {entry.activity}
                        </p>

                      </div>

                    </div>

                    <div className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700">
                      ⏱️ {entry.hours} hours
                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Logbook