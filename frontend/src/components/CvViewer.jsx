import { useEffect, useRef } from 'react'
import {
  createPreviewApi,
  mountPreviewTree,
  registerBuiltinPreviewRenderers,
} from '@doc-preview/core'
import { registerOfficePreviewRenderers } from '@doc-preview/office'

import '@doc-preview/themes/doc-preview.css'

registerBuiltinPreviewRenderers()
registerOfficePreviewRenderers()

function CvViewer({ url, fileName }) {
  const viewerRef = useRef(null)

  useEffect(() => {
    if (!viewerRef.current || !url) {
      return
    }

    let api
    let destroyed = false

    const loadViewer = async () => {
      try {
        api = createPreviewApi({
          documents: [
            {
              uri: url,
              fileName: fileName || 'CV',
            },
          ],
        })

        if (!destroyed) {
          await mountPreviewTree({
            host: viewerRef.current,
            engine: api.engine,
          })
        }
      } catch (error) {
        console.error('CV viewer error:', error)
      }
    }

    loadViewer()

    return () => {
      destroyed = true

      if (api) {
        api.destroy?.()
      }

      if (viewerRef.current) {
        viewerRef.current.innerHTML = ''
      }
    }
  }, [url, fileName])

  return (
    <div
      ref={viewerRef}
      className="min-h-[700px] w-full overflow-auto rounded-lg bg-gray-100"
    />
  )
}

export default CvViewer