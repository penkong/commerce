import { FC } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const Link: FC<NextLinkProps> = ({ href, children, ...props }) => (
  <NextLink href={href}>
    <a {...props}>{children}</a>
  </NextLink>
)

export default Link
