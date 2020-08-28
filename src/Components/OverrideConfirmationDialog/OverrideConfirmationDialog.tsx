import React from 'react'
import styles from './OverrideConfirmationDialog.module.css'
import Dialog from '@material-ui/core/Dialog/Dialog'

interface Props {
  visible: boolean
  count: number
  day: string
  onSubmit: (value: boolean) => void
}

export default function OverrideConfirmationDialog(props: Props) {
  return (
    <div>
      <Dialog
        open={props.visible}
        aria-labelledby='Time-interval-modal'
        aria-describedby='Time-interval-modal'
      >
        <div className={styles.modal}>
          <div className={styles.modalTitle}>
            Override date-specific availability?
          </div>
          <div className={styles.modalContainer}>
            <p className={styles.modalContent}>
              For {props.day} you have date-specific availability defined on{' '}
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
      </Dialog>
    </div>
  )
}
