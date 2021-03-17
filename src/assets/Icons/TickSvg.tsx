/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : TickSvg.tsx
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import * as React from "react";

interface Props {
  className?: string;
}

export const TickSvg: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width={14}
      height={10}
      viewBox="0 0 14 10"
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>Tick Icon</title>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M12 2L5.75 8.25 2 4.5"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
