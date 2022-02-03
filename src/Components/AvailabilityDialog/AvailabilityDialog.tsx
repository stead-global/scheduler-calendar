/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : AvailabilityDialog.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from 'react'
import styles from './AvailabilityDialog.module.css'
import AddIntervalSection, {
  // eslint-disable-next-line no-unused-vars
  PeriodsOfDay
} from '../AddIntervalSection/AddIntervalSection'
import CloseSvg from '../../assets/Icons/CloseSvg'
import Modal from '../Modal/Modal'

interface Props {
  visible: boolean
  onClose: () => void
  onFormSubmit: (values: any, period: PeriodsOfDay) => void
  intervalDetails: any
  formValues: any
  is24hour: boolean
  comment?: string
  isCommentEnabled?: boolean
  isEditEnabled?: boolean
}

export default function ViewModal(props: Props) {
  return (
    <div>
      <Modal visible={props.visible} onClose={props.onClose}>
        <div className={styles.modal}>
          <div className={styles.closeIcon} onClick={props.onClose}>
            <CloseSvg />
          </div>
          <div className={styles.modalContainer}>
            <AddIntervalSection
              onClose={props.onClose}
              intervalDetails={props.intervalDetails}
              formValues={props.formValues}
              onFormSubmit={props.onFormSubmit}
              is24hour={props.is24hour}
              isCommentEnabled={props.isCommentEnabled}
              comment={props.comment}
              isEditEnabled={props.isEditEnabled}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
