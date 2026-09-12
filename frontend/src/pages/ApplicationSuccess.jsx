import { Link } from 'react-router-dom'

function ApplicationSuccess() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10 sm:px-6">

      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">

        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Blue header */}
          <div className="bg-blue-600 px-6 py-8 text-center sm:px-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl font-bold text-green-600 shadow-sm">
              ✓
            </div>

            <h1 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
              Application Submitted!
            </h1>

            <p className="mt-2 text-sm text-blue-100">
              Your application is now on its way to the employer.
            </p>

          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            <div className="text-center">

              <h2 className="text-lg font-bold text-slate-900">
                You're one step closer 🚀
              </h2>

              <p className="mt-3 leading-6 text-slate-500">
                Your internship application has been submitted successfully.
                You can track its progress from your applications dashboard.
              </p>

            </div>

            {/* Application status */}
            <div className="mt-7 rounded-2xl border border-amber-100 bg-amber-50 p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl">
                  👀
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                    Application Status
                  </p>

                  <p className="mt-1 text-lg font-bold text-amber-700">
                    Under Review
                  </p>

                  <p className="mt-1 text-xs text-amber-600">
                    The employer will review your application.
                  </p>
                </div>

              </div>

            </div>

            {/* Next steps */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

              <p className="text-sm font-bold text-blue-900">
                What's next?
              </p>

              <div className="mt-4 space-y-3">

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    1
                  </span>

                  <p className="text-sm text-blue-800">
                    The employer reviews your application.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    2
                  </span>

                  <p className="text-sm text-blue-800">
                    Your application status may be updated.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    3
                  </span>

                  <p className="text-sm text-blue-800">
                    Keep checking your applications dashboard.
                  </p>
                </div>

              </div>

            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/applications"
                className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                View My Applications →
              </Link>

              <Link
                to="/internships"
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Browse More
              </Link>

            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-center">

            <p className="text-xs text-slate-400">
              CareerLaunch · Launch your career 🚀
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ApplicationSuccess