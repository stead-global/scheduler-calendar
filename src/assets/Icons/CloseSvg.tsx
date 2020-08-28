import React from 'react'

interface Props {
  className?: string
}

export default function CloseSvg(props: Props) {
  return (
    <svg
      width='24'
      className={props.className}
      height='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g fill='none' fillRule='evenodd'>
        <path d='M0 0h24v24H0z' />
        <g stroke='currentColor' strokeLinecap='round' strokeWidth='2'>
          <path d='M6 6l12 12M6 18L18 6' />
        </g>
      </g>
    </svg>
  )
}
