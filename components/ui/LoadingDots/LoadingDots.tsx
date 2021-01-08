import s from './LoadingDots.module.css'

import { FC } from 'react'

const LoadingDots: FC = () => {
  return (
    <span className={s.root}>
      <span />
      <span />
      <span />
    </span>
  )
}

export default LoadingDots
