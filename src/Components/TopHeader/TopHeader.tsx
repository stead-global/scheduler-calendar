import React from 'react'
import styles from './TopHeader.module.css'
import ArrowLeftIcon from '../../assets/Icons/ArrowLeftIcon'

interface Props {
  dateRange: string
  onPrev: () => void
  onNext: () => void
  onTodayClick: () => void
  isToday: boolean
  isBefore: boolean
}

export default function TopHeader(props: Props) {
  const isLeftDisabled = !props.isBefore ? styles.disableNavigator : undefined
  const isToday = props.isToday
  return (
    <div className={styles.root}>
      <div
        className={`${styles.topHeaderWrap} ${styles.justifyContentSpaceBtw}`}
      >
        <div className={styles.topHeaderDetailedWrap}>
          <span className={styles.topHeaderDateRange}>{props.dateRange}</span>
        </div>
        <div className={styles.topNavigatorsWrapper}>
          {isToday ? (
            <span className={styles.topTodayTitle} onClick={props.onTodayClick}>
              Today
            </span>
          ) : undefined}
          <div className={styles.topHeaderNavigators}>
            <div
              className={`${styles.navigatorInnerWrap} ${isLeftDisabled}`}
              onClick={props.onPrev}
            >
              <span className={`${styles.leftArrow} ${styles.blockSpan} `}>
                <ArrowLeftIcon />
              </span>
            </div>
            <div className={styles.navigatorInnerWrap} onClick={props.onNext}>
              <span className={`${styles.rightArrow} ${styles.blockSpan}`}>
                <ArrowLeftIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
