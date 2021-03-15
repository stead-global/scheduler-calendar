import React from "react";
import styles from "./TopHeader.module.css";
import ArrowLeftIcon from "../../assets/Icons/ArrowLeftIcon";
import clsx from "clsx";

interface Props {
  dateRange: string;
  onPrev: () => void;
  onNext: () => void;
  onTodayClick: () => void;
  isToday: boolean;
  isBefore: boolean;
  topHeaderContainerStyle?: string;
  topHeaderTitleStyle?: string;
}

export default function TopHeader(props: Props) {
  const isLeftDisabled = !props.isBefore ? styles.disableNavigator : undefined;
  const isToday = props.isToday;
  return (
    <div className={clsx(styles.root, props.topHeaderContainerStyle)}>
      <div className={clsx(styles.topHeaderWrap, styles.justifyContentCenter)}>
        <div className={styles.leftArrowWrap}>
          {isToday ? (
            <div className={styles.todayWrap}>
              <span
                className={styles.topTodayTitle}
                onClick={props.onTodayClick}
              >
                Today
              </span>
            </div>
          ) : undefined}
          <div
            className={clsx(styles.navigatorInnerWrap, isLeftDisabled)}
            onClick={props.onPrev}
          >
            <span className={clsx(styles.leftArrow, styles.blockSpan)}>
              <ArrowLeftIcon className={styles.leftArrowSvg} />
            </span>
          </div>
        </div>
        <div className={clsx(styles.titleWrap, styles.justifyContentCenter)}>
          <div
            className={clsx(
              styles.topHeaderDateRange,
              props.topHeaderTitleStyle
            )}
          >
            {props.dateRange}
          </div>
        </div>
        <div className={clsx(styles.navigatorInnerWrap)} onClick={props.onNext}>
          <span className={clsx(styles.rightArrow, styles.blockSpan)}>
            <ArrowLeftIcon className={styles.leftArrowSvg} />
          </span>
        </div>
      </div>
    </div>
  );
}
