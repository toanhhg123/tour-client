'use client'

import { useAppSelector } from '@/store/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { UserNav } from './layout/UserNav'
import { Header } from './layout/header'

const HeaderClient = () => {
  const { userDetails } = useAppSelector((state) => state.auth)

  return userDetails ? (
    <div className="border-b">
      <div className="flex justify-between h-16 items-center px-4">
        <Link href={'/dashboard'}>
          <Image
            src={'/logo.webp'}
            alt={'logo'}
            width={100}
            height={50}
            style={{}}
          />
        </Link>

        <Header />
        <div className="flex items-center space-x-4">
          {/* <Search /> */}
          <UserNav />
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default HeaderClient
