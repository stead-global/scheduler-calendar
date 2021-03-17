/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : AddSvg.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import * as React from 'react'

interface Props {
  className?: string
}

export const AddSvg: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width={10}
      height={10}
      viewBox='0 0 10 10'
      className={className}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <title>Add Icon</title>
      <path
        d='M5.75 0v4.25H10v1.5H5.75V10h-1.5V5.75H0v-1.5h4.25V0h1.5z'
        fill='currentColor'
        fillRule='nonzero'
      />
    </svg>
  )
}
