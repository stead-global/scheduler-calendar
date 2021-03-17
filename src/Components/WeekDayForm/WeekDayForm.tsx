/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : WeekDayForm.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from "react";
import styles from "./WeekDayForm.module.css";
import { TickSvg } from "../../assets/Icons/TickSvg";
import clsx from "clsx";
import moment from "moment";
import { AddSvg } from "../../assets/Icons/AddSvg";

interface Props {
  className?: string;
  onFormSubmit: (value: string[]) => void;
  onBack: () => void;
}

type WeekDays = {
  id: number;
  label: string;
  value: boolean;
};

export default function WeekDayForm(props: Props) {
  const [state, setState] = React.useState<boolean>(false);
  const [btnDisable, setBtnDisable] = React.useState<boolean>(true);
  const [days, setDays] = React.useState<WeekDays[]>([
    { id: 0, label: "Sunday", value: false },
    { id: 1, label: "Monday", value: false },
    { id: 2, label: "Tuesday", value: false },
    { id: 3, label: "Wednesday", value: false },
    { id: 4, label: "Thursday", value: false },
    { id: 5, label: "Friday", value: false },
    { id: 6, label: "Saturday", value: false },
  ]);

  const isButtonDisable = (week: WeekDays[]) => {
    let disable: boolean = true;
    week.every((item: WeekDays) => {
      if (item.value) {
        disable = false;
        return false;
      }
      return true;
    });
    return disable;
  };

  const onFormSubmit = (value: WeekDays[]) => {
    const weeks: string[] = [];
    value.forEach((item: WeekDays) => {
      if (item.value) {
        weeks.push(moment(item.label, "dddd").format("ddd").toLowerCase());
      }
    });
    props.onFormSubmit(weeks);
  };

  const handleSubmit = () => {
    const disable = isButtonDisable(days);
    setBtnDisable(disable);
    if (!disable) {
      onFormSubmit(days);
    }
  };

  const handleChange = (event: any) => {
    const week = days
    week[Number(event.target.value)].value = event.target.checked
    setDays(week)
    setState(!state)
    const disable = isButtonDisable(week)
    setBtnDisable(disable)
  };

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.choiceWrap}>
        {days.map((item: WeekDays) => {
          return (
            <label className={styles.lableWrap} key={item.id + ""}>
              {item.label}
              <input
                type={"checkbox"}
                onChange={handleChange}
                value={item.id}
              />
              <span className={styles.checkIcon}>
                <AddSvg className={styles.addSvg} />
                <TickSvg className={styles.tickSvg} />
              </span>
            </label>
          );
        })}
      </div>
      <div className={styles.btnWrap}>
      <button
          type="button"
          className={clsx(styles.btn, styles.secondary)}
          onClick={props.onBack}
        >
          Back
        </button>
        <button
          type="button"
          className={clsx(styles.btn, btnDisable && styles.disableBtn, styles.primary)}
          onClick={handleSubmit}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
