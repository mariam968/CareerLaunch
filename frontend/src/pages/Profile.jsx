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
        email: profile.email,
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
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              👤
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Loading your profile
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while we retrieve your information...
            </p>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-blue-600 shadow-sm">

          <div className="px-6 py-7 sm:px-8">

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                👤
              </div>

              <div>
                <p className="text-sm font-medium text-blue-100">
                  CareerLaunch Student Profile
                </p>

                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  My Profile
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                  Keep your information up to date so companies can
                  understand your background, education and skills.
                </p>
              </div>

            </div>

          </div>

          <div className="h-1 bg-blue-700" />

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                !
              </div>

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Something went wrong
                </p>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          <div className="p-6 sm:p-8">

            {/* Personal Information */}
            <section>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                  👤
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Your basic contact information.
                  </p>
                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="+256..."
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Location
                  </label>

                  <select
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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

            </section>

            {/* Divider */}
            <div className="my-10 border-t border-slate-100" />

            {/* Education */}
            <section>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                  🎓
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Education
                  </h2>

                  <p className="text-sm text-slate-500">
                    Add your academic background.
                  </p>
                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Institution */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Institution
                  </label>

                  <input
                    type="text"
                    name="institution"
                    value={profile.institution}
                    onChange={handleChange}
                    placeholder="e.g. Makerere University"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Course / Program
                  </label>

                  <input
                    type="text"
                    name="course"
                    value={profile.course}
                    onChange={handleChange}
                    placeholder="e.g. BSc Computer Science"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Year of Study
                  </label>

                  <select
                    name="yearOfStudy"
                    value={profile.yearOfStudy}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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

            </section>

            {/* Divider */}
            <div className="my-10 border-t border-slate-100" />

            {/* Skills */}
            <section>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-lg">
                  🛠️
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Skills
                  </h2>

                  <p className="text-sm text-slate-500">
                    Highlight the skills you can bring to an internship.
                  </p>
                </div>

              </div>

              <div className="mt-6">

                <label className="text-sm font-semibold text-slate-700">
                  Your Skills
                </label>

                <textarea
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  rows="5"
                  placeholder="e.g. Python, React, Git, Communication, Microsoft Excel..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Separate your skills with commas.
                </p>

              </div>

            </section>

            {/* Divider */}
            <div className="my-10 border-t border-slate-100" />

            {/* CV */}
            <section>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg">
                  📎
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    CV / Resume
                  </h2>

                  <p className="text-sm text-slate-500">
                    Upload the CV employers should receive with your applications.
                  </p>
                </div>

              </div>

              <div className="mt-6">

                {/* Upload Area */}
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 transition hover:border-blue-300 hover:bg-blue-50/30">

                  <label className="text-sm font-semibold text-slate-700">
                    Upload your CV
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvChange}
                    className="mt-3 block w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Accepted formats: PDF, DOC or DOCX.
                  </p>

                </div>

                {/* Existing CV */}
                {cvUrl && (
                  <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">

                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg text-white">
                        📄
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-bold text-slate-900">
                          CV uploaded
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          Your current CV is saved to your profile.
                        </p>

                        <a
                          href={cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center font-semibold text-blue-600 transition hover:text-blue-700"
                        >
                          View uploaded CV →
                        </a>

                      </div>

                    </div>

                  </div>
                )}

                {/* New CV selected */}
                {cv && (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                    <p className="text-sm text-green-700">
                      <span className="font-semibold">
                        New CV selected:
                      </span>{' '}
                      {cv.name}
                    </p>

                  </div>
                )}

              </div>

            </section>

          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <div>

              {saved ? (
                <div>
                  <p className="text-sm font-semibold text-green-600">
                    ✓ Profile saved successfully
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Your information has been updated.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Keep your profile updated
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Updated information helps employers understand you better.
                  </p>
                </div>
              )}

            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Save Profile →
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default Profile