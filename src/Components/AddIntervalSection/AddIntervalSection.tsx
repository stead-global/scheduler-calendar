/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : AddIntervalSection.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

/* eslint-disable react/jsx-boolean-value */
import React from "react";
import styles from "./AddIntervalSection.module.css";
import clsx from "clsx";
import { Formik, FieldArray, Field } from "formik";
import moment from "moment";
import { getTimeFromText } from "../../Utils";
// eslint-disable-next-line no-unused-vars
import { AvailabilityIntervals, Availabilities } from "../../Interfaces";
import { AddSvg } from "../../assets/Icons/AddSvg";
import WeekDayForm from "../WeekDayForm/WeekDayForm";
import CloseSvg from "../../assets/Icons/CloseSvg";

interface Props {
  onClose: () => void;
  onFormSubmit: (value: Availabilities[], period: PeriodsOfDay) => void;
  intervalDetails: any;
  formValues: AvailabilityIntervals[];
  is24hour: boolean;
}

interface State {
  errors: any;
  isApplyToMultiple: boolean;
}

export enum PeriodsOfDay {
  // eslint-disable-next-line no-unused-vars
  SINGLE = "singleDay",
  // eslint-disable-next-line no-unused-vars
  ALL = "allDay",
}

class AddIntervalSection extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errors: {} as any,
      isApplyToMultiple: false,
    } as State;
  }

  handleSubmit = (values: any, day: string[], period: PeriodsOfDay) => {
    const intervals = values.intervals;
    const availabilities = day.map((item: string) => {
      return {
        day: item,
        slots: intervals,
      };
    });
    this.props.onFormSubmit(availabilities, period);
  };

  validateIntervals = (interval: any, values: any) => {
    const duration = this.props.intervalDetails.duration;

    if (!interval.from && !interval.to) {
      return "Start time cannot be blank.";
    }

    if (interval.from && !interval.to) {
      return "End time cannot be blank.";
    }

    const startTime = this.props.is24hour
      ? moment(interval.from, "HH:mm")
      : moment(interval.from, "hh:mm a");
    const endTime = this.props.is24hour
      ? moment(interval.to, "HH:mm")
      : moment(interval.to, "hh:mm a");

    const durationDiffrnc = endTime.diff(startTime, "minutes");

    if (durationDiffrnc < duration && durationDiffrnc >= 0) {
      return `Intervals must be at least ${duration} minutes.`;
    }

    if (durationDiffrnc < 0) {
      return `Your end time cannot be before your start time.`;
    }

    let errorMsg = "";

    values.forEach((item: any) => {
      const start = this.props.is24hour
        ? moment(item.from, "HH:mm")
        : moment(item.from, "hh:mm a");
      const end = this.props.is24hour
        ? moment(item.to, "HH:mm")
        : moment(item.to, "hh:mm a");
      if (endTime.isAfter(start) && startTime.isBefore(end)) {
        errorMsg = "Intervals are overlapping.";
      }
    });

    return errorMsg;
  };

  onSubmitValidation = (
    values: any,
    day?: string[],
    period?: PeriodsOfDay,
    isMulti?: boolean
  ) => {
    const error: any = this.state.errors;

    if (values.intervals.length > 0) {
      error.intervals = new Array(values.intervals.length).fill("");

      values.intervals.forEach((item: any, index: number) => {
        const currentIndex = index; // indexOfCurrentInterval
        const filteredIntervals = values.intervals.filter(
          (_time: any, index: number) => index !== currentIndex
        );
        error.intervals[index] = this.validateIntervals(
          item,
          filteredIntervals
        );
      });
    }

    const isEmpty =
      error.intervals &&
      error.intervals.filter((item: any) => item !== "").length === 0;
    if (isEmpty) {
      error.intervals = [];
    }

    if ((error.intervals && error.intervals.length === 0) || !error.intervals) {
      if (isMulti) {
        this.setState({ isApplyToMultiple: true });
      } else if (day && period) {
        this.handleSubmit(values, day, period);
      }
    }
    this.setState({ errors: error });
  };

  resetAllErrorField = () => {
    // set errors as empty
    this.setState({
      errors: {},
    });
  };

  resetErrorField = (index: number) => {
    const errors = this.state.errors;
    if (errors.intervals && errors.intervals[index]) {
      errors.intervals[index] = "";
      this.setState({
        errors,
      });
    }
  };

  _renderIntervalSection = () => {
    const { errors, isApplyToMultiple} = this.state;

    const intervalDate = moment(this.props.intervalDetails.day);

    const validate = (values: any) => {
      this.onSubmitValidation(values);
      const value: any = values;
      value.intervals &&
        value.intervals.forEach((item: any) => {
          item.from = getTimeFromText(item.from, this.props.is24hour);
          item.to = getTimeFromText(item.to, this.props.is24hour);
        });
    };
    return (
      <Formik
        initialValues={{
          intervals: JSON.parse(JSON.stringify([...this.props.formValues])),
        }}
        validateOnBlur={true}
        validateOnChange={false}
        validate={validate}
        onSubmit={() => {}}
      >
        {({ values, handleChange, handleBlur, setFieldValue }: any) => {
          return (
            <form noValidate>
              {!isApplyToMultiple ? (
                  <div className={styles.intervalContainer}>
                    <div className={styles.modalTitle}>Edit Availability</div>
                    <FieldArray
                      name="intervals"
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
                                  onFocus={() => this.resetErrorField(index)}
                                  value={values.intervals[index].from}
                                  placeholder={
                                    this.props.is24hour ? "HH:mm" : "hh:mm am"
                                  }
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
                                  onFocus={() => this.resetErrorField(index)}
                                  value={values.intervals[index].to}
                                  placeholder={
                                    this.props.is24hour ? "HH:mm" : "hh:mm am"
                                  }
                                />
                                <div
                                  className={styles.deleteIcon}
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                    this.resetErrorField(index);
                                  }}
                                >
                                  <CloseSvg />
                                </div>
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
                                arrayHelpers.push({ from: "", to: "" });
                              }}
                              className={styles.addBtn}
                            >
                              <AddSvg /> new interval
                            </div>
                          </div>
                          <div className={styles.unavailableBtnWrap}>
                            <div
                              onClick={() => {
                                setFieldValue("intervals", []);
                                this.resetAllErrorField();
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
                          <div className={styles.container}>
                            <div className={styles.btnWrap}>
                              <div className={styles.btnInnerWrap}>
                                <button
                                  type="button"
                                  className={styles.largeBtn}
                                  onClick={() =>
                                    this.onSubmitValidation(
                                      values,
                                      [intervalDate.format("YYYY-MM-DD")],
                                      PeriodsOfDay.SINGLE
                                    )
                                  }
                                >
                                  Apply to {intervalDate.format("DD MMM")} only
                                </button>
                                <button
                                  type="button"
                                  className={styles.largeBtn}
                                  onClick={() =>
                                    this.onSubmitValidation(
                                      values,
                                      [
                                        intervalDate
                                          .format("ddd")
                                          .toLowerCase(),
                                      ],
                                      PeriodsOfDay.ALL
                                    )
                                  }
                                >
                                  Apply to all {intervalDate.format("dddd")}
                                </button>
                              </div>
                              <button
                                type="button"
                                className={styles.applyMultiple}
                                onClick={() =>
                                  this.onSubmitValidation(
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
                        </div>
                      )}
                    />
                  </div> ) :
                (<div className={styles.applyContainer}>
                  <div className={styles.applyTitle}>Apply to multiple</div>
                  <div className={styles.applyInnerContainer}>
                    <WeekDayForm
                      onBack={() => {
                        this.setState({ isApplyToMultiple: false });
                      }}
                      onFormSubmit={(days: string[]) => {
                        this.handleSubmit(values, days, PeriodsOfDay.ALL);
                      }}
                    />
                  </div>
                </div>)}
            </form>
          );
        }}
      </Formik>
    );
  };

  render() {
    return <div className={styles.root}>{this._renderIntervalSection()}</div>;
  }
}

export default AddIntervalSection;
