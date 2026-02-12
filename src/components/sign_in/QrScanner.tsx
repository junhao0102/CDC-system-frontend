import { useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { toast } from 'sonner'

export default function CleanQrScanner({
  onScan,
}: {
  onScan: (text: string) => void
}) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannedRef = useRef(false)

  useEffect(() => {
    const qrCode = new Html5Qrcode('reader')
    scannerRef.current = qrCode

    const config = { fps: 10 }

    qrCode
      .start(
        { facingMode: 'environment' },
        config,
        async (text) => {
          if (scannedRef.current) return
          scannedRef.current = true

          onScan(text)

          await qrCode.stop()
          qrCode.clear()
        },
        undefined,
      )
      .catch(() => toast.error('無法啟動相機,請重試'))

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch((e) => console.error(e))
      }
    }
  }, [])

  return (
    <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-lg border-2 border-stone-500 bg-black">
      <div id="reader" className="h-full w-full"></div>
      <div className="pointer-events-none absolute inset-0 border-[24px] border-stone-400 border-opacity-20">
        <div className="animate-[pulse_0.8s_ease-in-out_infinite]">
          <div className="absolute h-6 w-6 border-l-4 border-t-4 border-white"></div>

          <div className="absolute right-0 top-0 h-6 w-6 border-r-4 border-t-4 border-white"></div>

          <div className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-white"></div>

          <div className="absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-white"></div>
        </div>
      </div>
    </div>
  )
}
