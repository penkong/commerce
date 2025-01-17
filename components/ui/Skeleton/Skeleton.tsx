import s from './Skeleton.module.css'

import React, { CSSProperties } from 'react'

import cn from 'classnames'

// -----------------

import px from '@lib/to-pixels'

// -----------------

interface Props {
  width?: string | number
  height?: string | number
  boxHeight?: string | number
  style?: CSSProperties
  show?: boolean
  block?: boolean
  className?: string
}

// -----------------

const Skeleton: React.FC<Props> = ({
  style,
  width,
  height,
  children,
  className,
  show = true,
  boxHeight = height,
}) => {
  // Ui thing -----------

  // Automatically calculate the size if there are children
  // and no fixed sizes are specified
  const shouldAutoSize = !!children && !(width || height)

  // Defaults
  width = width || 24
  height = height || 24
  boxHeight = boxHeight || height

  // renderer -----------

  return (
    <span
      className={cn(s.skeleton, className, {
        [s.show]: show,
        [s.wrapper]: shouldAutoSize,
        [s.loaded]: !shouldAutoSize && !!children,
      })}
      style={
        shouldAutoSize
          ? {}
          : {
              minWidth: px(width),
              minHeight: px(height),
              marginBottom: `calc(${px(boxHeight)} - ${px(height)})`,
              ...style,
            }
      }
    >
      {children}
    </span>
  )
}

export default Skeleton
