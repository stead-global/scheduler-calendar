/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : Modal.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react'
import { useOnClick } from '../../hookshelper'
import styles from './Modal.module.css'

interface Props {
  visible: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export default function Modal(props: Props) {
  const ref: any = React.useRef()

  React.useEffect(() => {
    if (props.visible) {
      document.body.classList.add(styles.overFlowHidden)
    }
    return () => {
      document.body.classList.remove(styles.overFlowHidden)
    }
  }, [props.visible])

  useOnClick(ref, () => (props.onClose ? props.onClose() : undefined))

  return props.visible ? (
    <div className={styles.container} role='presentation'>
      <div className={styles.backDrop} aria-hidden='true'></div>
      <div
        className={styles.innerContainer}
        role='none presentation'
        tabIndex={-1}
      >
        <div className={styles.innerPaper} ref={ref}>
          {props.children}
        </div>
      </div>
    </div>
  ) : null
}
