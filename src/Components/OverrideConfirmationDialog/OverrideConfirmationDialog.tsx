/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : OverrideConfirmationDialog.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react'
import styles from './OverrideConfirmationDialog.module.css'
import Modal from '../Modal/Modal'

interface Props {
  visible: boolean
  count: number
  day: string[]
  onSubmit: (value: boolean) => void
}

export default function OverrideConfirmationDialog(props: Props) {
  const day = props.day?.join(', ')
  return (
      <Modal
        visible={props.visible}
      >
        <div className={styles.modal}>
          <div className={styles.modalTitle}>
            Override date-specific availability?
          </div>
          <div className={styles.modalContainer}>
            <p className={styles.modalContent}>
              For {day} you have date-specific availability defined on{' '}
              {props.count} date. Would you like to override this date?
            </p>
            <div className={styles.btnWrap}>
              <button
                type='button'
                className={styles.primaryBtn}
                onClick={() => props.onSubmit(false)}
              >
                Don't override
              </button>
              <button
                type='button'
                className={styles.secondaryBtn}
                onClick={() => props.onSubmit(true)}
              >
                Override
              </button>
            </div>
          </div>
        </div>
      </Modal>
  )
}
