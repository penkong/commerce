import { FC, useState, useMemo, useRef, useEffect } from 'react'

// -----------------

import { getRandomPairOfColors } from '@lib/colors'

// -----------------

interface Props {
  className?: string
  children?: any
}

// -----------------

const Avatar: FC<Props> = ({}) => {
  // state -----------

  const [bg] = useState(useMemo(() => getRandomPairOfColors, []))

  // refObject -----------

  let ref = useRef() as React.MutableRefObject<HTMLInputElement>

  // lifecylce -----------

  useEffect(() => {
    if (ref && ref.current)
      ref.current.style.backgroundImage = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`
  }, [bg])

  // renderer -----------

  return (
    <div
      ref={ref}
      className="inline-block h-8 w-8 rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition linear-out duration-150"
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
