import { useEffect, useRef, useState } from 'react'
import { renderAsync } from 'docx-preview'

function CvViewer({ url, fileName }) {
  const viewerRef = useRef(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const extension = fileName?.split('.').pop()?.toLowerCase()

  useEffect(() => {
    let cancelled = false

    const loadDocument = async () => {
      setLoading(true)
      setError('')

      if (extension !== 'docx') {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Unable to load the CV.')
        }

        const blob = await response.blob()

        if (!cancelled && viewerRef.current) {
          viewerRef.current.innerHTML = ''

          await renderAsync(blob, viewerRef.current, undefined, {
            className: 'docx',
            inWrapper: true,
            breakPages: true,
          })
        }
      } catch (err) {
        console.error('DOCX viewer error:', err)

        if (!cancelled) {
          setError('This DOCX file could not be displayed.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadDocument()

    return () => {
      cancelled = true

      if (viewerRef.current) {
        viewerRef.current.innerHTML = ''
      }
    }
  }, [url, extension])

  if (extension === 'pdf') {
    return (
      <iframe
        src={url}
        title={fileName || 'CV'}
        className="h-full min-h-[700px] w-full rounded-lg border-0"
      />
    )
  }

  if (extension === 'docx') {
    return (
      <div className="h-full min-h-[700px] w-full overflow-auto rounded-lg bg-gray-100 p-4">
        {loading && (
          <div className="flex min-h-[500px] items-center justify-center text-slate-500">
            Loading CV...
          </div>
        )}

        {error && (
          <div className="flex min-h-[500px] items-center justify-center text-red-600">
            {error}
          </div>
        )}

        <div ref={viewerRef} />
      </div>
    )
  }

  return (
    <div className="flex min-h-[700px] flex-col items-center justify-center gap-4 bg-gray-100 p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-800">
        Preview unavailable
      </h3>

      <p className="max-w-md text-sm text-slate-500">
        This file format cannot be displayed directly in CareerLaunch.
        You can open the CV using the button below.
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
      >
        Open CV
      </a>
    </div>
  )
}

export default CvViewer