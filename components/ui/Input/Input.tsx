import s from './Input.module.css'

import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react'

import cn from 'classnames'

// -----------------

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (...args: any[]) => any
}

// -----------------

const Input: FC<Props> = ({ className, children, onChange, ...rest }) => {
  // Ui thing -----------

  const rootClassName = cn(s.root, {}, className)

  // functionalities -----------

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value)
    return null
  }

  // renderer -----------

  return (
    <label>
      <input
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  )
}

export default Input
