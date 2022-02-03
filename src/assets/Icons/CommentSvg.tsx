/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : CloseSvg.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react'

interface Props {
  className?: string
}

export default function CommentSvg(props: Props) {
  return (
    <svg
      className={props.className}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        stroke='currentColor'
        strokeWidth='1.8'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M1 4v8.904a2 2 0 0 0 2 2h3.727l2.501 3.035a1 1 0 0 0 1.544 0l2.5-3.035H17a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2ZM6 6.5h8M6 9.875h5' />
      </g>
    </svg>
  )
}
