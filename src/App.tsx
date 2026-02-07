import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold">404 - 找不到頁面</div>} /> */}
      </Routes>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  )
}
