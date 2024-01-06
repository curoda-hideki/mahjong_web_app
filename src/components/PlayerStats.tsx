import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@material-ui/core';

// ヘッダーの高さを取得
const headerHeight = document.getElementById('header')?.offsetHeight || 0;

const PlayerStats = () => {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, marginTop: headerHeight + 70 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            プレイヤー名
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="対局数: 10" />
            </ListItem>
            <ListItem>
              <ListItemText primary="平均着順: 2.5" />
            </ListItem>
            <ListItem>
              <ListItemText primary="1位の平均着順: 1.2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="2位の平均着順: 2.8" />
            </ListItem>
            <ListItem>
              <ListItemText primary="3位の平均着順: 3.5" />
            </ListItem>
            <ListItem>
              <ListItemText primary="4位の平均着順: 4.0" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerStats;
