
import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../services/profileApi'

function Profile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    course: '',
    yearOfStudy: '',
    location: '',
    skills: '',
  })

  const [cv, setCv] = useState(null)
  const [cvUrl, setCvUrl] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile()

        setProfile({
          fullName: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          institution: data.institution || '',
          course: data.course || '',
          yearOfStudy: data.year_of_study || '',
          location: data.location || '',
          skills: data.skills || '',
        })

        if (data.cv) {
          setCvUrl(data.cv)
        } else {
          setCvUrl('')
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }))

    setSaved(false)
    setError('')
  }

  const handleCvChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      setCv(selectedFile)
      setSaved(false)
      setError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setError('')
      setSaved(false)

      const profileData = {
        full_name: profile.fullName,
        phone: profile.phone,
        institution: profile.institution,
        course: profile.course,
        year_of_study: profile.yearOfStudy,
        location: profile.location,
        skills: profile.skills,
      }

      if (cv) {
        profileData.cv = cv
      }

      const data = await updateProfile(profileData)

      setProfile({
        fullName: data.full_name || '',
        email: data.email || '',
        phone: data.phone || '',
        institution: data.institution || '',
        course: data.course || '',
        yearOfStudy: data.year_of_study || '',
        location: data.location || '',
        skills: data.skills || '',
      })

      if (data.cv) {
        setCvUrl(data.cv)
      }

      setCv(null)
      setSaved(true)
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading profile...
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-1 text-slate-500">
          Complete your profile to help companies understand your
          background and skills.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Profile form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900">
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
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
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
              value={profile.email}
              disabled
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
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
              value={profile.phone}
              onChange={handleChange}
              placeholder="+256..."
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Location
            </label>

            <select
              name="location"
              value={profile.location}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Select location</option>
              <option value="Kampala">Kampala</option>
              <option value="Wakiso">Wakiso</option>
              <option value="Entebbe">Entebbe</option>
              <option value="Jinja">Jinja</option>
              <option value="Mbarara">Mbarara</option>
              <option value="Mbale">Mbale</option>
              <option value="Gulu">Gulu</option>
              <option value="Arua">Arua</option>
              <option value="Other">Other</option>
            </select>
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
              value={profile.institution}
              onChange={handleChange}
              placeholder="e.g. Makerere University"
              required
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
              value={profile.course}
              onChange={handleChange}
              placeholder="e.g. BSc Computer Science"
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Year of Study
            </label>

            <select
              name="yearOfStudy"
              value={profile.yearOfStudy}
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

        {/* Skills */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">
          Skills
        </h2>

        <div className="mt-6">
          <label className="text-sm font-medium text-slate-700">
            Your Skills
          </label>

          <textarea
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            rows="4"
            placeholder="e.g. Python, React, Git, Communication, Microsoft Excel..."
            className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs text-slate-400">
            Separate your skills with commas.
          </p>
        </div>

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
            accept=".pdf,.doc,.docx"
            onChange={handleCvChange}
            className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
          />

          <p className="mt-2 text-xs text-slate-400">
            PDF, DOC or DOCX recommended.
          </p>

          {/* Existing CV */}
          {cvUrl && (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                CV uploaded
              </p>

              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View uploaded CV →
              </a>
            </div>
          )}

          {/* New CV selected */}
          {cv && (
            <p className="mt-3 text-sm text-slate-600">
              New CV selected: <strong>{cv.name}</strong>
            </p>
          )}
        </div>

        {/* Save */}
        <div className="mt-8 flex items-center justify-between">

          {saved && (
            <p className="text-sm font-medium text-green-600">
              ✓ Profile saved successfully
            </p>
          )}

          <button
            type="submit"
            className="ml-auto rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile

