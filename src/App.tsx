import { NewAppScreen } from '@react-native/new-app-screen';
import { useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

function App() {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gamestate, setGamestate] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGamestate(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    // checking winner
    if (
      gamestate[0] === gamestate[1] &&
      gamestate[0] === gamestate[2] &&
      gamestate[0] !== 'empty'
    ) {
      setGameWinner(`${gamestate[0]} won the game! 🥳`);
    } else if (
      gamestate[3] !== 'empty' &&
      gamestate[3] === gamestate[4] &&
      gamestate[4] === gamestate[5]
    ) {
      setGameWinner(`${gamestate[3]} won the game! 🥳`);
    } else if (
      gamestate[6] !== 'empty' &&
      gamestate[6] === gamestate[7] &&
      gamestate[7] === gamestate[8]
    ) {
      setGameWinner(`${gamestate[6]} won the game! 🥳`);
    } else if (
      gamestate[0] !== 'empty' &&
      gamestate[0] === gamestate[3] &&
      gamestate[3] === gamestate[6]
    ) {
      setGameWinner(`${gamestate[0]} won the game! 🥳`);
    } else if (
      gamestate[1] !== 'empty' &&
      gamestate[1] === gamestate[4] &&
      gamestate[4] === gamestate[7]
    ) {
      setGameWinner(`${gamestate[1]} won the game! 🥳`);
    } else if (
      gamestate[2] !== 'empty' &&
      gamestate[2] === gamestate[5] &&
      gamestate[5] === gamestate[8]
    ) {
      setGameWinner(`${gamestate[2]} won the game! 🥳`);
    } else if (
      gamestate[0] !== 'empty' &&
      gamestate[0] === gamestate[4] &&
      gamestate[4] === gamestate[8]
    ) {
      setGameWinner(`${gamestate[0]} won the game! 🥳`);
    } else if (
      gamestate[2] !== 'empty' &&
      gamestate[2] === gamestate[4] &&
      gamestate[4] === gamestate[6]
    ) {
      setGameWinner(`${gamestate[2]} won the game! 🥳`);
    } else if (!gamestate.includes('empty', 0)) {
      setGameWinner('Draw game... 🕊');
    }
  };

  const onchangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    // check every position is empty then make it O or X
    if (gamestate[itemNumber] === 'empty') {
      gamestate[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is alreay filled',
        backgroundColor: 'red',
        textColor: '#ffffff',
      });
    }

    checkIsWinner();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}
        >
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'}'s turn
          </Text>
        </View>
      )}

      {/* game grid */}
      <FlatList
        numColumns={3}
        data={gamestate}
        style={styles.grid}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onchangeItem(index)}
          >
            <Icons iconName={item} />
          </Pressable>
        )}
      />

      {/* reset button */}
      <Pressable style={styles.resetBtn} onPress={reloadGame}>
        <Text style={styles.resetBtnTxt}>Reload Game</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  turnBtn: {
    backgroundColor: 'green',
    padding: 5,
    alignItems: 'center',
  },
  turnBtnTxt: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  resetBtn: {
    backgroundColor: 'red',
    padding: 5,
    alignItems: 'center',
  },
  resetBtnTxt: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
