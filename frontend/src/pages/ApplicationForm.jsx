import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const internships = [
  {
    id: 1,
    title: 'Software Developer Intern',
    company: 'TechNova Uganda',
    location: 'Kampala',
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'Digital Solutions Ltd',
    location: 'Kampala',
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'Creative Studio',
    location: 'Kampala',
  },
  {
    id: 4,
    title: 'Cybersecurity Intern',
    company: 'SecureNet Africa',
    location: 'Remote',
  },
]

function ApplicationForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const internship = internships.find(
    (item) => item.id === Number(id)
  )

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    course: '',
    yearOfStudy: '',
    coverLetter: '',
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

    navigate('/application-success')
  }

  if (!internship) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Internship not found
        </h1>

        <p className="mt-2 text-slate-500">
          We couldn't find the internship you're applying for.
        </p>

        <Link
          to="/internships"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          Browse internships
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-slate-900">
          Apply for Internship
        </h1>

        <p className="mt-1 text-slate-500">
          Complete your information to submit your application.
        </p>
      </div>

      {/* Internship summary */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <p className="text-sm font-medium text-blue-600">
          Applying for
        </p>

        <h2 className="mt-1 text-lg font-bold text-slate-900">
          {internship.title}
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          {internship.company} • {internship.location}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
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
              name="fullName"
              value={formData.fullName}
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
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Select year</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>

        {/* Cover letter */}
        <div className="mt-6">
          <label className="text-sm font-medium text-slate-700">
            Why are you interested in this internship?
          </label>

          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Tell the company why you would be a good candidate..."
            className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* CV */}
        <div className="mt-6">
          <label className="text-sm font-medium text-slate-700">
            Upload CV
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
          />

          <p className="mt-2 text-xs text-slate-400">
            PDF, DOC or DOCX recommended.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  )
}

export default ApplicationForm