'use client'

import { useAppSelector } from '@/store/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { UserNav } from './layout/UserNav'
import { Header } from './layout/header'

const HeaderClient = () => {
  const { userDetails } = useAppSelector((state) => state.auth)

  return userDetails ? (
    <div className="border-b h-16 fixed left-0 top-0 right-0 z-30 bg-white px-4">
      <div className="flex justify-between h-full  items-center ">
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
