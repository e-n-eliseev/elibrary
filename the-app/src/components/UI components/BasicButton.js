import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButton({ textBtn, authed = true, children }) {

  return (
    <Stack spacing={2} direction="row" sx={{
      background: "#FFCA42",
      border: "2px solid #FFCA42",
      borderRadius: "0px",
      margin: "1px"
    }}>
      <Button variant="text" disabled={!authed} >{ children }{ textBtn }</Button>
      {/* <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button> */}
    </Stack>
  );
}
