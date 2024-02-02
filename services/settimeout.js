
"use client"
import { StateContext } from '@/context/Context';
import { useContext, useEffect } from 'react'

function Settimeout() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
      let timerId;
      if (state.timer > 0) {
          timerId = setInterval(() => {
              setState((prevState) => ({ ...prevState, timer: prevState.timer - 1 }));
          }, 1000);
      }
      return () => {
          clearInterval(timerId);
      };
  }, [state, setState]);
  return null;
}
export default Settimeout;
