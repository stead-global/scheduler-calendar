/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : DeleteSvg.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react'

interface Props {
  className?: string
}

export default function DeleteSvg(props: Props) {
  return (
    <svg
      width='20'
      height='20'
      className={props.className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M16.545 4.273L15.18 16.568C15.03 17.911 13.802 19 12.457 19H7.543c-1.354 0-2.572-1.083-2.722-2.432L3.455 4.273M1 4.273h18M7.626 9.182l.646 4.909M12.228 9.182l-.529 4.909M5.91 4.273l.423-1.694C6.55 1.707 7.453 1 8.363 1h3.275c.903 0 1.812.71 2.03 1.579l.423 1.694' />
      </g>
    </svg>
  )
}
