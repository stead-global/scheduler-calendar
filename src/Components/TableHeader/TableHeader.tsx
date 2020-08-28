import React from 'react'
import styles from './TableHeader.module.css'

export default function TableHeader() {
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  function renderDays() {
    return DAYS.map((day) => (
      <th key={day}>
        <span className={styles.dayStyles}>{day}</span>
      </th>
    ))
  }

  return <tr>{renderDays()}</tr>
}
