import * as React from 'react';
import './Card.css'
import { Card, Image } from 'semantic-ui-react'

interface CoachCard_props {
  name?: string
  nameSpell?: string
  country?: string
  picture?: string
  description?: string
  effect?: string
}

class CoachCard extends React.Component<CoachCard_props> {

  public render() {
    return (
      <Card>
        <Image src={this.props.picture}
          label={{ ribbon: 'right', color: "blue", icon: 'flag', content: this.props.country, size: 'big' }}
        />
        <Card.Content>
          <Card.Header className='header'>{this.props.name}</Card.Header>
          <Card.Description >
            {this.props.nameSpell}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          {this.props.description}
        </Card.Content>
        <Card.Content>
          {this.props.effect}
        </Card.Content>
      </Card>
    );
  }
}

export default CoachCard;
