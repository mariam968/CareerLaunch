import InternshipCard from '../components/InternshipCard'

function Internships() {
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
              placeholder="🔎 Search internships, companies or skills..."
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
            Search
          </button>

        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap gap-3">

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>Location</option>
          <option>Kampala</option>
          <option>Entebbe</option>
          <option>Jinja</option>
          <option>Remote</option>
        </select>

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>Internship Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Hybrid</option>
          <option>Remote</option>
        </select>

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>Category</option>
          <option>Software Development</option>
          <option>UI/UX Design</option>
          <option>Data</option>
          <option>Cybersecurity</option>
          <option>Marketing</option>
        </select>

      </div>

      {/* Results header */}
      <div className="mt-10 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Available Internships
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing opportunities available for you.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          6 opportunities
        </p>
      </div>

      {/* Internship cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        <InternshipCard
          title="Software Developer Intern"
          company="TechNova Uganda"
          location="Kampala"
          type="Full-time"
          category="Software Development"
          deadline="30 September 2026"
        />

        <InternshipCard
          title="Frontend Developer Intern"
          company="Digital Solutions Ltd"
          location="Kampala"
          type="Hybrid"
          category="Software Development"
          deadline="5 October 2026"
        />

        <InternshipCard
          title="UI/UX Design Intern"
          company="Creative Studio"
          location="Kampala"
          type="Part-time"
          category="UI/UX Design"
          deadline="10 October 2026"
        />

        <InternshipCard
          title="Cybersecurity Intern"
          company="SecureNet Africa"
          location="Remote"
          type="Remote"
          category="Cybersecurity"
          deadline="15 October 2026"
        />

      </div>

    </div>
  )
}

export default Internships