import React from 'react'
import styles from './TopHeader.module.css'
import ArrowLeftIcon from '../../assets/Icons/ArrowLeftIcon'
import clsx from 'clsx'

interface Props {
  dateRange: string
  onPrev: () => void
  onNext: () => void
  onTodayClick: () => void
  isToday: boolean
  isBefore: boolean
  topHeaderContainerStyle?: string
  topHeaderTitleStyle?: string
}

export default function TopHeader(props: Props) {
  const isLeftDisabled = !props.isBefore ? styles.disableNavigator : undefined
  const isToday = props.isToday
  return (
    <div className={clsx(styles.root, props.topHeaderContainerStyle)}>
      <div
        className={clsx(styles.topHeaderWrap, styles.justifyContentSpaceBtw)}
      >
        <div className={styles.topHeaderDetailedWrap}>
          <span
            className={clsx(
              styles.topHeaderDateRange,
              props.topHeaderTitleStyle
            )}
          >
            {props.dateRange}
          </span>
        </div>
        <div className={styles.topNavigatorsWrapper}>
          {isToday ? (
            <span className={styles.topTodayTitle} onClick={props.onTodayClick}>
              Today
            </span>
          ) : undefined}
          <div className={styles.topHeaderNavigators}>
            <div
              className={clsx(
                styles.navigatorInnerWrap,
                styles.navigatorInnerWrapLeft,
                isLeftDisabled
              )}
              onClick={props.onPrev}
            >
              <span className={clsx(styles.leftArrow, styles.blockSpan)}>
                <ArrowLeftIcon className={styles.leftArrowSvg} />
              </span>
            </div>
            <div
              className={clsx(
                styles.navigatorInnerWrap,
                styles.navigatorInnerWrapRight
              )}
              onClick={props.onNext}
            >
              <span className={clsx(styles.rightArrow, styles.blockSpan)}>
                <ArrowLeftIcon className={styles.leftArrowSvg} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
