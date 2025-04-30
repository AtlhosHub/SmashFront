import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

export default function ActionMenu({ menuOptions }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (action) => {
    console.log(`Selecionou: ${action}`);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="ações"
        id="action-menu-button"
        aria-controls={open ? 'action-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '180px',
            borderRadius: '10px',
            border: '1px solid #D9D9D9',
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'action-menu-button',
        }}
      >
        {menuOptions.map((opt) => (
          <MenuItem key={opt.label} onClick={() => handleSelect(opt.label)}>
            <ListItemIcon sx={{ color: '#2C2C2C' }}>
              {opt.icon}
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ style: { color: '#2C2C2C' } }}>
              {opt.label}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}