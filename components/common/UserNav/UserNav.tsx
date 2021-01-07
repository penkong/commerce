import s from './UserNav.module.css'

import { FC } from 'react'
import Link from 'next/link'

import cn from 'classnames'

// -----------------

import useCustomer from '@framework/use-customer'
import useCart from '@framework/cart/use-cart'

import DropdownMenu from '@components/common/UserNav/DropdownMenu'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Avatar } from '@components/common'

// -----------------

interface Props {
  className?: string
}

// -----------------

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  // framework -----------

  const { data } = useCart()
  const { data: customer } = useCustomer()

  // context -----------

  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()

  // utils -----------

  // what are these???
  const countItem = (count: number, item: any) => count + item.quantity
  const countItems = (count: number, items: any[]) =>
    items.reduce(countItem, count)

  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)

  // renderer -----------

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item} onClick={toggleSidebar}>
            <Bag />
            {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
          </li>
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
          <li className={s.item}>
            {customer ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
