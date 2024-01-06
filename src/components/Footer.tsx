import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Link, Container, Grid, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseOver = (index) => {
    setHovered(index);
  };

  const handleMouseOut = () => {
    setHovered(null);
  };

  const imageLinks = [
    '/images/pinzu/pinzu1.png',
    '/images/pinzu/pinzu2.png',
    '/images/pinzu/pinzu3.png',
    '/images/pinzu/pinzu4.png',
    '/images/pinzu/pinzu5.png',
  ];

  const links = [
    '/',
    '/calculator',
    '/login',
    '/player',
    '/timeline',
  ];

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, minHeight: 'calc(100vh - 50px)', overflowY: 'auto' }}>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#f0f0f0', zIndex: 1000 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          {[1, 2, 3, 4, 5].map((index) => (
            <Link
              key={index}
              component={RouterLink}
              to={links[index - 1]}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
              style={{ textDecoration: 'none' }}
            >
              <img
                src={imageLinks[index - 1]}  // indexは1から始まるため、配列のインデックスに変換
                alt={`Link ${index}`}
                style={{
                  width: '50px',
                  height: '50px',
                  filter: hovered === index ? 'brightness(0%)' : 'none',
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
