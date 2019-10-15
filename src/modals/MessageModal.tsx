import * as React from 'react';
import { Header, Modal } from 'semantic-ui-react'

interface MessageModal_state {
  open: boolean
  message: string
}
interface MessageModal_props {
  onClose?: () => void
}

export default class MessageModal extends React.Component<MessageModal_props, MessageModal_state>{
  state = {
    open: false,
    message: ''
  }

  show = message => {
    this.setState({ open: true, message })
  }

  render() {
    return (
      <Modal
        dimmer='blurring'
        open={this.state.open}
        onClose={() => {
          this.setState({ open: false })
          // this.props.onClose()
        }}
        size='tiny'
      >
        <Header size='large' content={this.state.message} />
      </Modal>
    )
  }
}
