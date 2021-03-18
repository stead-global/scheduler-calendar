/**
 * --------------------------------------------------------------------------
 * Scheduler-calendar : hooks
 * Licensed under MIT (https://github.com/stead-global/scheduler-calendar/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import React from "react";

export function useOnClick(ref: any, handler: any) {
    React.useEffect(() => {
      const listener = (event : any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
  
      document.addEventListener("mousedown", listener);
  
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
  }