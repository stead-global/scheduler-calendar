import React from 'react'

interface Props {
  className?: string
}

export default function ArrowLeftIcon(props: Props) {
  return (
    <svg
      width='8px'
      height='12px'
      viewBox='0 0 8 12'
      version='1.1'
      className={props.className}
      xmlns='http://www.w3.org/1999/xlink'
    >
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline
          id='Path-7'
          stroke='currentColor'
          strokeWidth='2.5'
          transform='translate(4.000000, 6.000000) rotate(90.000000) translate(-4.000000, -6.000000) '
          points='0 4 4 8 8 4'
        />
      </g>
    </svg>
  )
}
