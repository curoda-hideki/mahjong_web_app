import React from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center', // 画像を中央に配置する
    marginTop: theme.mixins.toolbar.minHeight, // ヘッダーの高さ分のマージンを設定
  },
  img: {
    width: '500px',
    height: '500px',
    backgroundColor: 'white',
  },
  content: {
    marginTop: theme.mixins.toolbar.minHeight + 20, // ヘッダーの高さ + 追加のマージン
    // 他のコンテンツのスタイルを追加できます
  },
}));

const TimeLine = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        <Toolbar className={classes.imgContainer}>
          <img className={classes.img} src="/images/human.png" alt="Home" />
        </Toolbar>
      </div>
    </>
  );
};

export default TimeLine;
