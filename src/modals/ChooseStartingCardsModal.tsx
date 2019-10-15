import * as React from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react'
import PlayerCard from 'src/components/cards/PlayerCard';
import './ChooseStartingCardsModal.css'
import SpellCard from 'src/components/cards/SpellCard';
import CoachCard from 'src/components/cards/CoachCard';

interface ChooseStartingCardsModal_state {
  open: boolean
  footballPlayers: any[]
  spells: any[]
  coaches: any[]

  choosenFootballPlayers: any[]
  choosenSpells: any[]
  choosenCoaches: any[]
}
interface ChooseStartingCardsModal_props {
  getChoosenCards: (cards: any) => void
}

export default class ChooseStartingCardsModal extends React.Component<ChooseStartingCardsModal_props, ChooseStartingCardsModal_state>{
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
      open: true
    })
  }

  togglePlayer = player => {
    let copy = this.state.choosenFootballPlayers
    if (copy.find(x => x.id === player.id)) {
      copy = copy.filter(x => x.id !== player.id)
    } else {
      if (copy.length === 11)
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
      if (copy.length === 5)
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
      if (copy.length === 1)
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
      this.state.choosenCoaches.length === 1 &&
      this.state.choosenSpells.length === 5 &&
      this.state.choosenFootballPlayers.length === 11
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
        <Header size='large' content='Please choose your cards' />
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
            <Header size='large' content='Coaches cards' />
            <div className="section-content">
              {this.getCoachesCards()}
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={() => {
            if (this.checkAllChoosen() === false)
              return
            this.props.getChoosenCards({
              footballPlayers: this.state.choosenFootballPlayers,
              spells: this.state.choosenSpells,
              coaches: this.state.choosenCoaches,
            }); this.setState({ open: false })
          }}>
            <Icon name='checkmark' /> Send
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
