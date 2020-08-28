import React from 'react'
import styles from './Input.module.css'
import clsx from 'clsx'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  fullWidth?: boolean
}

const Input = (props: Props) => {
  const inputClassName = clsx(
    styles.input,
    props.fullWidth ? styles.fullWidth : ''
  )
  return (
    <div className={styles.root}>
      {props.label ? <div className={styles.labelCont}>{props.label}</div> : ''}
      <input className={inputClassName} {...props} />
    </div>
  )
}

export default Input
