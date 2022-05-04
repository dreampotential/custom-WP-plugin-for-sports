import React, { useState, useEffect } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { switch_sidebar } from '../_actions/ui_actions';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function Sidebar({ contents, leaguesByGroup }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [groupId, setSelectedGroupId] = useState(1);
  const [style, setstyle] = useState({});

  const ui = useSelector(state => state.ui);
  const view = ui.view.mode;

  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    ui.style && setstyle(ui.style);
    switch (view) {
      case 'home':
        setSelectedIndex(null);
        setRows(Object.assign({ 0: 'LEAGUE GROUPS' }, contents));
        break;

      case 'league':
        setSelectedIndex(1);
        const head = contents[groupId];
        const groups = leaguesByGroup[groupId];
        setRows(Object.assign({ 0: head }, groups));
        break;

      default:
        break;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents, groupId, view, ui]);

  const handleClick = (e, gId, index) => {
    setSelectedIndex(index);
    setSelectedGroupId(gId);

    if (view === 'home') {
      const defaultLeague = Object.keys(leaguesByGroup[gId])[0];
      dispatch(switch_sidebar({ mode: 'league', id: defaultLeague }));
    } else {
      dispatch(switch_sidebar({ mode: 'events', id: gId }));
    }
  };

  const backTo = () => {
    console.log('back');
    dispatch(switch_sidebar({ mode: 'home', id: groupId }));
  };

  const Sidebar = () => (
    <List>
      {Object.keys(rows).map((key, index) => (
        <ListItem
          button={index !== 0}
          key={index}
          selected={selectedIndex === index}
          divider
          onClick={e => {
            if (!index) return;
            handleClick(e, key, index);
          }}
        >
          {view !== 'home' && !index && (
            <ListItemIcon style={{ cursor: 'pointer', justifyContent: 'center' }} onClick={backTo}>
              <KeyboardBackspaceIcon sx={{ fontSize: '1.5rem' }} />
            </ListItemIcon>
          )}

          <ListItemText
            primary={rows[key]}
            primaryTypographyProps={{
              fontWeight: index === 0 ? '700' : 'normal',
              fontFamily: style.font_sidebar?.fontFamily + ', sans-serif',
              fontSize: style.font_sidebar?.size,
              color: style.color_body,
              ...style.font_sidebar?.fontStyle,
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return <Sidebar />;
}
