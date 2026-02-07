import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock } from 'lucide-react'
import igIcon from '@/assets/instagram.svg'
import fbIcon from '@/assets/facebook.svg'
import lineIcon from '@/assets/line.svg'

export default function Login() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start p-6 pt-16">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-orange-300 via-amber-100 to-white opacity-60" />

      <div className="z-10 my-16 flex items-center justify-center gap-3 pr-2 drop-shadow-sm md:my-24">
        <img src="/icon.png" alt="icon" className="h-12 w-12 object-contain" />
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tighter text-amber-600">
            NTNU <span className="text-amber-700">CDC</span>
          </h1>
        </div>
      </div>

      <div className="z-10 flex w-full max-w-md flex-col gap-3">
        <form>
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
                <Input
                  id="password"
                  type="password"
                  className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div className="flex items-center">
                <a
                  href="#"
                  className="ml-auto inline-block text-xs text-amber-700 underline-offset-4 hover:text-amber-600 hover:underline"
                >
                  Forget Password?
                </a>
              </div>
            </div>
          </div>
        </form>

        <Button
          type="submit"
          className="mx-auto mt-4 h-12 w-full max-w-[300px] rounded-md border-2 border-amber-900/50 bg-amber-300 font-bold text-amber-950 transition-all hover:scale-105 hover:bg-amber-300"
        >
          Log In
        </Button>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className="font-bold text-amber-700 underline-offset-4 hover:text-amber-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
        <div className="mt-20 flex items-center justify-center gap-10">
          {[
            {
              img: igIcon,
              href: 'https://www.instagram.com/ntnu_cdc/',
            },
            { img: fbIcon, href: 'https://www.facebook.com/ntnucdc' },
            { img: lineIcon, href: 'https://line.me/ti/g/Je-EQwbtn3' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              className="opacity-80 transition-all hover:scale-110 hover:opacity-100 active:scale-90"
            >
              <img
                src={social.img}
                alt="social"
                className="h-10 w-10 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
