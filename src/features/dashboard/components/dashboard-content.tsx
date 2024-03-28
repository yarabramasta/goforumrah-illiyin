import { cn } from '@/lib/utils'

export default function DashboardContent({
  title,
  items,
  tabs = [],
  activeTabIndex = 0
}: {
  title: string
  tabs?: { title: string; count?: number }[]
  items: any[]
  activeTabIndex?: number
}) {
  return (
    <section>
      <h1 className="text-3xl font-semibold">{title}</h1>
      {!!tabs.length ? (
        <div className="my-4 flex h-14 w-full flex-row gap-2 border-b md:w-fit">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={cn(
                'flex h-full w-full items-center justify-center border-b-2 border-transparent px-4 text-sm md:w-fit',
                activeTabIndex === index
                  ? 'border-primary font-medium text-primary'
                  : 'text-gray-500 hover:border-gray-800 hover:text-gray-800'
              )}
            >
              <span>{tab.title}</span>
              {!!tab.count ? (
                <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-background">
                  {tab.count}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
      <ul>{!!items.length ? <li>item</li> : null}</ul>
    </section>
  )
}
