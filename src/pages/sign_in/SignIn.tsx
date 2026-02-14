import { useState } from 'react'
import Html5QrcodePlugin from '@/components/sign_in/QrScanner'
import { signIn } from '@/api/activity'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function SignIn() {
  type ScanStatus = 'idle' | 'success' | 'error'
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle')
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  async function onScan(uuid: string) {
    if (isProcessing) return

    setIsProcessing(true)

    try {
      const response = await signIn(uuid)
      setScanStatus('success')
      setScanResult(`成功簽到活動: ${response.activity.activity_name}`)

      toast.success('簽到成功！')
    } catch (e: any) {
      setScanStatus('error')
      setScanResult('簽到失敗！')

      const status = e.response?.status
      const errorData = e.response?.data

      if (!errorData) {
        console.error('Login error: Network Error')
        toast.error('伺服器無法連線，請稍後再試。')
        return
      }
      if (status === 401 || status === 403) return

      if (status === 404) {
        toast.error('符合 QRcode 的活動不存在')
        return
      }
      if (status === 409) {
        toast.error('已報到過了ㄛ！')
        return
      }

      toast.error('簽到失敗！')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      <p className="text-center text-slate-500">請將 QR Code 對準下方掃描框</p>

      <Html5QrcodePlugin onScan={onScan} />

      {scanResult && (
        <div
          className={cn(
            'mt-4 rounded-lg p-4 font-medium',
            scanStatus === 'success' && 'bg-green-50 text-green-700',
            scanStatus === 'error' && 'bg-red-50 text-red-700',
          )}
        >
          {scanResult}
        </div>
      )}
    </div>
  )
}
