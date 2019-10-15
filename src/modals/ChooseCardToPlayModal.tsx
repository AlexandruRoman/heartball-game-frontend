import * as React from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react'
import PlayerCard from 'src/components/cards/PlayerCard';
import './ChooseStartingCardsModal.css'
import SpellCard from 'src/components/cards/SpellCard';
import CoachCard from 'src/components/cards/CoachCard';

interface ChooseCardToPlayModal_state {
  open: boolean
  footballPlayers: any[]
  spells: any[]
  coaches: any[]

  choosenFootballPlayers: any[]
  choosenSpells: any[]
  choosenCoaches: any[]
}
interface ChooseCardToPlayModal_props {
  getCardToPlay: (card, type) => void
}

export default class ChooseCardToPlayModal extends React.Component<ChooseCardToPlayModal_props, ChooseCardToPlayModal_state>{
  state = {
    open: false,
    footballPlayers: new Array(),
    spells: new Array(),
    coaches: new Array(),
    choosenFootballPlayers: new Array(),
    choosenSpells: new Array(),
    choosenCoaches: new Array(),
  }

  prompt = (cardsToChooseFrom) => {
    console.log(cardsToChooseFrom)
    this.setState({
      footballPlayers: cardsToChooseFrom.footballPlayers,
      spells: cardsToChooseFrom.spells,
      coaches: cardsToChooseFrom.coaches,
      choosenFootballPlayers: new Array(),
      choosenSpells: new Array(),
      choosenCoaches: new Array(),
      open: true
    })
  }

  togglePlayer = player => {
    let copy = this.state.choosenFootballPlayers
    if (copy.find(x => x.id === player.id)) {
      copy = copy.filter(x => x.id !== player.id)
    } else {
      if (this.checkAllChoosen() === true)
        return
      copy.push(player)
    }
    this.setState({
      choosenFootballPlayers: copy
    })
  }

  getFootballPlayerCards = () => {
    return this.state.footballPlayers.map((player, i) => {
      return <div
        className={"section-card " + (this.state.choosenFootballPlayers.find(c => c.id === player.id) ? 'selected' : '')}
        key={i}
        onClick={() => this.togglePlayer(player)}
      >
        <PlayerCard {...player} />
      </div>
    })
  }
  toggleSpell = spell => {
    let copy = this.state.choosenSpells
    if (copy.find(x => x.id === spell.id)) {
      copy = copy.filter(x => x.id !== spell.id)
    } else {
      if (this.checkAllChoosen() === true)
        return
      copy.push(spell)
    }
    this.setState({
      choosenSpells: copy
    })
  }

  getSpellsCards = () => {
    return this.state.spells.map((spell, i) => {
      return <div
        className={"section-card " + (this.state.choosenSpells.find(c => c.id === spell.id) ? 'selected' : '')}
        key={i}
        onClick={() => this.toggleSpell(spell)}
      >
        <SpellCard {...spell} />
      </div>
    })
  }
  toggleCoach = coach => {
    let copy = this.state.choosenCoaches
    if (copy.find(x => x.idCoach === coach.idCoach)) {
      copy = copy.filter(x => x.idCoach !== coach.idCoach)
    } else {
      if (this.checkAllChoosen() === true)
        return
      copy.push(coach)
    }
    this.setState({
      choosenCoaches: copy
    })
  }

  getCoachesCards = () => {
    return this.state.coaches.map((coach, i) => {
      return <div
        className={"section-card " + (this.state.choosenCoaches.find(c => c.idCoach === coach.idCoach) ? 'selected' : '')}
        key={i}
        onClick={() => this.toggleCoach(coach)}
      >
        <CoachCard {...coach} />
      </div>
    })
  }

  checkAllChoosen = () => {
    if (
      this.state.choosenCoaches.length +
      this.state.choosenSpells.length +
      this.state.choosenFootballPlayers.length === 1
    ) return true
    return false
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        size='large'
        dimmer='blurring'
      >
        <Header size='large' content='Please choose a card to play' />
        <Modal.Content scrolling>
          <div className="section">
            <Header size='large' content='Football players cards' />
            <div className="section-content">
              {this.getFootballPlayerCards()}
            </div>
          </div>
          <div className="section">
            <Header size='large' content='Special cards' />
            <div className="section-content">
              {this.getSpellsCards()}
            </div>
          </div>
          <div className="section">
            <Header size='large' content='Coaches card' />
            <div className="section-content">
              {this.getCoachesCards()}
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={() => {
            let card, cardType
            if (this.checkAllChoosen() === false)
              return

            if (this.state.choosenFootballPlayers.length === 1) {
              card = this.state.choosenFootballPlayers[0]
              cardType = 'player'
            }
            if (this.state.choosenSpells.length === 1) {
              card = this.state.choosenSpells[0]
              cardType = 'spell'
            }
            if (this.state.choosenCoaches.length === 1) {
              card = this.state.choosenCoaches[0]
              cardType = 'coach-spell'
            }

            this.props.getCardToPlay(card, cardType)
            this.setState({ open: false })
          }}>
            <Icon name='checkmark' /> Play
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
