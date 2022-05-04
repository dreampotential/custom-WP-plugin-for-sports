import React from 'react';
import Grid from '@mui/material/Grid';
import Item from './CardItem';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export default function EventCard({ event, leagues }) {
  const style = useSelector(state => state.ui.style);
  const font = style.font_heading;

  return (
    <Grid container spacing='6'>
      <Grid
        item
        xs={12}
        style={{
          textAlign: 'center',
        }}
        p={1}
        className='card_heading'
      >
        <Typography
          gutterBottom
          variant='h3'
          component='div'
          fontWeight={600}
          color={style && style.color_heading}
          fontSize={font && font.size}
          fontFamily={font && font.fontFamily + ', sans-serif'}
          {...(font && font.fontStyle)}
        >
          {leagues[event[0].LeagueId]}
        </Typography>
      </Grid>

      {event.map((e, i) => (
        <Grid item xs={12} key={i}>
          <Item item={e} index={i} style={style} />
        </Grid>
      ))}
    </Grid>
  );
}
