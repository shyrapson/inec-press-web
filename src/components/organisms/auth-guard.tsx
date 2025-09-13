'use client'

import { PAGE_ROUTES } from '@/common/types'
import useStore from '@/hooks/useStore'
import { usePathname, useRouter } from 'next/navigation'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Spinner } from '../ui/spinner'

interface IAuthGuard {
  children: ReactNode
}

const AuthGuard: FC<IAuthGuard> = ({ children }) => {
  const [authenticating, setAuthenticating] = useState(true)

  const { store } = useStore()
  const pathname = usePathname()

  const router = useRouter()

  useEffect(() => {
    if (store.isLocalStorageLoaded) {
      if (store.auth) {
         if (store.auth?.currentUser?.isReturningApplicant) {
          router.push(PAGE_ROUTES.DASHBOARD_PAGE)
        } else {
          router.push(PAGE_ROUTES.PROFILE_INFO_PAGE)
        }
      } else if (
        pathname.includes('dashboard') ||
        pathname.includes('profile-information')
      ) {
          router.push(PAGE_ROUTES.LOGIN_PAGE)
      } else if (pathname.includes('verify-otp')) {
        if (!store.registeredUser?.email) {
          router.push(PAGE_ROUTES.REGISTER_PAGE)
        }
      } else if (pathname.includes('register')) {
        if (store.registeredUser?.email) {
          router.push(PAGE_ROUTES.VERIFY_OTP_PAGE)
        }
      }

      setTimeout(() => setAuthenticating(false), 1000)
    }
  }, [
    pathname,
    router,
    store.auth,
    store.isLocalStorageLoaded,
    store.registeredUser?.email,
  ])

  if (authenticating) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <>{children}</>
}

export default AuthGuard
