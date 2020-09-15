import React from 'react'
import styles from './WeekDayForm.module.css'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { TickSvg } from '../../assets/Icons/TickSvg'
import clsx from 'clsx'
import moment from 'moment'

interface Props {
  className?: string
  onFormSubmit: (value: string[]) => void
}

type WeekDays = {
  id: number
  label: string
  value: boolean
}

export default function WeekDayForm(props: Props) {
  const [state, setState] = React.useState<boolean>(false)
  const [btnDisable, setBtnDisable] = React.useState<boolean>(true)
  const [days, setDays] = React.useState<WeekDays[]>([
    { id: 0, label: 'Sunday', value: false },
    { id: 1, label: 'Monday', value: false },
    { id: 2, label: 'Tuesday', value: false },
    { id: 3, label: 'Wednesday', value: false },
    { id: 4, label: 'Thursday', value: false },
    { id: 5, label: 'Friday', value: false },
    { id: 6, label: 'Saturday', value: false }
  ])

  const isButtonDisable = (week: WeekDays[]) => {
    let disable: boolean = true
    week.every((item: WeekDays) => {
      if (item.value) {
        disable = false
        return false
      }
      return true
    })
    return disable
  }

  const onFormSubmit = (value: WeekDays[]) => {
    const weeks: string[] = []
    value.forEach((item: WeekDays) => {
      if (item.value) {
        weeks.push(moment(item.label, 'dddd').format('ddd').toLowerCase())
      }
    })
    props.onFormSubmit(weeks)
  }

  const handleSubmit = () => {
    const disable = isButtonDisable(days)
    setBtnDisable(disable)
    if (!disable) {
      onFormSubmit(days)
    }
  }

  const handleChange = (event: any) => {
    const week = days
    week[Number(event.target.name)].value = event.target.checked
    setDays(week)
    setState(!state)
    const disable = isButtonDisable(week)
    setBtnDisable(disable)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <FormGroup>
        {days.map((item: WeekDays) => {
          return (
            <FormControlLabel
              className={styles.formControlLabel}
              key={item.label}
              control={
                <Checkbox
                  onChange={handleChange}
                  name={item.id + ''}
                  disableRipple
                  color='default'
                  checkedIcon={
                    <span className={styles.checkboxChecked}>
                      <TickSvg className={styles.tickSvg} />
                    </span>
                  }
                  // className={styles.checkbox}
                  icon={<span className={styles.checkboxNotChecked} />}
                />
              }
              label={
                <span
                  className={clsx(
                    styles.formControlLabelText,
                    item.value && styles.formControlLabelTextActive
                  )}
                >
                  {item.label}
                </span>
              }
            />
          )
        })}
      </FormGroup>
      <button
        type='button'
        className={clsx(styles.largeBtn, btnDisable && styles.disableBtn)}
        onClick={handleSubmit}
      >
        Apply
      </button>
    </div>
  )
}
