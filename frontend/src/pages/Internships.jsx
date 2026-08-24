
import { useEffect, useMemo, useState } from 'react'
import InternshipCard from '../components/InternshipCard'
import { getInternships } from '../services/internshipApi'


function Internships() {
  const [internships, setInternships] = useState([])
  const [search, setSearch] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load internships from Django
  useEffect(() => {
    async function loadInternships() {
      try {
        setLoading(true)

        const data = await getInternships()

        setInternships(data)
        setError('')
      } catch (err) {
        console.error(err)
        setError('Unable to load internships.')
      } finally {
        setLoading(false)
      }
    }

    loadInternships()
  }, [])

  // Get unique locations
  const locations = useMemo(() => {
    return [
      'All',
      ...new Set(
        internships.map((internship) => internship.location)
      ),
    ]
  }, [internships])

  // Get unique internship types
  const types = useMemo(() => {
    return [
      'All',
      ...new Set(
        internships.map(
          (internship) => internship.internship_type
        )
      ),
    ]
  }, [internships])

  // Get unique categories
  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(
        internships.map(
          (internship) => internship.category
        )
      ),
    ]
  }, [internships])

  // Filter internships
  const filteredInternships = internships.filter(
    (internship) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        internship.title.toLowerCase().includes(searchText) ||
        internship.company.toLowerCase().includes(searchText) ||
        internship.category.toLowerCase().includes(searchText)

      const matchesLocation =
        locationFilter === 'All' ||
        internship.location === locationFilter

      const matchesType =
        typeFilter === 'All' ||
        internship.internship_type === typeFilter

      const matchesCategory =
        categoryFilter === 'All' ||
        internship.category === categoryFilter

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesCategory
      )
    }
  )

  const clearFilters = () => {
    setSearch('')
    setLocationFilter('All')
    setTypeFilter('All')
    setCategoryFilter('All')
  }

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Find Internships
          </h1>

          <p className="mt-1 text-slate-500">
            Discover internship opportunities across Uganda.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">
            Loading internships...
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Find Internships
          </h1>

          <p className="mt-1 text-slate-500">
            Discover internship opportunities across Uganda.
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
          <p className="font-medium text-red-600">
            {error}
          </p>

          <p className="mt-2 text-sm text-red-500">
            Make sure the Django backend is running.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Find Internships
        </h1>

        <p className="mt-1 text-slate-500">
          Discover internship opportunities across Uganda.
        </p>
      </div>

      {/* Search and filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        {/* Search */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Search internships
          </label>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by title, company or category..."
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filters */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Location
            </label>

            <select
              value={locationFilter}
              onChange={(event) =>
                setLocationFilter(event.target.value)
              }
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Internship type */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Internship Type
            </label>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Clear filters */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Internship Opportunities
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredInternships.length} opportunities found
            </p>
          </div>
        </div>

        {filteredInternships.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="text-3xl">
              🔍
            </div>

            <h3 className="mt-3 font-semibold text-slate-900">
              No internships found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                id={internship.id}
                title={internship.title}
                company={internship.company}
                location={internship.location}
                type={internship.internship_type}
                category={internship.category}
                deadline={internship.deadline}
              />
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default Internships