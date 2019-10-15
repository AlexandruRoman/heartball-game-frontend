import * as React from 'react';
import { Header, Modal, Button, Icon, Input } from 'semantic-ui-react'

interface NicknameModal_state {
  open: boolean
  nickname: string
}
interface NicknameModal_props {
  getNickname: (nickname) => void
}

export default class NicknameModal extends React.Component<NicknameModal_props, NicknameModal_state>{
  state = {
    open: false,
    nickname: ''
  }

  prompt = () => {
    this.setState({ open: true })
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        size='tiny'
        dimmer='blurring'
      >
        <Header size='large' content='Please choose your nickname' />
        <Modal.Content>
          <Input fluid placeholder='nickname' size='big' input={this.state.nickname} onChange={e => this.setState({ nickname: e.target.value })} />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={() => { this.props.getNickname(this.state.nickname); this.setState({ open: false }) }}>
            <Icon name='checkmark' /> Send
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
