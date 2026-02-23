import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function CleanQrScanner({
  onScan,
}: {
  onScan: (text: string) => void
}) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [isScanned, setIsScanned] = useState(false)

  const startScanner = async () => {
    setIsScanned(false)

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode('reader')
      }

      if (scannerRef.current.isScanning) return

      await scannerRef.current.start(
        { facingMode: 'environment' },
        { fps: 10 },
        async (text) => {
          const uuid = text.split('/').pop() || ''
          onScan(uuid)

          if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop()
          }
          setIsScanned(true)
        },
        undefined,
      )
    } catch (err) {
      console.error(err)
      setIsScanned(false)
      toast.error('無法啟動相機，請檢查權限')
    }
  }

  useEffect(() => {
    startScanner()
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error)
      }
    }
  }, [])

  return (
    <>
      <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-lg border-2 border-stone-500 bg-black">
        <div id="reader" className="h-full w-full"></div>
        <div className="pointer-events-none absolute inset-0 border-[24px] border-black border-opacity-50">
          <div className="animate-[pulse_0.8s_ease-in-out_infinite]">
            <div className="absolute h-6 w-6 border-l-4 border-t-4 border-white"></div>

            <div className="absolute right-0 top-0 h-6 w-6 border-r-4 border-t-4 border-white"></div>

            <div className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-white"></div>

            <div className="absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-white"></div>
          </div>
        </div>
      </div>
      <div>
        {isScanned && (
          <Button
            onClick={startScanner}
            variant="default"
            className="w-full max-w-[200px] shadow-sm"
          >
            重新掃描
          </Button>
        )}
      </div>
    </>
  )
}
