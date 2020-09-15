import React from 'react'
import styles from './AvailabilityDialog.module.css'
import Dialog from '@material-ui/core/Dialog/Dialog'
import AddIntervalSection, {
  // eslint-disable-next-line no-unused-vars
  PeriodsOfDay
} from '../AddIntervalSection/AddIntervalSection'
import CloseSvg from '../../assets/Icons/CloseSvg'

interface Props {
  visible: boolean
  onClose: () => void
  onFormSubmit: (values: any, period: PeriodsOfDay) => void
  intervalDetails: any
  formValues: any
  is24hour: boolean
}

export default function ViewModal(props: Props) {
  return (
    <div>
      <Dialog
        open={props.visible}
        onClose={props.onClose}
        aria-labelledby='Time-interval-modal'
        aria-describedby='Time-interval-modal'
      >
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
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
