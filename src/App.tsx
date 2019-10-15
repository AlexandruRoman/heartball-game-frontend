import * as React from 'react';
import './App.css';
import Field from './components/Field';
import MessageModal from './modals/MessageModal';
import NicknameModal from './modals/NicknameModal';
import ChooseStartingCardsModal from './modals/ChooseStartingCardsModal';
import * as io from 'socket.io-client';
import ChooseCardToPlayModal from './modals/ChooseCardToPlayModal';
import { Button } from 'semantic-ui-react';
// import PlayerCard from './components/cards/PlayerCard';
// import SpellCard from './components/cards/SpellCard';
// import CoachCard from './components/cards/CoachCard';

interface App_state {
  canMove: boolean
  gameState: any

}


class App extends React.Component<{}, App_state> {
  state = {
    canMove: false,
    gameState: {
      user1: {
        id: '',
        nick: '',
        unplayedCards: {
          footballPlayers: [],
          spells: [],
          coaches: []
        },
        playedCards: [],
        points: 0,
        score: 0,
        isPlaying: true
      }
      ,
      user2: {
        id: '',
        nick: '',
        unplayedCards: {
          footballPlayers: [],
          spells: [],
          coaches: []
        },
        playedCards: [],
        points: 0,
        score: 0,
        isPlaying: true
      },
      roundNo: 1
    }
  }
  ref: HTMLDivElement | null
  nick: string
  messageQueue: string[]
  socket: SocketIOClient.Socket
  roomId: string

  showMessage: (message) => void
  promptGetNickname: () => void
  promptChooseStartingCards: (cards) => void
  promptChooseCardToPlay: (cards) => void

  componentDidMount() {
    setTimeout(() => {
      this.ref && this.ref.classList.add('zoom')
    }, 1000)
    setTimeout(() => {
      this.promptGetNickname()
    }, 1000);

    this.socket = io.connect('http://localhost:3000');
    this.socket.on('connect', () => { console.log('connected') });

    this.socket.on('game-start', (data: { roomId: string, cardsToChooseFrom: any }) => {
      console.log(data)
      this.roomId = data.roomId
      this.promptChooseStartingCards(data.cardsToChooseFrom)
    });

    this.socket.on('update-game', data => this.setState({ gameState: data }));
    this.socket.on('round-start', () => this.showMessage('Round started'));
    this.socket.on('can-move', () => { this.setState({ canMove: true }); this.showMessage('Your turn') });
    this.socket.on('round-end', winner => this.showMessage('The winner of the round is ' + winner));
    this.socket.on('game-end', winner => this.showMessage('The winner of the game is ' + winner));
    this.socket.on('stop-playing', () => this.showMessage('The other player stopped playing cards'));
  }

  getNickname = nick => {
    this.socket.emit('wanna-play', nick)
    this.nick = nick
  }

  getChoosenCards = (cards) => {
    this.socket.emit('choose-cards', { roomId: this.roomId, cards })
    this.setState({ canMove: false });
    this.showMessage('Turn ended')
  }

  getCardToPlay = (card, cardType) => {
    this.socket.emit('play-card', { roomId: this.roomId, card, cardType })
    this.setState({ canMove: false });
    this.showMessage('Turn ended')
  }

  stopPlaying = () => {
    this.socket.emit('stop-playing', this.roomId)
    this.setState({ canMove: false });
    this.showMessage('Turn ended')
  }

  getUser = () => {
    if (this.nick === this.state.gameState.user1.nick)
      return 'user1'
    return 'user2'
  }

  public render() {
    return (
      <div className='app' ref={x => this.ref = x}>
        <Field team1={this.state.gameState.user1.playedCards} team2={this.state.gameState.user2.playedCards} />
        {this.state.canMove && <div>
          <div className="btn1">
            <Button onClick={() => this.promptChooseCardToPlay(this.state.gameState[this.getUser()].unplayedCards)} size="large" primary>Choose Card</Button>
          </div>
          <div className="btn2">
            <Button size="large" onClick={this.stopPlaying} color="red">Stop Playing</Button>
          </div>
        </div>}
        {/* modals */}
        <MessageModal ref={x => x && (this.showMessage = x.show)} />
        <NicknameModal ref={x => x && (this.promptGetNickname = x.prompt)} getNickname={this.getNickname} />
        <ChooseStartingCardsModal ref={x => x && (this.promptChooseStartingCards = x.prompt)} getChoosenCards={this.getChoosenCards} />
        <ChooseCardToPlayModal ref={x => x && (this.promptChooseCardToPlay = x.prompt)} getCardToPlay={this.getCardToPlay} />
      </div>
    );
  }
}

export default App;
