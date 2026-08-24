import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getInternship } from '../services/internshipApi'

function InternshipDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [internship, setInternship] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadInternship() {
      try {
        setLoading(true)

        const data = await getInternship(id)

        setInternship(data)
        setError('')
      } catch (err) {
        console.error(err)
        setError('Unable to load this internship.')
      } finally {
        setLoading(false)
      }
    }

    loadInternship()
  }, [id])

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">
          Loading internship...
        </p>
      </div>
    )
  }

  if (error || !internship) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
        <h1 className="text-xl font-bold text-red-700">
          Internship not found
        </h1>

        <p className="mt-2 text-sm text-red-600">
          {error || 'This internship does not exist.'}
        </p>

        <Link
          to="/internships"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          Back to internships
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to internships
        </button>

        {/* Internship header */}
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div className="flex gap-4">

              {/* Company logo */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-blue-600">
                {internship.company.charAt(0)}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {internship.title}
                </h1>

                <p className="mt-2 text-slate-500">
                  {internship.company}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {internship.internship_type}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    📍 {internship.location}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {internship.category}
                  </span>

                </div>
              </div>

            </div>

            <Link
              to={`/internships/${internship.id}/apply`}
              className="rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Apply Now
            </Link>

          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          {/* About */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              About the Internship
            </h2>

            <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
              {internship.description}
            </p>
          </section>

          {/* Responsibilities */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Responsibilities
            </h2>

            <div className="mt-4 whitespace-pre-line leading-7 text-slate-600">
              {internship.responsibilities}
            </div>
          </section>

          {/* Requirements */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Requirements
            </h2>

            <div className="mt-4 whitespace-pre-line leading-7 text-slate-600">
              {internship.requirements}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-slate-900">
              Internship Information
            </h2>

            <div className="mt-5 space-y-5">

              <div>
                <p className="text-xs text-slate-400">
                  Company
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {internship.company}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {internship.location}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Internship Type
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {internship.internship_type}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Category
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {internship.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Application Deadline
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {internship.deadline}
                </p>
              </div>

            </div>

            <Link
              to={`/internships/${internship.id}/apply`}
              className="mt-7 block rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-700"
            >
              Apply for this internship
            </Link>

          </div>
        </aside>

      </div>
    </div>
  )
}

export default InternshipDetails