'use client';

import * as React from 'react';
import { Fragment } from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useActions, useUIState } from 'ai/rsc';
import type { AI } from '../../app/action';

export default function BasicRating({ rating }: {rating: number}) {

  const [value, setValue] = React.useState<number | null>(rating);

  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  
  async function submitRating() {
    const response = await submitUserMessage('submit rating');
    setMessages(currentMessages => [...currentMessages, response]);
}

  return (
    <Fragment>
        <Stack spacing={2} alignItems={"flex-start"}>
            <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            />        
            <Button variant="contained" size="small" onClick={submitRating}>Bewertung abgeben</Button>
        </Stack>
    </Fragment>
    );
}