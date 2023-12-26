import { FileQuestionIcon } from 'lucide-react'
import React from 'react'

type Props = {
  message: string
}

const ListEmpty = ({ message }: Props) => {
  return (
    <div className="p-3 flex gap-1 justify-center text-center border border-red-200 font-bold">
      <FileQuestionIcon />
      {message}
    </div>
  )
}

export default ListEmpty
