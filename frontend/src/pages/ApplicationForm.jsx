import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { submitApplication } from '../services/applicationApi'
import { getProfile } from '../services/profileApi'

function ApplicationForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    institution: '',
    course: '',
    year_of_study: '',
    cover_letter: '',
    cv: null,
  })

  const [loadingProfile, setLoadingProfile] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [savedCvUrl, setSavedCvUrl] = useState('')
  const [useSavedCv, setUseSavedCv] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile()

        if (profile.cv) {
          setSavedCvUrl(profile.cv)
          setUseSavedCv(true)
        }

        setFormData((previous) => ({
          ...previous,
          full_name: profile.full_name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          institution: profile.institution || '',
          course: profile.course || '',
          year_of_study: profile.year_of_study || '',
        }))
      } catch (err) {
        console.error(err)

        setError(
          'Unable to load your profile information. You can still fill in the form manually.'
        )
      } finally {
        setLoadingProfile(false)
      }
    }

    loadProfile()
  }, [])

  const handleChange = (event) => {
    const { name, value, files } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }))

    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitting(true)
    setError('')

    try {
      await submitApplication({
        internship: id,
        ...formData,
        use_saved_cv: useSavedCv,
      })

      navigate('/application-success')
    } catch (err) {
      console.error(err)

      setError(
        err.message || 'Unable to submit application.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-3xl">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              📄
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Preparing your application
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Loading your profile information...
            </p>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          to={`/internships/${id}`}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
        >
          ← Back to internship
        </Link>

        {/* Header */}
        <div className="mt-5 overflow-hidden rounded-2xl bg-blue-600 shadow-sm sm:mt-6">

          <div className="px-5 py-6 sm:px-8 sm:py-7">

            <div className="flex items-start gap-3 sm:gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                📝
              </div>

              <div className="min-w-0">

                <p className="text-xs font-medium text-blue-100 sm:text-sm">
                  CareerLaunch Application
                </p>

                <h1 className="mt-1 break-words text-2xl font-bold text-white sm:text-3xl">
                  Apply for Internship
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                  Review your information, add your cover letter and CV,
                  then submit your application.
                </p>

              </div>

            </div>

          </div>

          <div className="h-1 bg-blue-700" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-6"
        >

          {/* Profile Notice */}
          <div className="border-b border-slate-200 bg-blue-50 px-4 py-5 sm:px-8">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">
                ✓
              </div>

              <div className="min-w-0">

                <p className="text-sm font-semibold text-blue-900">
                  Information loaded from your profile
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-700">
                  Your saved information has been added automatically.
                  You can edit anything before submitting.
                </p>

              </div>

            </div>

          </div>

          <div className="p-4 sm:p-8">

            {/* Personal Information */}
            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                  👤
                </div>

                <div className="min-w-0">

                  <h2 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                    Make sure your contact details are correct.
                  </p>

                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Full Name */}
                <div className="min-w-0">

                  <label
                    htmlFor="full_name"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="full_name"
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Email */}
                <div className="min-w-0">

                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Phone */}
                <div className="min-w-0 md:col-span-2">

                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+256..."
                    className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-slate-100 sm:my-10" />

            {/* Education */}
            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                  🎓
                </div>

                <div className="min-w-0">

                  <h2 className="text-lg font-bold text-slate-900">
                    Education
                  </h2>

                  <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                    Tell the employer about your academic background.
                  </p>

                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Institution */}
                <div className="min-w-0">

                  <label
                    htmlFor="institution"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Institution
                  </label>

                  <input
                    id="institution"
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Makerere University"
                    className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Course */}
                <div className="min-w-0">

                  <label
                    htmlFor="course"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Course / Program
                  </label>

                  <input
                    id="course"
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    placeholder="e.g. BSc Computer Science"
                    className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Year */}
                <div className="min-w-0 md:col-span-2">

                  <label
                    htmlFor="year_of_study"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Year of Study
                  </label>

                  <select
                    id="year_of_study"
                    name="year_of_study"
                    value={formData.year_of_study}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">
                      Select year
                    </option>

                    <option value="Year 1">
                      Year 1
                    </option>

                    <option value="Year 2">
                      Year 2
                    </option>

                    <option value="Year 3">
                      Year 3
                    </option>

                    <option value="Year 4">
                      Year 4
                    </option>
                  </select>

                </div>

              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-slate-100 sm:my-10" />

            {/* Cover Letter */}
            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-lg">
                  ✍️
                </div>

                <div className="min-w-0">

                  <h2 className="text-lg font-bold text-slate-900">
                    Cover Letter
                  </h2>

                  <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                    Explain why you are a good fit for this internship.
                  </p>

                </div>

              </div>

              <textarea
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                required
                rows="8"
                placeholder="Tell the company why you are interested in this internship and what you can bring to the role..."
                className="mt-6 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Divider */}
            <div className="my-8 border-t border-slate-100 sm:my-10" />

            {/* CV */}
            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg">
                  📎
                </div>

                <div className="min-w-0">

                  <h2 className="text-lg font-bold text-slate-900">
                    CV / Resume
                  </h2>

                  <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                    Attach the CV you want the employer to receive.
                  </p>

                </div>

              </div>

              <div className="mt-6">

                {/* Saved CV */}
                {savedCvUrl && (
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">

                    <div className="flex items-start gap-3 sm:gap-4">

                      <input
                        type="checkbox"
                        checked={useSavedCv}
                        onChange={(event) =>
                          setUseSavedCv(event.target.checked)
                        }
                        className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <p className="text-sm font-bold text-slate-900">
                            Use my saved CV
                          </p>

                          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                            Saved
                          </span>

                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          You already have a CV saved in your student profile.
                        </p>

                        <a
                          href={savedCvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center rounded-lg py-1 font-semibold text-blue-600 hover:text-blue-700"
                        >
                          View saved CV →
                        </a>

                      </div>

                    </div>

                  </div>
                )}

                {/* Upload Different CV */}
                <div className={savedCvUrl ? 'mt-5' : ''}>

                  <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50/30 sm:p-5">

                    <label
                      htmlFor="cv"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Upload a different CV
                    </label>

                    <input
                      id="cv"
                      type="file"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) => {
                        setUseSavedCv(false)
                        handleChange(event)
                      }}
                      className="mt-3 block w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-blue-700 sm:px-4 sm:text-sm"
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Accepted formats: PDF, DOC or DOCX.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm text-red-600">
                    !
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-red-800">
                      Something went wrong
                    </p>

                    <p className="mt-1 break-words text-sm leading-6 text-red-600">
                      {error}
                    </p>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-4 py-5 sm:px-8">

            <div className="min-w-0">

              <p className="text-sm font-semibold text-slate-700">
                Ready to apply?
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Review your information before submitting.
              </p>

            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-end"
            >
              {submitting
                ? 'Submitting...'
                : 'Submit Application →'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default ApplicationForm