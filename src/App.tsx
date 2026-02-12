import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import SignIn from '@/pages/sign_in/SignIn'
import Activity from '@/pages/activity/Activity'
import Rank from '@/pages/rank/Rank'
import Layout from '@/layout'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/signin"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/activity"
          element={
            <Layout>
              <Activity />
            </Layout>
          }
        />
        <Route
          path="/rank"
          element={
            <Layout>
              <Rank />
            </Layout>
          }
        />
      </Routes>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  )
}
