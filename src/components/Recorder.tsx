import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { selectStartDate, start, stop } from '../redux/recorder-events';
import { appendZeroes } from '../utils/appendZeroes';

import '../styles/Recorder.css';

const Recorder: React.FC = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const intervalRef = useRef<number>(count);

  const dispatch = useDispatch();
  const dateStart = useSelector(selectStartDate);

  const started = dateStart !== '';
  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;
  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  const handleClick = () => {
    if (started) {
      window.clearInterval(intervalRef.current);
      dispatch(stop());
    } else {
      dispatch(start());
      intervalRef.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => window.clearInterval(intervalRef.current);
  }, []);

  return (
    <div className={cx('recorder', { 'recorder-started': started })}>
      <button className="recorder-record" onClick={handleClick}>
        <span></span>
      </button>
      <div className="recorder-counter">
        {appendZeroes(hours)}:{appendZeroes(minutes)}:{appendZeroes(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
