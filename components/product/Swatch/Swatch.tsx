import s from './Swatch.module.css'

import { FC } from 'react'

import cn from 'classnames'

// -----------------

import { isDark } from '@lib/colors'

import Button, { ButtonProps } from '@components/ui/Button'
import { Check } from '@components/icons'

// -----------------

interface Props {
  active?: boolean
  children?: any
  className?: string
  label?: string
  variant?: 'size' | 'color' | string
  color?: string
}

// -----------------

const Swatch: FC<Props & ButtonProps> = ({
  className,
  color = '',
  label,
  variant = 'size',
  active,
  ...props
}) => {
  // Ui things -----------

  variant = variant?.toLowerCase()
  label = label?.toLowerCase()

  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: variant === 'size',
      [s.color]: color,
      [s.dark]: color ? isDark(color) : false,
    },
    className
  )

  // renderer -----------

  return (
    <Button
      className={rootClassName}
      style={color ? { backgroundColor: color } : {}}
      aria-label="Variant Swatch"
      {...props}
    >
      {variant === 'color' && active && (
        <span>
          <Check />
        </span>
      )}
      {variant === 'size' ? label : null}
    </Button>
  )
}

export default Swatch
