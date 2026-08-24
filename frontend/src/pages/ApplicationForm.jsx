import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { submitApplication } from '../services/applicationApi'

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

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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
          Complete the form below to submit your application.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        {/* Personal information */}
        <h2 className="text-lg font-bold text-slate-900">
          Personal Information
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

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

        {/* Cover letter */}
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
          <label className="text-sm font-medium text-slate-700">
            Upload your CV
          </label>

          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
          />

          <p className="mt-2 text-xs text-slate-400">
            PDF, DOC or DOCX.
          </p>
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