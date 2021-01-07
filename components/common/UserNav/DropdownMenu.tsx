import s from './DropdownMenu.module.css'

import { FC, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Link from 'next/link'

import cn from 'classnames'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

// -----------------

import useLogout from '@framework/use-logout'

import ClickOutside from '@lib/click-outside'

import { useUI } from '@components/ui/context'
import { Moon, Sun } from '@components/icons'
import { Avatar } from '@components/common'

import { LINKS } from './constant'

// -----------------

interface DropdownMenuProps {
  open?: boolean
}

// -----------------

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  // state -----------

  const [display, setDisplay] = useState(false)
  // ref object
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>

  // hook -----------

  const { pathname } = useRouter()
  const { theme, setTheme } = useTheme()

  // context -----------

  const { closeSidebarIfPresent } = useUI()

  // framework -----------

  const logout = useLogout()

  // lifecycle -----------

  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [display])

  // renderer -----------

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div>
        <button
          className={s.avatarButton}
          onClick={() => setDisplay(!display)}
          aria-label="Menu"
        >
          <Avatar />
        </button>
        {display && (
          <ul className={s.dropdownMenu} ref={ref}>
            {LINKS.map(({ name, href }) => (
              <li key={href}>
                <div>
                  <Link href={href}>
                    <a
                      className={cn(s.link, {
                        [s.active]: pathname === href,
                      })}
                      onClick={() => {
                        setDisplay(false)
                        closeSidebarIfPresent()
                      }}
                    >
                      {name}
                    </a>
                  </Link>
                </div>
              </li>
            ))}
            <li>
              <a
                className={cn(s.link, 'justify-between')}
                onClick={() => {
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                  setDisplay(false)
                }}
              >
                <div>
                  Theme: <strong>{theme}</strong>{' '}
                </div>
                <div className="ml-3">
                  {theme == 'dark' ? (
                    <Moon width={20} height={20} />
                  ) : (
                    <Sun width="20" height={20} />
                  )}
                </div>
              </a>
            </li>
            <li>
              <a
                className={cn(s.link, 'border-t border-accents-2 mt-4')}
                onClick={() => logout()}
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </ClickOutside>
  )
}

export default DropdownMenu
