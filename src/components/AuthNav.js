import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    padding: 12,
    fontWeight: 700,
    color: '#2A363B',
  },
  activeLink: {
    color: '#E84A5F',
  },
};

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/register"
        style={styles.link}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        style={styles.link}
      >
        Login
      </NavLink>
    </div>
  );
}