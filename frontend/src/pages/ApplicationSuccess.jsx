import { Link } from 'react-router-dom'

function ApplicationSuccess() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

        {/* Success icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
          ✓
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Application Submitted!
        </h1>

        <p className="mt-3 leading-6 text-slate-500">
          Your internship application has been submitted successfully.
          You can track its progress from your applications dashboard.
        </p>

        {/* Information */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left">
          <p className="text-sm text-slate-500">
            Application status
          </p>

          <p className="mt-1 font-medium text-yellow-600">
            Under Review
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            to="/applications"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            View My Applications
          </Link>

          <Link
            to="/internships"
            className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Browse More
          </Link>

        </div>

      </div>
    </div>
  )
}

export default ApplicationSuccess