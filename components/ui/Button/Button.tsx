import s from './Button.module.css'

import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import mergeRefs from 'react-merge-refs'

import cn from 'classnames'

// -----------------

import { LoadingDots } from '@components/ui'

// -----------------

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'flat' | 'slim'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

// -----------------

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  // props -----------

  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props

  // refObject

  const ref = useRef<typeof Component>(null)

  // Ui thing -----------

  const rootClassName = cn(
    s.root,
    {
      [s.slim]: variant === 'slim',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )

  // renderer -----------

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  )
})

export default Button
