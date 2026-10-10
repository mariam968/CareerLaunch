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
      <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* Loading Back Button */}
          <div className="mb-5">
            <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />
          </div>

          {/* Loading Header */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="h-2 bg-blue-600" />

            <div className="p-5 sm:p-8">

              <div className="flex flex-col gap-6 md:flex-row md:items-start">

                <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-slate-200 sm:h-16 sm:w-16" />

                <div className="min-w-0 flex-1">

                  <div className="h-7 w-3/4 animate-pulse rounded bg-slate-200 sm:w-2/3" />

                  <div className="mt-3 h-4 w-40 animate-pulse rounded bg-slate-200" />

                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-7 w-28 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
                  </div>

                </div>

              </div>

            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
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
      <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center sm:p-10">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600 sm:h-16 sm:w-16">
              !
            </div>

            <h1 className="mt-5 text-xl font-bold text-red-800 sm:text-2xl">
              Internship not found
            </h1>

            <p className="mx-auto mt-2 max-w-md break-words text-sm leading-6 text-red-600">
              {error || 'This internship does not exist.'}
            </p>

            <Link
              to="/internships"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:w-auto"
            >
              ← Back to Internships
            </Link>

          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Back button */}
        <div className="mb-5 sm:mb-6">

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

          <div className="p-5 sm:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

              {/* Company + Internship */}
              <div className="flex min-w-0 gap-4 sm:gap-5">

                {/* Company Logo */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold uppercase text-white shadow-sm sm:h-16 sm:w-16 sm:text-2xl">
                  {internship.company?.charAt(0) || 'C'}
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-semibold text-blue-600 sm:text-sm">
                    Internship Opportunity
                  </p>

                  <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {internship.title}
                  </h1>

                  <p className="mt-2 break-words text-sm font-medium text-slate-500 sm:text-base">
                    {internship.company}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">

                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                      💼 {internship.internship_type}
                    </span>

                    <span className="max-w-full break-words rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      📍 {internship.location}
                    </span>

                    <span className="max-w-full break-words rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      🏷️ {internship.category}
                    </span>

                  </div>

                </div>

              </div>

              {/* Apply Button */}
              <Link
                to={`/internships/${internship.id}/apply`}
                className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md md:w-auto"
              >
                Apply Now →
              </Link>

            </div>

          </div>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">

          {/* Left Content */}
          <div className="min-w-0 space-y-5 sm:space-y-6 lg:col-span-2">

            {/* About */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-4 py-5 sm:px-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                    📖
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-bold text-slate-900">
                      About the Internship
                    </h2>

                    <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                      Learn more about this opportunity.
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-8">

                <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:text-base">
                  {internship.description}
                </p>

              </div>

            </section>

            {/* Responsibilities */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-4 py-5 sm:px-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                    🎯
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-bold text-slate-900">
                      Responsibilities
                    </h2>

                    <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                      What you may work on during the internship.
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-8">

                <div className="whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:text-base">
                  {internship.responsibilities}
                </div>

              </div>

            </section>

            {/* Requirements */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-4 py-5 sm:px-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-lg">
                    ✅
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-bold text-slate-900">
                      Requirements
                    </h2>

                    <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                      Skills and qualifications for this opportunity.
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-8">

                <div className="whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:text-base">
                  {internship.requirements}
                </div>

              </div>

            </section>

          </div>

          {/* Right Sidebar */}
          <aside className="min-w-0">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">

              <div className="border-b border-slate-100 bg-slate-50 px-5 py-5 sm:px-6">

                <h2 className="text-lg font-bold text-slate-900">
                  Internship Information
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Key details about this opportunity.
                </p>

              </div>

              <div className="p-5 sm:p-6">

                <div className="space-y-5">

                  {/* Company */}
                  <div className="flex min-w-0 gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">
                      🏢
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Company
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {internship.company}
                      </p>
                    </div>

                  </div>

                  {/* Location */}
                  <div className="flex min-w-0 gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">
                      📍
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {internship.location}
                      </p>
                    </div>

                  </div>

                  {/* Type */}
                  <div className="flex min-w-0 gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">
                      💼
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Internship Type
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {internship.internship_type}
                      </p>
                    </div>

                  </div>

                  {/* Category */}
                  <div className="flex min-w-0 gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">
                      🏷️
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Category
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {internship.category}
                      </p>
                    </div>

                  </div>

                  {/* Deadline */}
                  <div className="flex min-w-0 gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-sm">
                      ⏰
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Application Deadline
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
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