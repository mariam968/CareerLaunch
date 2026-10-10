import { useEffect, useMemo, useState } from 'react'
import InternshipCard from '../components/InternshipCard'
import { getInternships } from '../services/internshipApi'

function Internships() {
  const [internships, setInternships] = useState([])

  const [search, setSearch] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadInternships() {
      try {
        setLoading(true)

        const data = await getInternships()

        setInternships(Array.isArray(data) ? data : [])
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

  // Unique locations
  const locations = useMemo(() => {
    const values = internships
      .map((internship) => internship.location)
      .filter(Boolean)

    return ['All', ...new Set(values)]
  }, [internships])

  // Unique internship types
  const types = useMemo(() => {
    const values = internships
      .map((internship) => internship.internship_type)
      .filter(Boolean)

    return ['All', ...new Set(values)]
  }, [internships])

  // Unique categories
  const categories = useMemo(() => {
    const values = internships
      .map((internship) => internship.category)
      .filter(Boolean)

    return ['All', ...new Set(values)]
  }, [internships])

  // Filter and sort internships
  const filteredInternships = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    const results = internships.filter((internship) => {
      const title = internship.title?.toLowerCase() || ''
      const company = internship.company?.toLowerCase() || ''
      const category = internship.category?.toLowerCase() || ''
      const location = internship.location?.toLowerCase() || ''

      const matchesSearch =
        !searchText ||
        title.includes(searchText) ||
        company.includes(searchText) ||
        category.includes(searchText) ||
        location.includes(searchText)

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
    })

    return [...results].sort((a, b) => {
      if (sortBy === 'deadline') {
        if (!a.deadline) return 1
        if (!b.deadline) return -1

        return (
          new Date(a.deadline) -
          new Date(b.deadline)
        )
      }

      if (sortBy === 'oldest') {
        return (
          new Date(a.created_at) -
          new Date(b.created_at)
        )
      }

      // Newest
      return (
        new Date(b.created_at) -
        new Date(a.created_at)
      )
    })
  }, [
    internships,
    search,
    locationFilter,
    typeFilter,
    categoryFilter,
    sortBy,
  ])

  const clearFilters = () => {
    setSearch('')
    setLocationFilter('All')
    setTypeFilter('All')
    setCategoryFilter('All')
    setSortBy('newest')
  }

  const filtersActive =
    search !== '' ||
    locationFilter !== 'All' ||
    typeFilter !== 'All' ||
    categoryFilter !== 'All' ||
    sortBy !== 'newest'

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="mb-6 overflow-hidden rounded-2xl bg-blue-600 shadow-sm sm:mb-8">
            <div className="px-5 py-6 sm:px-8 sm:py-7">
              <div className="flex items-start gap-3 sm:gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl sm:h-14 sm:w-14 sm:text-2xl">
                  🔎
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-blue-100 sm:text-sm">
                    CareerLaunch Opportunities
                  </p>

                  <h1 className="mt-1 break-words text-2xl font-bold text-white sm:text-3xl">
                    Find Internships
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Discover internship opportunities across Uganda.
                  </p>
                </div>

              </div>
            </div>

            <div className="h-1 bg-blue-700" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              ⏳
            </div>

            <p className="mt-4 font-medium text-slate-600">
              Loading internships...
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Please wait while we find available opportunities.
            </p>

          </div>

        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="mb-6 overflow-hidden rounded-2xl bg-blue-600 shadow-sm sm:mb-8">
            <div className="px-5 py-6 sm:px-8 sm:py-7">
              <div className="flex items-start gap-3 sm:gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl sm:h-14 sm:w-14 sm:text-2xl">
                  🔎
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-blue-100 sm:text-sm">
                    CareerLaunch Opportunities
                  </p>

                  <h1 className="mt-1 break-words text-2xl font-bold text-white sm:text-3xl">
                    Find Internships
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Discover internship opportunities across Uganda.
                  </p>
                </div>

              </div>
            </div>

            <div className="h-1 bg-blue-700" />
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center sm:p-10">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
              !
            </div>

            <h2 className="mt-4 text-lg font-bold text-red-800">
              Unable to load internships
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-red-600">
              {error}
            </p>

            <p className="mt-1 text-sm leading-6 text-red-500">
              Make sure the Django backend is running.
            </p>

          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-blue-600 shadow-sm sm:mb-8">

          <div className="px-5 py-6 sm:px-8 sm:py-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex min-w-0 items-start gap-3 sm:gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl sm:h-14 sm:w-14 sm:text-2xl">
                  🔎
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-medium text-blue-100 sm:text-sm">
                    CareerLaunch Opportunities
                  </p>

                  <h1 className="mt-1 break-words text-2xl font-bold text-white sm:text-3xl">
                    Find Internships
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                    Discover internship opportunities across Uganda
                    and find the right experience to launch your career.
                  </p>

                </div>

              </div>

              <div className="w-full shrink-0 rounded-xl bg-white/10 px-5 py-3 backdrop-blur-sm sm:w-auto">

                <p className="text-xs font-medium text-blue-100">
                  Opportunities
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {internships.length}
                </p>

              </div>

            </div>

          </div>

          <div className="h-1 bg-blue-700" />

        </div>

        {/* Search and filters */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-5 py-5 sm:px-8">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                🔍
              </div>

              <div className="min-w-0">

                <h2 className="text-lg font-bold text-slate-900">
                  Search & Filter
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Find opportunities that match your interests.
                </p>

              </div>

            </div>

          </div>

          <div className="p-5 sm:p-8">

            {/* Search */}
            <div>

              <label className="text-sm font-semibold text-slate-700">
                Search internships
              </label>

              <div className="relative mt-2">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by title, company, category or location..."
                  className="w-full min-w-0 rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Filters */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

              {/* Location */}
              <div className="min-w-0">

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  📍 Location
                </label>

                <select
                  value={locationFilter}
                  onChange={(event) =>
                    setLocationFilter(event.target.value)
                  }
                  className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>

              </div>

              {/* Internship Type */}
              <div className="min-w-0">

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  💼 Internship Type
                </label>

                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value)
                  }
                  className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

              </div>

              {/* Category */}
              <div className="min-w-0">

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  🏷️ Category
                </label>

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

              </div>

              {/* Sort */}
              <div className="min-w-0">

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  ↕️ Sort by
                </label>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="newest">
                    Newest first
                  </option>

                  <option value="deadline">
                    Closing soon
                  </option>

                  <option value="oldest">
                    Oldest first
                  </option>
                </select>

              </div>

            </div>

            {/* Filter footer */}
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-semibold text-slate-700">
                  {filteredInternships.length}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-slate-700">
                  {internships.length}
                </span>{' '}
                opportunities
              </p>

              {filtersActive && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
                >
                  ↻ Clear Filters
                </button>
              )}

            </div>

          </div>

        </div>

        {/* Results */}
        <div className="mt-6 sm:mt-8">

          <div className="mb-5">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="break-words text-xl font-bold text-slate-900">
                Internship Opportunities
              </h2>

              <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {filteredInternships.length}
              </span>

            </div>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Explore opportunities and find one that fits your goals.
            </p>

          </div>

          {/* Empty state */}
          {filteredInternships.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-14">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                🔍
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No internships found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find opportunities matching your
                current search or filters. Try changing your
                search criteria.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:w-auto"
              >
                Clear Filters →
              </button>

            </div>

          ) : (

            <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">

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

    </div>
  )
}

export default Internships