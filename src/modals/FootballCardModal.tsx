import * as React from 'react';
import { Modal } from 'semantic-ui-react'
import PlayerCard from 'src/components/cards/PlayerCard';
import './FootballCardModal.css'

interface FootballCardModal_state {
  open: boolean
  player: any
}

export default class FootballCardModal extends React.Component<{}, FootballCardModal_state>{
  state = {
    open: false,
    player: {}
  }

  show = player => {
    console.log(player)
    this.setState({ open: true, player })
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
        // basic
        size='tiny'
        dimmer='blurring'
      >
        <div className="center-card">
          <PlayerCard {...this.state.player} />
        </div>
      </Modal>
    )
  }
}
