'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ResizeSensor from './vendor/ResizeSensor/ResizeSensor.js';

import {shouldComponentUpdate} from 'react/lib/ReactComponentWithPureRenderMixin';

class SizeReporter extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    onSizeChange: React.PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.ResizeSensor = null;
    this.offsetHeight = null;
    this.offsetWidth = null;
  }

  componentDidMount(){
    this.node = ReactDOM.findDOMNode(this);
    this.attachListener();
    this.props.onSizeChange({height: this.node.offsetHeight, width: this.node.offsetWidth});
  }

  shouldComponentUpdate = shouldComponentUpdate

  componentWillUnmount(){
    if (this.ResizeSensor){
      this.ResizeSensor.detach();
    }
  }

  componentDidUpdate(){
    if (
      this.node &&
      (
        this.node.offsetHeight !== this.offsetHeight ||
        this.node.offsetWidth !== this.offsetWidth
      )
    ){
      this.props.onSizeChange({height: this.node.offsetHeight, width: this.node.offsetWidth});
    }
  }

  attachListener = () => {
    if (this.node){
      this.ResizeSensor = new ResizeSensor(
        this.node,
        () => this.props.onSizeChange({height: this.node.offsetHeight, width: this.node.offsetWidth})
      );
    }
  }

  reattachResizeListener = () => {
    this.ResizeSensor.detach();
    this.attachListener();
  }

  render(){
    const { children, ...props } = this.props;

    if (this.node){
      this.offsetHeight = this.node.offsetHeight;
      this.offsetWidth = this.node.offsetWidth;
    }

    return (
      <div {...props}>
        {children || null}
      </div>
    )
  }
}

export default SizeReporter;
