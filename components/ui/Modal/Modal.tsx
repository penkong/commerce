import s from './Modal.module.css'

import { FC, useRef, useEffect } from 'react'
import Portal from '@reach/portal'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

// -----------------

import { Cross } from '@components/icons'

// -----------------

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
}

// -----------------

const Modal: FC<Props> = ({ children, open, onClose }) => {
  // refObject

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  // layout -----------

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
          <div className={s.modal}>
            <div className="h-7 flex items-center justify-end w-full">
              <button
                onClick={() => onClose()}
                aria-label="Close panel"
                className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none"
              >
                <Cross className="h-6 w-6" />
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </Portal>
  )
}

export default Modal
