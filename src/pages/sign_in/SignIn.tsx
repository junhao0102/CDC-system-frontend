import { useState } from 'react'
import Html5QrcodePlugin from '@/components/sign_in/QrScanner'
import { toast } from 'sonner'

export default function SignIn() {
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  async function onScan(decodedText: string) {
    if (isProcessing) return

    setIsProcessing(true)

    try {
      setScanResult(decodedText)
      toast.success('簽到成功！')
    } catch (err) {
      toast.error('簽到失敗，請重試')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800">簽到</h1>
        <p className="text-slate-500">請將 QR Code 對準下方掃描框</p>
      </div>

      <Html5QrcodePlugin onScan={onScan} />

      {scanResult && (
        <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-700">
          最後掃描結果：{scanResult}
        </div>
      )}

      {isProcessing && (
        <p className="animate-pulse text-amber-600">處理中，請稍候...</p>
      )}
    </div>
  )
}
