/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : AddIntervalSection.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import React, { useRef } from 'react'
import styles from './AddIntervalSection.module.css'
import clsx from 'clsx'
import { Formik, FieldArray, Field } from 'formik'
import moment from 'moment'
import { getTimeFromText } from '../../Utils'
import { AvailabilityIntervals, Availabilities } from '../../Interfaces'
import { AddSvg } from '../../assets/Icons/AddSvg'
import WeekDayForm from '../WeekDayForm/WeekDayForm'
import CloseSvg from '../../assets/Icons/CloseSvg'
import CommentSvg from '../../assets/Icons/CommentSvg'

interface Props {
  onClose: () => void
  onFormSubmit: (value: Availabilities[], period: PeriodsOfDay) => void
  intervalDetails: any
  formValues: AvailabilityIntervals[]
  is24hour: boolean
  comment?: string
  isCommentEnabled?: boolean
  isEditEnabled?: boolean
}

interface State {
  errors?: any
  isApplyToMultiple?: boolean
}

export enum PeriodsOfDay {
  // eslint-disable-next-line no-unused-vars
  SINGLE = 'singleDay',
  // eslint-disable-next-line no-unused-vars
  ALL = 'allDay'
}

export default function AddIntervalSection(props: Props) {
  const [state, setState] = React.useState<State>({
    errors: {} as any,
    isApplyToMultiple: false
  })

  const textRef = useRef<any>()
  const containerTextRef = useRef<any>()
  const commentBtnRef = useRef<any>()

  const handleSubmit = (values: any, day: string[], period: PeriodsOfDay) => {
    const intervals = values.intervals
    const availabilities = day.map((item: string) => {
      return {
        day: item,
        slots: intervals,
        comment: values.comment
      }
    })
    props.onFormSubmit(availabilities, period)
  }

  const validateIntervals = (interval: any, values: any) => {
    const duration = props.intervalDetails.duration

    if (!interval.from && !interval.to) {
      return 'Start time cannot be blank.'
    }

    if (interval.from && !interval.to) {
      return 'End time cannot be blank.'
    }

    const startTime = props.is24hour
      ? moment(interval.from, 'HH:mm')
      : moment(interval.from, 'hh:mm a')
    const endTime = props.is24hour
      ? moment(interval.to, 'HH:mm')
      : moment(interval.to, 'hh:mm a')

    const durationDiffrnc = endTime.diff(startTime, 'minutes')

    if (durationDiffrnc < duration && durationDiffrnc >= 0) {
      return `Intervals must be at least ${duration} minutes.`
    }

    if (durationDiffrnc < 0) {
      return `Your end time cannot be before your start time.`
    }

    let errorMsg = ''

    values.forEach((item: any) => {
      const start = props.is24hour
        ? moment(item.from, 'HH:mm')
        : moment(item.from, 'hh:mm a')
      const end = props.is24hour
        ? moment(item.to, 'HH:mm')
        : moment(item.to, 'hh:mm a')
      if (endTime.isAfter(start) && startTime.isBefore(end)) {
        errorMsg = 'Intervals are overlapping.'
      }
    })

    return errorMsg
  }

  const onSubmitValidation = (
    values: any,
    day?: string[],
    period?: PeriodsOfDay,
    isMulti?: boolean
  ) => {
    const error: any = state.errors

    if (values.intervals.length > 0) {
      error.intervals = new Array(values.intervals.length).fill('')

      values.intervals.forEach((item: any, index: number) => {
        const currentIndex = index // indexOfCurrentInterval
        const filteredIntervals = values.intervals.filter(
          (_time: any, index: number) => index !== currentIndex
        )
        error.intervals[index] = validateIntervals(item, filteredIntervals)
      })
    }

    const isEmpty =
      error.intervals &&
      error.intervals.filter((item: any) => item !== '').length === 0
    if (isEmpty) {
      error.intervals = []
    }

    if ((error.intervals && error.intervals.length === 0) || !error.intervals) {
      if (isMulti) {
        setState({ isApplyToMultiple: true })
      } else if (day && period) {
        handleSubmit(values, day, period)
      }
    }
    setState({ errors: error })
  }

  const resetAllErrorField = () => {
    // set errors as empty
    setState({
      errors: {}
    })
  }

  const resetErrorField = (index: number) => {
    const errors = state.errors
    if (errors.intervals && errors.intervals[index]) {
      errors.intervals[index] = ''
      setState({
        errors
      })
    }
  }

  const _renderIntervalSection = () => {
    const { errors, isApplyToMultiple } = state

    const intervalDate = moment(props.intervalDetails.day)

    const validate = (values: any) => {
      onSubmitValidation(values)
      const value: any = values
      value.intervals &&
        value.intervals.forEach((item: any) => {
          item.from = getTimeFromText(item.from, props.is24hour)
          item.to = getTimeFromText(item.to, props.is24hour)
        })
    }
    console.log(props.isEditEnabled, 'props.isEditEnabled')
    return (
      <Formik
        initialValues={{
          intervals: JSON.parse(JSON.stringify([...props.formValues])),
          comment: props.comment ? props.comment : ''
        }}
        validateOnBlur={true}
        validateOnChange={false}
        validate={validate}
        onSubmit={() => {}}
        disableSubmit={!props.isEditEnabled}
      >
        {({ values, handleChange, handleBlur, setFieldValue }: any) => {
          return (
            <form noValidate>
              {!isApplyToMultiple ? (
                <div className={styles.intervalContainer}>
                  <div className={styles.modalTitle}>
                    {`${props.isEditEnabled ? 'Edit' : 'View'}`} Availability
                  </div>
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
                            <div className={styles.form}>
                              <Field
                                className={clsx(
                                  styles.timeInput,
                                  styles.marginRight10,
                                  errors.intervals && errors.intervals[index]
                                    ? styles.error
                                    : undefined
                                )}
                                name={`intervals[${index}].from`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onFocus={() => resetErrorField(index)}
                                value={values.intervals[index].from}
                                placeholder={
                                  props.is24hour ? 'HH:mm' : 'hh:mm am'
                                }
                                disabled={!props.isEditEnabled}
                              />
                              <Field
                                className={clsx(
                                  styles.timeInput,
                                  styles.marginRight10,
                                  errors.intervals && errors.intervals[index]
                                    ? styles.error
                                    : undefined
                                )}
                                name={`intervals[${index}].to`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onFocus={() => resetErrorField(index)}
                                value={values.intervals[index].to}
                                placeholder={
                                  props.is24hour ? 'HH:mm' : 'hh:mm am'
                                }
                                disabled={!props.isEditEnabled}
                              />
                              {props.isEditEnabled && (
                                <div
                                  className={styles.deleteIcon}
                                  onClick={() => {
                                    arrayHelpers.remove(index)
                                    resetErrorField(index)
                                  }}
                                >
                                  <CloseSvg />
                                </div>
                              )}
                            </div>
                            {props.isEditEnabled &&
                              errors.intervals &&
                              errors.intervals[index] && (
                                <div className={styles.errorMsg}>
                                  {errors.intervals[index]}
                                </div>
                              )}
                          </div>
                        ))}
                        {values.intervals.length === 0 ? (
                          <div className={styles.emptyWrap}>unavailable</div>
                        ) : undefined}
                        <div
                          className={clsx(
                            styles.container,
                            styles.intervalContainerWrap
                          )}
                        >
                          {props.isEditEnabled ? (
                            <div
                              onClick={() => {
                                arrayHelpers.push({ from: '', to: '' })
                              }}
                              className={styles.addBtn}
                            >
                              <AddSvg /> new interval
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {props.isCommentEnabled && (
                            <div
                              ref={commentBtnRef}
                              onClick={() => {
                                commentBtnRef.current.classList.toggle(
                                  styles.isFocus
                                )
                                containerTextRef.current.classList.toggle(
                                  styles.collapsed
                                )
                              }}
                              className={styles.commentBtn}
                            >
                              <CommentSvg className={styles.commentSvg} />{' '}
                              Comment
                            </div>
                          )}
                        </div>
                        <div
                          ref={containerTextRef}
                          className={clsx(styles.commentBoxWrap)}
                        >
                          <div className={styles.commentArrow}>
                            <div className={styles.commentArrowInner} />
                          </div>
                          <textarea
                            ref={textRef}
                            className={styles.textArea}
                            name='comment'
                            value={values.comment}
                            onChange={handleChange}
                            onBlur={(e: any) => {
                              handleBlur(e)
                              containerTextRef.current &&
                                containerTextRef.current.classList.remove(
                                  styles.isFocus
                                )
                            }}
                            onFocus={() => {
                              containerTextRef.current &&
                                containerTextRef.current.classList.add(
                                  styles.isFocus
                                )
                            }}
                            placeholder='Add your comment here...'
                            disabled={!props.isEditEnabled}
                          ></textarea>
                        </div>
                        {props.isEditEnabled && (
                          <div className={styles.unavailableBtnWrap}>
                            <div
                              onClick={() => {
                                setFieldValue('intervals', [])
                                resetAllErrorField()
                              }}
                              className={clsx(
                                styles.unavailableBtn,
                                values.intervals.length === 0
                                  ? styles.unavailableDisabledBtn
                                  : undefined
                              )}
                            >
                              I’m unavailable
                            </div>
                          </div>
                        )}
                        {props.isEditEnabled && (
                          <div className={styles.container}>
                            <div className={styles.btnWrap}>
                              <div className={styles.btnInnerWrap}>
                                <button
                                  type='button'
                                  className={styles.largeBtn}
                                  onClick={() =>
                                    onSubmitValidation(
                                      values,
                                      [intervalDate.format('YYYY-MM-DD')],
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
                                    onSubmitValidation(
                                      values,
                                      [
                                        intervalDate.format('ddd').toLowerCase()
                                      ],
                                      PeriodsOfDay.ALL
                                    )
                                  }
                                >
                                  Apply to all {intervalDate.format('dddd')}
                                </button>
                              </div>
                              <button
                                type='button'
                                className={styles.applyMultiple}
                                onClick={() =>
                                  onSubmitValidation(
                                    values,
                                    [],
                                    PeriodsOfDay.ALL,
                                    true
                                  )
                                }
                              >
                                or apply to multiple
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
              ) : (
                <div className={styles.applyContainer}>
                  <div className={styles.applyTitle}>Apply to multiple</div>
                  <div className={styles.applyInnerContainer}>
                    <WeekDayForm
                      onBack={() => {
                        setState({ isApplyToMultiple: false })
                      }}
                      onFormSubmit={(days: string[]) => {
                        handleSubmit(values, days, PeriodsOfDay.ALL)
                      }}
                    />
                  </div>
                </div>
              )}
            </form>
          )
        }}
      </Formik>
    )
  }

  return <div className={styles.root}>{_renderIntervalSection()}</div>
}
