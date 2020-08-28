import React from 'react'
import styles from './FormControl.module.css'
import clsx from 'clsx'

export enum FormControlGutter {
  // eslint-disable-next-line no-unused-vars
  MEDIUM,
  // eslint-disable-next-line no-unused-vars
  DEFAULT
}
export interface FormControlProps extends React.HTMLAttributes<HTMLElement> {
  gutter?: FormControlGutter
}

const FormControl = (props: FormControlProps) => {
  const className = clsx(
    styles.root,
    props.className,
    props.gutter === FormControlGutter.MEDIUM ? styles.mediumGutter : ''
  )
  return <div className={className}>{props.children}</div>
}

export default FormControl
