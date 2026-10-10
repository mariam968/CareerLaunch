import { Link } from 'react-router-dom'

function ApplicationSuccess() {
  return (
    <div className="min-h-[calc(100vh-4rem)] overflow-x-hidden bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">

      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">

        <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Blue Header */}
          <div className="bg-blue-600 px-5 py-7 text-center sm:px-10 sm:py-8">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl font-bold text-green-600 shadow-sm sm:h-20 sm:w-20 sm:text-4xl">
              ✓
            </div>

            <h1 className="mt-5 break-words text-2xl font-bold text-white sm:text-3xl">
              Application Submitted!
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-blue-100">
              Your application is now on its way to the employer.
            </p>

          </div>

          {/* Content */}
          <div className="p-4 sm:p-8">

            <div className="text-center">

              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                You're one step closer 🚀
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Your internship application has been submitted successfully.
                You can track its progress from your applications dashboard.
              </p>

            </div>

            {/* Application Status */}
            <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4 sm:mt-7 sm:p-5">

              <div className="flex items-start gap-3 sm:gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg sm:h-11 sm:w-11 sm:text-xl">
                  👀
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                    Application Status
                  </p>

                  <p className="mt-1 text-lg font-bold text-amber-700">
                    Under Review
                  </p>

                  <p className="mt-1 break-words text-xs leading-5 text-amber-600">
                    The employer will review your application.
                  </p>

                </div>

              </div>

            </div>

            {/* Next Steps */}
            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:mt-6 sm:p-5">

              <p className="text-sm font-bold text-blue-900">
                What's next?
              </p>

              <div className="mt-4 space-y-4">

                <div className="flex items-start gap-3">

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    1
                  </span>

                  <p className="min-w-0 text-sm leading-5 text-blue-800">
                    The employer reviews your application.
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    2
                  </span>

                  <p className="min-w-0 text-sm leading-5 text-blue-800">
                    Your application status may be updated.
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    3
                  </span>

                  <p className="min-w-0 text-sm leading-5 text-blue-800">
                    Keep checking your applications dashboard.
                  </p>

                </div>

              </div>

            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">

              <Link
                to="/applications"
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:flex-1"
              >
                View My Applications →
              </Link>

              <Link
                to="/internships"
                className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-center text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex-1"
              >
                Browse More
              </Link>

            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 text-center sm:px-6">

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