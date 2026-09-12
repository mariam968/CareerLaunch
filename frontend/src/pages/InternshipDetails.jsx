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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="mb-6">
            <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="h-2 bg-blue-600" />

            <div className="p-6 sm:p-8">

              <div className="flex flex-col gap-6 md:flex-row md:items-start">

                <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-slate-200" />

                <div className="flex-1">
                  <div className="h-7 w-2/3 animate-pulse rounded bg-slate-200" />

                  <div className="mt-3 h-4 w-40 animate-pulse rounded bg-slate-200" />

                  <div className="mt-4 flex gap-2">
                    <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-7 w-28 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Loading internship details...
            </p>
          </div>

        </div>
      </div>
    )
  }

  // Error state
  if (error || !internship) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
              !
            </div>

            <h1 className="mt-5 text-xl font-bold text-red-800">
              Internship not found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-600">
              {error || 'This internship does not exist.'}
            </p>

            <Link
              to="/internships"
              className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              ← Back to Internships
            </Link>

          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Back button */}
        <div className="mb-6">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            ← Back to internships
          </button>

        </div>

        {/* Internship Header */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="h-2 bg-blue-600" />

          <div className="p-6 sm:p-8">

            <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">

              <div className="flex min-w-0 gap-5">

                {/* Company Logo */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold uppercase text-white shadow-sm">
                  {internship.company?.charAt(0) || 'C'}
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-blue-600">
                    Internship Opportunity
                  </p>

                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {internship.title}
                  </h1>

                  <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
                    {internship.company}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">

                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                      💼 {internship.internship_type}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      📍 {internship.location}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      🏷️ {internship.category}
                    </span>

                  </div>

                </div>

              </div>

              {/* Apply Button */}
              <Link
                to={`/internships/${internship.id}/apply`}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Apply Now →
              </Link>

            </div>

          </div>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-6 lg:col-span-2">

            {/* About */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                    📖
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      About the Internship
                    </h2>

                    <p className="text-sm text-slate-500">
                      Learn more about this opportunity.
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-8">

                <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                  {internship.description}
                </p>

              </div>

            </section>

            {/* Responsibilities */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                    🎯
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Responsibilities
                    </h2>

                    <p className="text-sm text-slate-500">
                      What you may work on during the internship.
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-8">

                <div className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                  {internship.responsibilities}
                </div>

              </div>

            </section>

            {/* Requirements */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                    ✅
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Requirements
                    </h2>

                    <p className="text-sm text-slate-500">
                      Skills and qualifications for this opportunity.
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-8">

                <div className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                  {internship.requirements}
                </div>

              </div>

            </section>

          </div>

          {/* Right Sidebar */}
          <aside>

            <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">

                <h2 className="text-lg font-bold text-slate-900">
                  Internship Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Key details about this opportunity.
                </p>

              </div>

              <div className="p-6">

                <div className="space-y-5">

                  {/* Company */}
                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">
                      🏢
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Company
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {internship.company}
                      </p>
                    </div>

                  </div>

                  {/* Location */}
                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">
                      📍
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {internship.location}
                      </p>
                    </div>

                  </div>

                  {/* Type */}
                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">
                      💼
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Internship Type
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {internship.internship_type}
                      </p>
                    </div>

                  </div>

                  {/* Category */}
                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">
                      🏷️
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Category
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {internship.category}
                      </p>
                    </div>

                  </div>

                  {/* Deadline */}
                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-sm">
                      ⏰
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Application Deadline
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {internship.deadline || 'Not specified'}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Apply Panel */}
                <div className="mt-7 rounded-xl bg-blue-50 p-4">

                  <p className="text-sm font-semibold text-blue-800">
                    Ready to apply?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-600">
                    Submit your application and take the next step
                    toward your career.
                  </p>

                </div>

                <Link
                  to={`/internships/${internship.id}/apply`}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                  Apply for this Internship →
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </div>
  )
}

export default InternshipDetails