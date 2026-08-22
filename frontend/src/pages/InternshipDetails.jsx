import { Link, useParams } from 'react-router-dom'

const internships = [
  {
    id: 1,
    title: 'Software Developer Intern',
    company: 'TechNova Uganda',
    location: 'Kampala',
    type: 'Full-time',
    category: 'Software Development',
    deadline: '30 September 2026',
    description:
      'We are looking for a motivated student to join our development team and gain practical experience building modern software applications.',
    responsibilities: [
      'Assist with developing web applications.',
      'Work with developers on new features.',
      'Test and debug application functionality.',
      'Participate in team development activities.',
    ],
    requirements: [
      'Currently enrolled in a relevant university program.',
      'Basic knowledge of programming.',
      'Familiarity with Git and GitHub.',
      'Good communication and teamwork skills.',
    ],
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'Digital Solutions Ltd',
    location: 'Kampala',
    type: 'Hybrid',
    category: 'Software Development',
    deadline: '5 October 2026',
    description:
      'Join our frontend team and gain practical experience creating responsive and user-friendly web applications.',
    responsibilities: [
      'Build responsive user interfaces.',
      'Work with developers to implement new features.',
      'Test interfaces across different devices.',
      'Participate in code reviews.',
    ],
    requirements: [
      'Basic knowledge of HTML, CSS and JavaScript.',
      'Understanding of React is an advantage.',
      'Familiarity with Git and GitHub.',
      'Good communication and teamwork skills.',
    ],
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'Creative Studio',
    location: 'Kampala',
    type: 'Part-time',
    category: 'UI/UX Design',
    deadline: '10 October 2026',
    description:
      'Work with our design team to create intuitive and engaging digital experiences for clients and users.',
    responsibilities: [
      'Create wireframes and prototypes.',
      'Assist with user research.',
      'Design user interfaces.',
      'Collaborate with developers and designers.',
    ],
    requirements: [
      'Basic understanding of UI/UX principles.',
      'Familiarity with Figma or similar tools.',
      'Creative problem-solving skills.',
      'Good communication skills.',
    ],
  },
  {
    id: 4,
    title: 'Cybersecurity Intern',
    company: 'SecureNet Africa',
    location: 'Remote',
    type: 'Remote',
    category: 'Cybersecurity',
    deadline: '15 October 2026',
    description:
      'Gain practical experience supporting cybersecurity operations and learning how organizations protect their systems and data.',
    responsibilities: [
      'Assist with security monitoring.',
      'Support vulnerability assessments.',
      'Document security procedures.',
      'Assist the cybersecurity team with investigations.',
    ],
    requirements: [
      'Basic understanding of computer networks.',
      'Interest in cybersecurity.',
      'Understanding of common security concepts.',
      'Good analytical and communication skills.',
    ],
  },
]

function InternshipDetails() {
  const { id } = useParams()

  const internship = internships.find(
    (item) => item.id === Number(id)
  )

  if (!internship) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Internship not found
        </h1>

        <p className="mt-2 text-slate-500">
          The internship you're looking for doesn't exist.
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
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/internships"
          className="mb-5 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to internships
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div className="flex gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-blue-600">
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
                    {internship.type}
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

            <p className="mt-4 leading-7 text-slate-600">
              {internship.description}
            </p>
          </section>

          {/* Responsibilities */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Responsibilities
            </h2>

            <ul className="mt-4 space-y-3 text-slate-600">
              {internship.responsibilities.map(
                (responsibility, index) => (
                  <li key={index}>
                    • {responsibility}
                  </li>
                )
              )}
            </ul>
          </section>

          {/* Requirements */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Requirements
            </h2>

            <ul className="mt-4 space-y-3 text-slate-600">
              {internship.requirements.map(
                (requirement, index) => (
                  <li key={index}>
                    • {requirement}
                  </li>
                )
              )}
            </ul>
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
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {internship.location}, Uganda
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Internship Type
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {internship.type}
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
          </div>
        </aside>

      </div>
    </div>
  )
}

export default InternshipDetails