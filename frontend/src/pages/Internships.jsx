import { useState } from 'react'
import InternshipCard from '../components/InternshipCard'

const internships = [
  {
    id: 1,
    title: 'Software Developer Intern',
    company: 'TechNova Uganda',
    location: 'Kampala',
    type: 'Full-time',
    category: 'Software Development',
    deadline: '30 September 2026',
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'Digital Solutions Ltd',
    location: 'Kampala',
    type: 'Hybrid',
    category: 'Software Development',
    deadline: '5 October 2026',
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'Creative Studio',
    location: 'Kampala',
    type: 'Part-time',
    category: 'UI/UX Design',
    deadline: '10 October 2026',
  },
  {
    id: 4,
    title: 'Cybersecurity Intern',
    company: 'SecureNet Africa',
    location: 'Remote',
    type: 'Remote',
    category: 'Cybersecurity',
    deadline: '15 October 2026',
  },
  {
    id: 5,
    title: 'Data Analyst Intern',
    company: 'Insight Analytics',
    location: 'Entebbe',
    type: 'Full-time',
    category: 'Data',
    deadline: '20 October 2026',
  },
  {
    id: 6,
    title: 'Marketing Intern',
    company: 'Growth Hub',
    location: 'Jinja',
    type: 'Part-time',
    category: 'Marketing',
    deadline: '25 October 2026',
  },
]

function Internships() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('Location')
  const [type, setType] = useState('Internship Type')
  const [category, setCategory] = useState('Category')

  const filteredInternships = internships.filter((internship) => {
    const searchTerm = search.toLowerCase()

    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm) ||
      internship.company.toLowerCase().includes(searchTerm) ||
      internship.category.toLowerCase().includes(searchTerm)

    const matchesLocation =
      location === 'Location' ||
      internship.location === location

    const matchesType =
      type === 'Internship Type' ||
      internship.type === type

    const matchesCategory =
      category === 'Category' ||
      internship.category === category

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesCategory
    )
  })

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Find Internships
        </h1>

        <p className="mt-1 text-slate-500">
          Discover opportunities that match your skills and career goals.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">

          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="🔎 Search internships, companies or skills..."
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={() => setSearch(search.trim())}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Search
          </button>

        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap gap-3">

        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
        >
          <option>Location</option>
          <option>Kampala</option>
          <option>Entebbe</option>
          <option>Jinja</option>
          <option>Remote</option>
        </select>

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
        >
          <option>Internship Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Hybrid</option>
          <option>Remote</option>
        </select>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
        >
          <option>Category</option>
          <option>Software Development</option>
          <option>UI/UX Design</option>
          <option>Data</option>
          <option>Cybersecurity</option>
          <option>Marketing</option>
        </select>

        {/* Clear filters */}
        <button
          onClick={() => {
            setSearch('')
            setLocation('Location')
            setType('Internship Type')
            setCategory('Category')
          }}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          Clear filters
        </button>

      </div>

      {/* Results header */}
      <div className="mb-5 mt-10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Available Internships
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Find an opportunity that's right for you.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          {filteredInternships.length}{' '}
          {filteredInternships.length === 1
            ? 'opportunity'
            : 'opportunities'}
        </p>
      </div>

      {/* Results */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              id={internship.id}
              title={internship.title}
              company={internship.company}
              location={internship.location}
              type={internship.type}
              category={internship.category}
              deadline={internship.deadline}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="text-4xl">🔎</div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No internships found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>

          <button
            onClick={() => {
              setSearch('')
              setLocation('Location')
              setType('Internship Type')
              setCategory('Category')
            }}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Clear filters
          </button>
        </div>
      )}

    </div>
  )
}

export default Internships