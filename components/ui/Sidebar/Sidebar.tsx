import s from './Sidebar.module.css'

import { FC, useEffect, useRef } from 'react'
import Portal from '@reach/portal'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

// -----------------

interface Props {
  children: any
  open: boolean
  onClose: () => void
}

// -----------------

const Sidebar: FC<Props> = ({ children, open = false, onClose }) => {
  // refObject
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  // lifecycle -----------

  useEffect(() => {
    if (ref.current)
      open ? disableBodyScroll(ref.current) : enableBodyScroll(ref.current)

    return () => clearAllBodyScrollLocks()
  }, [open])

  // renderer -----------

  return (
    <Portal>
      {open ? (
        <div className={s.root} ref={ref}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none">
              <div className="h-full md:w-screen md:max-w-md">
                <div className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto">
                  {children}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </Portal>
  )
}

export default Sidebar
