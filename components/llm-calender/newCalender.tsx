'use client';

import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import Button from '@mui/material/Button';
import { Fragment } from 'react';
import { useActions, useUIState } from 'ai/rsc';
import type { AI } from '../../app/action';
import { DateRange } from '@mui/x-date-pickers-pro/internals/models/range';
import dayjs, { Dayjs } from 'dayjs';

export default function Calendar({ fromDate, toDate }: { fromDate: any; toDate: any }) {

    console.log("fromDate: " + fromDate);
    console.log("toDate: " + toDate);

    const [value, setValue] = React.useState<DateRange<Dayjs>>([
        dayjs(fromDate),
        dayjs(toDate),
      ]);

    const [, setMessages] = useUIState<typeof AI>();
    const { submitUserMessage } = useActions<typeof AI>();

    async function submitHours() {
        const response = await submitUserMessage('submit hours');
        setMessages(currentMessages => [...currentMessages, response]);
    }

  return (
    <Fragment>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangeCalendar']}>
            <DateRangeCalendar 
                value={value}
                onChange={(newValue) => setValue(newValue)}/>
        </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" onClick={submitHours}>Arbeitsstunden eintragen</Button>
    </Fragment>
  );
}