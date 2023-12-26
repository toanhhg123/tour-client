import React, { ReactNode } from 'react'
import {
  Tabs as TabsDefault,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

interface Props {
  tabs: {
    value: string
    labelHead: ReactNode
    component: ReactNode
  }[]
  defaultValue?: string
}

const Tabs = ({ tabs, defaultValue }: Props) => {
  return (
    <TabsDefault defaultValue={defaultValue}>
      <TabsList className="flex gap-1 flex-wrap h-max py-2">
        {tabs.map((tab) => (
          <TabsTrigger value={tab.value} key={tab.value}>
            {tab.labelHead}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </TabsDefault>
  )
}

export default Tabs
