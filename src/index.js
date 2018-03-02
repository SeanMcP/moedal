import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  render () {
    if (!this.state.isOpen) {
      return null;
    }
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child,
        {
          ...this.props,
          closeModal: this.close,
        })
    );
    return (
      <div className="modal-wrapper" onClick={this.close}>
        <div className="modal-box">
          {childrenWithProps}
        </div>
      </div>
    );
  }
  open() {
    this.setState({ isOpen: true });
  }
  close() {
    this.setState({ isOpen: false });
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }
}

export default Modal;
