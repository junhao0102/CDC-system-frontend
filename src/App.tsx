import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import SignIn from '@/pages/sign_in/SignIn'
import Activity from '@/pages/activity/Activity'
import Rank from '@/pages/rank/Rank'
import Record from '@/pages/record/Record'
import Layout from '@/layout'
import TodayActivity from '@/pages/today_activity/TodayActivity'
import Admin from '@/pages/admin/Admin'
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
        <Route
          path="/record"
          element={
            <Layout>
              <Record />
            </Layout>
          }
        />
        <Route
          path="/today_activity"
          element={
            <Layout>
              <TodayActivity />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <Layout>
              <Admin />
            </Layout>
          }
        />
      </Routes>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  )
}
