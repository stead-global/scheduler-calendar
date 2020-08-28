import React from 'react'
import styles from './AddIntervalSection.module.css'
import clsx from 'clsx'
import FormControl from '../FormControl/FormControl'
import { Formik, FieldArray, Field } from 'formik'
import moment from 'moment'
import { getTimeFromText } from '../../Utils'
import DeleteSvg from '../../assets/Icons/DeleteSvg'
// eslint-disable-next-line no-unused-vars
import { AvailabilityIntervals, Availabilities } from '../../Interfaces'

interface Props {
  onClose: () => void
  onFormSubmit: (value: Availabilities[], period: PeriodsOfDay) => void
  intervalDetails: any
  formValues: AvailabilityIntervals[]
  is24hour: boolean
}

interface State {
  errors: any
}

export enum PeriodsOfDay {
  // eslint-disable-next-line no-unused-vars
  SINGLE = 'singleDay',
  // eslint-disable-next-line no-unused-vars
  ALL = 'allDay'
}

class AddIntervalSection extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      errors: {} as any
    } as State
  }

  handleSubmit = (values: any, day: string, period: PeriodsOfDay) => {
    const intervals = values.intervals

    if (!this.props.is24hour) {
      intervals.forEach((time: AvailabilityIntervals) => {
        time.startTime = moment(time.startTime, 'hh:mm a').format('HH:mm')
        time.endTime = moment(time.endTime, 'hh:mm a').format('HH:mm')
      })
    }

    const availabilities = [
      {
        day: day,
        slots: intervals
      }
    ]

    this.props.onFormSubmit(availabilities, period)
  }

  validateIntervals = (interval: any, values: any) => {
    const duration = this.props.intervalDetails.duration

    if (!interval.startTime && !interval.endTime) {
      return 'Start time cannot be blank.'
    }

    if (interval.startTime && !interval.endTime) {
      return 'End time cannot be blank.'
    }

    const startTime = this.props.is24hour
      ? moment(interval.startTime, 'HH:mm')
      : moment(interval.startTime, 'hh:mm a')
    const endTime = this.props.is24hour
      ? moment(interval.endTime, 'HH:mm')
      : moment(interval.endTime, 'hh:mm a')

    const durationDiffrnc = endTime.diff(startTime, 'minutes')

    if (durationDiffrnc < duration && durationDiffrnc >= 0) {
      return `Intervals must be at least ${duration} minutes.`
    }

    if (durationDiffrnc < 0) {
      return `Your end time cannot be before your start time.`
    }

    let errorMsg = ''

    values.forEach((item: any) => {
      const start = this.props.is24hour
        ? moment(item.startTime, 'HH:mm')
        : moment(item.startTime, 'hh:mm a')
      const end = this.props.is24hour
        ? moment(item.endTime, 'HH:mm')
        : moment(item.endTime, 'hh:mm a')
      if (endTime.isAfter(start) && startTime.isBefore(end)) {
        errorMsg = 'Intervals are overlapping.'
      }
    })

    return errorMsg
  }

  onSubmitValidation = (values: any, day: string, period: PeriodsOfDay) => {
    const error: any = this.state.errors

    if (values.intervals.length > 0) {
      error.intervals = new Array(values.intervals.length).fill('')

      values.intervals.forEach((item: any, index: number) => {
        const currentIndex = index // indexOfCurrentInterval
        const filteredIntervals = values.intervals.filter(
          (_time: any, index: number) => index !== currentIndex
        )
        error.intervals[index] = this.validateIntervals(item, filteredIntervals)
      })
    }

    const isEmpty =
      error.intervals &&
      error.intervals.filter((item: any) => item !== '').length === 0
    if (isEmpty) {
      error.intervals = []
    }

    if ((error.intervals && error.intervals.length === 0) || !error.intervals) {
      this.handleSubmit(values, day, period)
    }
    this.setState({ errors: error })
  }

  resetAllErrorField = () => {
    // set errors as empty
    this.setState({
      errors: {}
    })
  }

  resetErrorField = (index: number) => {
    const errors = this.state.errors
    if (errors.intervals && errors.intervals[index]) {
      errors.intervals[index] = ''
      this.setState({
        errors
      })
    }
  }

  render() {
    const { errors } = this.state

    const intervalDate = moment(this.props.intervalDetails.day)

    const validate = (values: any) => {
      const value: any = values
      value.intervals &&
        value.intervals.forEach((item: any) => {
          item.startTime = getTimeFromText(item.startTime, this.props.is24hour)
          item.endTime = getTimeFromText(item.endTime, this.props.is24hour)
        })
    }
    return (
      <div className={styles.root}>
        <div className={styles.intervalContainer}>
          <Formik
            initialValues={{
              intervals: [...this.props.formValues]
            }}
            validateOnBlur
            validateOnChange={false}
            validateOnMount
            validate={validate}
            enableReinitialize
            onSubmit={() => {}}
          >
            {({ values, handleChange, handleBlur, setFieldValue }: any) => {
              return (
                <form noValidate>
                  <FieldArray
                    name='intervals'
                    render={(arrayHelpers) => (
                      <div className={clsx(styles.formBlock, styles.inputs)}>
                        {values.intervals.length !== 0 ? (
                          <div className={styles.timeTitleWrap}>
                            <div className={styles.timeFrom}>From</div>
                            <div className={styles.timeTo}>To</div>
                          </div>
                        ) : undefined}
                        {values.intervals.map((_item: any, index: any) => (
                          <div key={index} className={styles.formRow}>
                            <div className={styles.formWrap}>
                              <FormControl className={styles.form}>
                                <Field
                                  className={`${styles.timeInput} ${
                                    styles.marginRight10
                                  } ${
                                    errors.intervals && errors.intervals[index]
                                      ? styles.error
                                      : undefined
                                  }`}
                                  name={`intervals[${index}].startTime`}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  onFocus={() => this.resetErrorField(index)}
                                  value={values.intervals[index].startTime}
                                  placeholder={
                                    this.props.is24hour ? 'HH:mm' : 'hh:mm am'
                                  }
                                />

                                <div
                                  className={`${styles.sepratorWrap} ${styles.marginRight10}`}
                                >
                                  <span className={styles.seprator} />
                                </div>
                                <Field
                                  className={`${styles.timeInput} ${
                                    styles.marginRight25
                                  } ${
                                    errors.intervals && errors.intervals[index]
                                      ? styles.error
                                      : undefined
                                  }`}
                                  name={`intervals[${index}].endTime`}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  onFocus={() => this.resetErrorField(index)}
                                  value={values.intervals[index].endTime}
                                  placeholder={
                                    this.props.is24hour ? 'HH:mm' : 'hh:mm am'
                                  }
                                />
                                <div
                                  className={styles.deleteIcon}
                                  onClick={() => {
                                    arrayHelpers.remove(index)
                                    this.resetErrorField(index)
                                  }}
                                >
                                  <DeleteSvg />
                                </div>
                              </FormControl>
                            </div>
                            {errors.intervals && errors.intervals[index] && (
                              <div className={styles.errorMsg}>
                                {errors.intervals[index]}
                              </div>
                            )}
                          </div>
                        ))}
                        {values.intervals.length === 0 ? (
                          <div className={styles.emptyWrap}>unavailable</div>
                        ) : undefined}
                        <div className={styles.container}>
                          <div
                            onClick={() => {
                              arrayHelpers.push({ startTime: '', endTime: '' })
                            }}
                            className={styles.addBtn}
                          >
                            + new interval
                          </div>
                        </div>
                        <div className={styles.unavailableBtnWrap}>
                          <div
                            onClick={() => {
                              setFieldValue('intervals', [])
                              this.resetAllErrorField()
                            }}
                            className={`${styles.unavailableBtn} ${
                              values.intervals.length === 0
                                ? styles.unavailableDisabledBtn
                                : undefined
                            }`}
                          >
                            I’m unavailable
                          </div>
                        </div>
                        <div className={styles.container}>
                          <div className={styles.btnWrap}>
                            <button
                              type='button'
                              className={styles.largeBtn}
                              onClick={() =>
                                this.onSubmitValidation(
                                  values,
                                  intervalDate.format('YYYY-MM-DD'),
                                  PeriodsOfDay.SINGLE
                                )
                              }
                            >
                              Apply to {intervalDate.format('DD MMM')} only
                            </button>
                            <button
                              type='button'
                              className={styles.largeBtn}
                              onClick={() =>
                                this.onSubmitValidation(
                                  values,
                                  intervalDate.format('ddd').toLowerCase(),
                                  PeriodsOfDay.ALL
                                )
                              }
                            >
                              Apply to all {intervalDate.format('dddd')}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
    )
  }
}

export default AddIntervalSection
