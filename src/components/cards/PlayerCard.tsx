import * as React from 'react';
import './Card.css'
import { Card, Icon, Image } from 'semantic-ui-react'

interface PlayerCard_props {
  name?: string
  country?: string
  picture?: string
  position?: string
  attack?: number
  defence?: number
}

class PlayerCard extends React.Component<PlayerCard_props> {

  public render() {
    return (
      <Card>
        <Image src={this.props.picture}
          label={{ ribbon: 'right', color: "blue", icon: 'flag', content: this.props.country, size: 'big' }}
        />
        <Card.Content>
          <Card.Header >{this.props.name}</Card.Header>
          <br />
          <div className='p'>
            <div className='q'>
              <Icon name='soccer' />{this.props.position}
            </div>
          </div>
        </Card.Content>
        <Card.Content meta>
          <div className='p2'>
            <div className='q'>
              <Icon name='fighter jet' />{this.props.attack}
            </div>
            <div className='q'>
              <Icon name='shield alternate' />{this.props.defence}
            </div>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default PlayerCard;
