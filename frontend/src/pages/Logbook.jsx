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
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Internship Logbook
        </h1>

        <p className="mt-1 text-slate-500">
          Record your daily activities and track your internship progress.
        </p>
      </div>

      {/* Internship information */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Internship Information
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">

          <div>
            <p className="text-xs text-slate-400">
              Company
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              TechNova Uganda
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Internship
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              Software Developer Intern
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Total Hours
            </p>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {totalHours} hours
            </p>
          </div>

        </div>
      </div>

      {/* Add entry */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold text-slate-900">
          Add Daily Entry
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            {/* Date */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Hours */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Hours Worked
              </label>

              <input
                type="number"
                name="hours"
                min="0"
                max="24"
                value={formData.hours}
                onChange={handleChange}
                required
                placeholder="e.g. 7"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Activity */}
          <div className="mt-5">
            <label className="text-sm font-medium text-slate-700">
              Activities / Work Done
            </label>

            <textarea
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe what you worked on today..."
              className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Add Entry
            </button>
          </div>

        </form>
      </div>

      {/* Entries */}
      <div className="mt-8">

        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Daily Entries
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your internship activities.
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="text-3xl">
              📋
            </div>

            <h3 className="mt-3 font-semibold text-slate-900">
              No entries yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add your first daily internship entry above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                  <div>
                    <p className="text-sm font-semibold text-blue-600">
                      {entry.date}
                    </p>

                    <p className="mt-2 leading-6 text-slate-600">
                      {entry.activity}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                    {entry.hours} hours
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}

export default Logbook