import s from './Marquee.module.css'

import { FC, ReactNode, Component } from 'react'
import Ticker from 'react-ticker'

import cn from 'classnames'

// -----------------

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  variant?: 'primary' | 'secondary'
}

// -----------------

const Maquee: FC<Props> = ({
  className = '',
  children,
  variant = 'primary',
}) => {
  // Ui thing -----------

  const rootClassName = cn(
    s.root,
    {
      [s.primary]: variant === 'primary',
      [s.secondary]: variant === 'secondary',
    },
    className
  )

  // renderer -----------

  return (
    <div className={rootClassName}>
      <Ticker offset={80}>
        {() => <div className={s.container}>{children}</div>}
      </Ticker>
    </div>
  )
}

export default Maquee
