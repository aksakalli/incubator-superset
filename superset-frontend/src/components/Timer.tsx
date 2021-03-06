/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, useState } from 'react';
import Label from 'src/components/Label';

import { now, fDuration } from '../modules/dates';

interface TimerProps {
  endTime?: number;
  isRunning: boolean;
  startTime?: number;
  status?: string;
}

export default function Timer({
  endTime,
  isRunning,
  startTime,
  status = 'success',
}: TimerProps) {
  const [clockStr, setClockStr] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(undefined);
    }
  };

  const stopwatch = () => {
    if (startTime) {
      const endDttm = endTime || now();
      if (startTime < endDttm) {
        setClockStr(fDuration(startTime, endDttm));
      }
      if (!isRunning) {
        stopTimer();
      }
    }
  };

  const startTimer = () => {
    setTimer(setInterval(stopwatch, 30));
  };

  useEffect(() => {
    if (isRunning) {
      startTimer();
    }
  }, [isRunning]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  });

  return (
    <Label id="timer" bsStyle={status}>
      {clockStr}
    </Label>
  );
}
