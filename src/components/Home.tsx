// src/components/Home.js
import React from 'react';

const Home = () => {

  // ヘッダーの高さを取得
  const headerHeight = document.getElementById('header')?.offsetHeight || 0;

  return (
    <div style={{ margin: 'auto', padding: 20, marginTop: headerHeight + 70 }}>
      <div>ホーム</div>
    </div>
  );
};

export default Home;
