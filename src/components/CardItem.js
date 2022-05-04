import { React, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import ls from 'local-storage';
import { useSelector } from 'react-redux';
import { convert_time } from '../utils/common';
import noImage from '../assets/placeholder.png';

function createData(betNum, team, logo, spread, total, ml) {
  return { betNum, team, logo, spread, total, ml };
}

export default function AcccessibleTable({ item, index, style }) {
  const teams = useSelector(state => state.team.teams);
  const odds = useSelector(state => state.team.odds);

  const [cornerShow, setCornerShow] = useState([]);
  const [rows, setRows] = useState([]);

  const font = style.font_body;
  const color = style.color_body;
  const event_time = convert_time(item.GameDateTime);

  const useStyles = makeStyles(theme => ({
    table_cell: {
      fontFamily: font && font.fontFamily + ', sans-serif',
      fontSize: font && font.size,
      color: color,
      ...(font && font.fontStyle),
    },
    in: {
      padding: 8,
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    const temp = [
      createData(
        item.VisitorNumber,
        item.VisitorTeam.TeamName,
        teams && teams[item.VisitorTeam.TeamName]?.logo,
        [item.GameLine.VSpreadPoints, item.GameLine.VSpreadOdds],
        [item.GameLine.Over, item.GameLine.OverOdds],
        item.GameLine.VOdds
      ),
      createData(
        item.HomeNumber,
        item.HomeTeam.TeamName,
        teams && teams[item.HomeTeam.TeamName]?.logo,
        [item.GameLine.HSpreadPoints, item.GameLine.HSpreadOdds],
        [item.GameLine.Under, item.GameLine.UnderOdds],
        item.GameLine.HOdds
      ),
    ];
    setRows(temp);
    if (odds && odds.length > 0) {
      const visitor = item.VisitorTeam.TeamName;
      const home = item.HomeTeam.TeamName;
      const vShow = odds.find(x => x.name === visitor).show;
      const hShow = odds.find(x => x.name === home).show;
      setCornerShow([vShow, hShow]);
    }
  }, [odds]);

  return (
    <TableContainer className='event-table'>
      <Table>
        {!index && (
          <TableHead>
            <TableRow>
              <TableCell className={classes.table_cell} style={{ textAlign: 'center' }}>
                Logo
              </TableCell>
              <TableCell className={classes.table_cell}>TEAM</TableCell>
              <TableCell className={classes.table_cell}>BET #</TableCell>
              <TableCell className={`game-line ${classes.table_cell}`}>M/L</TableCell>
              <TableCell className={`game-line ${classes.table_cell}`}>Total</TableCell>
              <TableCell className={`game-line ${classes.table_cell}`}>Spread</TableCell>
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className='no-boder' hover>
              <TableCell>
                <img src={row.logo && row.logo.includes('http') ? row.logo : noImage} width={50} height={50} />
              </TableCell>

              <TableCell className={`team ${classes.table_cell}`} style={{ fontWeight: 600 }}>
                {row.team} {!i && <span style={{ fontSize: '10px' }}> @</span>}
              </TableCell>

              <TableCell className={classes.table_cell}>{row.betNum}</TableCell>

              <TableCell className={`game-line corner ${classes.table_cell} ${!row.ml && 'hide'}`}>
                {row.ml && cornerShow[i] !== 0 && (
                  <div className={`${i === 0 ? 'triangle-top' : 'triangle-bottom'} ${cornerShow[i] > 0 ? 'blue' : 'red'}`}></div>
                )}
                {row.ml > 0 ? '+' + row.ml : row.ml}
              </TableCell>

              <TableCell className={`game-line ${classes.table_cell}`}>
                {i === 0 && row.total.length > 0 && <div style={{ fontWeight: 600 }}>{'O ' + row.total[0]}</div>}
                {i === 0 && row.total.length > 0 && <div>{row.total[1]}</div>}

                {i === 1 && row.total.length > 0 && <div style={{ fontWeight: 600 }}>{'U ' + row.total[0]}</div>}
                {i === 1 && row.total.length > 0 && <div>{row.total[1]}</div>}
              </TableCell>
              <TableCell className={`game-line ${classes.table_cell}`}>
                {i === 0 && row.spread.length > 0 && <div style={{ fontWeight: 600 }}>{row.spread[0] > 0 ? '+' + row.spread[0] : row.spread[0]}</div>}
                {i === 0 && row.spread.length > 0 && <div>{row.spread[1] > 0 ? '+' + row.spread[1] : row.spread[1]}</div>}

                {i === 1 && row.spread.length > 0 && <div style={{ fontWeight: 600 }}>{row.spread[0] > 0 ? '+' + row.spread[0] : row.spread[0]}</div>}
                {i === 1 && row.spread.length > 0 && <div>{row.spread[1] > 0 ? '+' + row.spread[1] : row.spread[1]}</div>}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className='boder'>
            <TableCell className='event-timer' colSpan={2}>
              {event_time}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
