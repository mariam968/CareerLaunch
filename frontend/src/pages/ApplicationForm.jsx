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
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">
            Loading your profile information...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">

      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/internships/${id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to internship
        </Link>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Apply for Internship
        </h1>

        <p className="mt-2 text-slate-500">
          Review your information, write your cover letter,
          and submit your application.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        {/* Profile notice */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            Your information has been loaded from your student profile.
            You can edit it before submitting.
          </p>
        </div>

        {/* Personal Information */}
        <h2 className="mt-8 text-lg font-bold text-slate-900">
          Personal Information
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+256..."
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

        </div>

        {/* Education */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">
          Education
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Institution */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Institution
            </label>

            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              placeholder="e.g. Makerere University"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Course */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Course / Program
            </label>

            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              placeholder="e.g. BSc Computer Science"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Year of Study
            </label>

            <select
              name="year_of_study"
              value={formData.year_of_study}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Select year</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
            </select>
          </div>

        </div>

        {/* Cover Letter */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">
          Cover Letter
        </h2>

        <textarea
          name="cover_letter"
          value={formData.cover_letter}
          onChange={handleChange}
          required
          rows="7"
          placeholder="Tell the company why you are interested in this internship..."
          className="mt-6 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* CV */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">
          CV / Resume
        </h2>

        <div className="mt-6">

          {/* Saved CV */}
          {savedCvUrl && (
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">

              <div className="flex items-start gap-3">

                <input
                  type="checkbox"
                  checked={useSavedCv}
                  onChange={(event) =>
                    setUseSavedCv(event.target.checked)
                  }
                  className="mt-1 h-4 w-4"
                />

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Use my saved CV
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    You already have a CV saved in your profile.
                  </p>

                  <a
                    href={savedCvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View saved CV →
                  </a>
                </div>

              </div>

            </div>
          )}

          {/* Upload Different CV */}
          <div className="mt-5">

            <label className="text-sm font-medium text-slate-700">
              Upload a different CV
            </label>

            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={(event) => {
                setUseSavedCv(false)
                handleChange(event)
              }}
              className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
            />

            <p className="mt-2 text-xs text-slate-400">
              PDF, DOC or DOCX.
            </p>

          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? 'Submitting...'
              : 'Submit Application'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default ApplicationForm