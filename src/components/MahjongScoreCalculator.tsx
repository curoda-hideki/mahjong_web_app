import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Typography,
  TextField,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';

const MahjongScoreCalculator = () => {
  const [playerNames, setPlayerNames] = useState(['くろだ', 'おおいし', 'こうの', 'いしざわ']);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [scoreHistory, setScoreHistory] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState('');

  const [todayTotalScores, setTodayTotalScores] = useState<number[]>(Array(playerNames.length).fill(0));

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleNameChange = (index: number, newName: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = newName;
    setPlayerNames(newPlayerNames);
  };

  const handleScoreChange = (index: number, newScore: string) => {
    const newScores = [...scores];
    newScores[index] = +newScore; // または Number(newScore)
    setScores(newScores);
  };

  const calculateTotalScore = () => {
    return scores.reduce((total, score) => total + score, 0);
  };

  const calculateAndUpdateScores = () => {
    // 各プレイヤーごとにユニークな名前が選ばれているか確認
    const isNamesUnique = playerNames.every((name, index) => playerNames.indexOf(name) === index);

    if (!isNamesUnique) {
      setError('プレイヤー名はユニークである必要があります。');
      return;
    }

    // 本日のトータルスコアを計算
    const todayScores: number[] = scores.reduce((acc, score, index) => {
      const total = acc[index] || 0;
      acc[index] = total + score;
      return acc;
    }, []);

    setTodayTotalScores(todayScores);

    const totalScore = calculateTotalScore();
    if (totalScore !== 100000) {
      setError('合計得点は100,000点になるようにしてください。');
      /*return;*/
    }
    setError('');

    const rankScores = [...scores];
    rankScores.sort((a, b) => b - a); // 得点の降順でソート

    // 各プレイヤーの順位による得点変動
    const scoreDifferences = scores.map((score, index) => {
      if (score === rankScores[0]) {
        // 1位
        return ((rankScores[1] + rankScores[2] + rankScores[3])) / 1000;
      } else if (score === rankScores[1]) {
        // 2位
        return (score - 30000 + 10000) / 1000;
      } else if (score === rankScores[2]) {
        // 3位
        return (score - 30000 - 10000) / 1000;
      } else {
        // 4位
        return (score - 30000 - 30000) / 1000;
      }
    });

    const formattedDate = selectedDate ? format(new Date(selectedDate), 'yyyy/MM/dd') : new Date();

    // 新しいスコア履歴を作成
    const newScoreHistory = [
      ...scoreHistory,
      {
        date: new Date().toLocaleString(),
        scores: scoreDifferences,
      },
    ];

    // 新しいスコア履歴をセット
    setScoreHistory(newScoreHistory);
    // スコアをリセット
    setScores([0, 0, 0, 0]);
  };

  // ヘッダーの高さを取得
  const headerHeight = document.getElementById('header')?.offsetHeight || 0;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, marginTop: headerHeight + 70 }}>
      <Typography variant="h4" gutterBottom>
        麻雀スコアアプリ
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          value={selectedDate}  // selectedDateがDateオブジェクトではなく、文字列であることを確認
          onChange={(newDate) => handleDateChange(newDate)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              label="日付"
              InputProps={{
                ...params.InputProps,
                style: { paddingRight: 0 },
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    {params.InputProps.error && (
                      <Typography variant="caption" color="error">
                        {params.helperText}
                      </Typography>
                    )}
                  </>
                ),
              }}
            />
          )}
        />
      </MuiPickersUtilsProvider>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>プレイヤー名</TableCell>
              <TableCell>点棒</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerNames.map((name, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Select
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value as string)}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="くろだ">くろだ</MenuItem>
                    <MenuItem value="おおいし">おおいし</MenuItem>
                    <MenuItem value="こうの">こうの</MenuItem>
                    <MenuItem value="いしざわ">いしざわ</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={scores[index]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleScoreChange(index, e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <Typography variant="caption" color="error" style={{ marginTop: 10 }}>
          {error}
        </Typography>
      )}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={calculateAndUpdateScores}>
          登録
        </Button>
      </div>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        本日の合計:
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>プレイヤー名</TableCell>
                <TableCell>合計</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playerNames.map((name, index) => (
                <TableRow key={index}>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    {/* 履歴に書かれている各プレイヤーの値の合計 */}
                    {scoreHistory.reduce((total, history) => total + (history.scores ? history.scores[index] : 0), 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        一覧:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              {playerNames.map((name, index) => (
                <TableCell key={index}>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {scoreHistory.map((history, index) => (
              <TableRow key={index}>
                <TableCell>{history.date}</TableCell>
                {history.scores && history.scores.map((score, index) => (
                  <TableCell key={index}>{score}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MahjongScoreCalculator;
