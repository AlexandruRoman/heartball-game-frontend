import * as React from 'react';
import './Card.css'
import { Card, Image } from 'semantic-ui-react'

interface SpellCard_props {
  name?: string
  picture?: string
  description?: string
  effect?: string
}

class SpellCard extends React.Component<SpellCard_props> {

  public render() {
    return (
      <Card>
        <Image src={this.props.picture} />
        <Card.Content>
          <Card.Header className='header'>{this.props.name}</Card.Header>
          <Card.Description >
            {this.props.description}
          </Card.Description>
        </Card.Content>
        <Card.Content meta>
          {this.props.effect}
        </Card.Content>
      </Card>
    );
  }
}

export default SpellCard;
