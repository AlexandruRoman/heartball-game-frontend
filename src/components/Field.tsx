import * as React from 'react';
import './Field.css'
import _ from 'lodash'
import PlayerCard from './cards/PlayerCard';
import FootballCardModal from 'src/modals/FootballCardModal';

interface Field_props {
  team1?: any[]
  team2?: any[]
}



class Field extends React.Component<Field_props> {
  showPlayer: (player) => void

  private getPlayer = (player: any, index: number) => {
    console.log(index)
    return <div className="player-item" key={Math.random() + index} onClick={() => this.showPlayer(player)}>
      <PlayerCard {...player} />
    </div>
  }
  private getColumn = (players: any[]) => {
    return <div className="column" key={Math.random()}>
      {players.map(this.getPlayer)}
    </div>
  }

  private getColumns = (players: any[] | undefined, otherTeam: boolean) => {
    if (!players)
      return
    let gk = this.getColumn(players.filter(x => x.position === 'GK'))
    let df = this.getColumn(players.filter(x => x.position === 'DF'))
    let mf = this.getColumn(players.filter(x => x.position === 'MF'))
    let fw = this.getColumn(players.filter(x => x.position === 'FW'))
    if (otherTeam)
      return [fw, mf, df, gk]
    return [gk, df, mf, fw]
  }

  public render() {
    return (
      <div className="field">
        {this.getColumns(this.props.team1, false)}
        {this.getColumns(this.props.team2, true)}
        <FootballCardModal ref={x => x && (this.showPlayer = x.show)} />
      </div>
    );
  }
}

export default Field;
