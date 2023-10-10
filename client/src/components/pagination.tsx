'use client'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

interface Props {
  pageIndex: number
  onChangePage?: (_pageIndex: number) => void
  length: number
  pathName: string
  query: { [key: string]: string | number }
}

export default function Pagination({
  pageIndex,
  length,
  pathName,
  query,
}: Props) {
  const getItemProps = (index: number) =>
    ({
      className: buttonVariants({
        variant: pageIndex === index ? 'default' : 'secondary',
        size: 'sm',
        className: 'gray',
      }),
    }) as any

  return (
    <div className="flex items-center gap-4">
      <Link
        href={{
          pathname: pathName,
          query: { ...query, pageIndex: pageIndex <= 1 ? 1 : pageIndex - 1 },
        }}
        className={buttonVariants({
          size: 'sm',
          className: 'flex items-center gap-2',
          variant: 'secondary',
        })}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Link>
      <div className="flex items-center gap-2">
        {Array.from({ length: length }).map((_, index) => {
          return (
            <Link
              href={{
                pathname: pathName,
                query: { ...query, pageIndex: index + 1 },
              }}
              {...getItemProps(index + 1)}
              key={index + 1}
            >
              {index + 1}
            </Link>
          )
        })}
      </div>
      <Link
        href={{
          pathname: pathName,
          query: {
            ...query,
            pageIndex: pageIndex >= length ? pageIndex : pageIndex + 1,
          },
        }}
        className={buttonVariants({
          size: 'sm',
          className: 'flex items-center gap-2',
          variant: 'secondary',
        })}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Link>
    </div>
  )
}
