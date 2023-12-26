'use client'

import { FontBoldIcon } from '@radix-ui/react-icons'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Heading1, Heading2, Heading3, List } from 'lucide-react'
import { Toggle } from './ui/toggle'

interface Props {
  value: string
  onChange?: (_: string) => void
}

const Tiptap = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {},
        },
        bulletList: {
          HTMLAttributes: {
            class: 'appearance-none  list-disc  m-0 ml-4',
          },
        },
      }),
    ],

    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none border-none',
      },
    },
    content: value,
    onUpdate({ editor }) {
      onChange && onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded">
      <div className="p-1 my-1 flex-wrap border-b flex gap-1">
        <Toggle
          aria-label="Toggle italic"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="border"
          pressed={editor?.isActive('bold')}
        >
          <FontBoldIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle heading1"
          onClick={() => {
            console.log('active')
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
          className="border"
          pressed={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>

        <Toggle
          aria-label="Toggle heading2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="border"
          pressed={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>

        <Toggle
          aria-label="Toggle heading3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="border"
          pressed={editor.isActive('heading', { level: 3 })}
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>

        <Toggle
          aria-label="Toggle heading3"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="border"
          pressed={editor.isActive('bulletList')}
        >
          <List className="h-4 w-4" />
        </Toggle>
      </div>
      <div className=" rounded p-2">
        <EditorContent className="  " editor={editor} />
      </div>
    </div>
  )
}

export default Tiptap
