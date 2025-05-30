"use client";

import { useRef } from 'react';
import useLayoutEffect from "rc-util/es/hooks/useLayoutEffect";
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import useResponsiveObserver from '../../_util/responsiveObserver';
function useBreakpoint() {
  let refreshOnChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  let defaultScreens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const screensRef = useRef(defaultScreens);
  const forceUpdate = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();
  useLayoutEffect(() => {
    const token = responsiveObserver.subscribe(supportScreens => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });
    return () => responsiveObserver.unsubscribe(token);
  }, []);
  return screensRef.current;
}
export default useBreakpoint;