import { useUserContext } from '@/core/context'
import { Flex } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params: Record<string, string> = useParams()

  const goTo = (url: string) => {
    router.push(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home Page',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/balance-topup',
      label: 'Balance Top-up Page',
      position: 'topbar',

      onClick: () => goTo('/balance-topup'),
    },

    {
      key: '/purchase-history',
      label: 'Purchase History Page',
      position: 'topbar',

      onClick: () => goTo('/purchase-history'),
    },

    {
      key: '/wallet',
      label: 'Wallet Page',
      position: 'topbar',

      onClick: () => goTo('/wallet'),
    },

    {
      key: '/admin',
      label: 'Admin Dashboard',
      position: 'topbar',

      onClick: () => goTo('/admin'),
    },

    {
      key: '/admin/products',
      label: 'Product Management Page',
      position: 'topbar',

      onClick: () => goTo('/admin/products'),
    },

    {
      key: '/documents/upload',
      label: 'Document Upload Page',
      position: 'topbar',

      onClick: () => goTo('/documents/upload'),
    },

    {
      key: '/ai-assistant',
      label: 'AI Assistance Page',
      position: 'topbar',

      onClick: () => goTo('/ai-assistant'),
    },

    {
      key: '/pricing',
      label: 'Pricing',

      position: 'topbar',

      onClick: () => goTo('/pricing'),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
