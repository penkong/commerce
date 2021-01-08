import s from './Text.module.css'

import React, {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
  ComponentType,
  ReactElement,
} from 'react'

import cn from 'classnames'

// -----------------

interface Props {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode | any
  html?: string
}

// -----------------

type Variant = 'heading' | 'body' | 'pageHeading' | 'sectionHeading'

type MapComponent = {
  [P in Variant]: ComponentType<any> | string
}

type Comp =
  | JSXElementConstructor<any>
  | ReactElement<any>
  | ComponentType<any>
  | string

// -----------------

const Text: FunctionComponent<Props> = ({
  style,
  className = '',
  variant = 'body',
  children,
  html,
}) => {
  // utils -----------

  const componentsMap: MapComponent = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2',
  }

  const Component: Comp = componentsMap[variant]

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {}

  // rednerer -----------

  return (
    <Component
      className={cn(
        s.root,
        {
          [s.body]: variant === 'body',
          [s.heading]: variant === 'heading',
          [s.pageHeading]: variant === 'pageHeading',
          [s.sectionHeading]: variant === 'sectionHeading',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  )
}

export default Text
