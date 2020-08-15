import React from 'react';
import DropArea from './DropArea';

class DragMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
    };
  }

  componentDidMount() {
    let body = React.Children.map(this.props.children, (child) => {
      return child.type === DropArea
        ? React.cloneElement(child, { setData: this.setData })
        : child;
    });

    this.setState({
      body,
    });
  }

  render() {
    console.log(this.state.body);
    return <>{this.state.body}</>;
  }

  setData = (data) => {
    let { height, index, title } = data;
    let array = [...this.state.body];
    let curr = null;

    let currentIndex = (i) => {
      return (i - 1) * this.props.columns + index.y - 1;
    };

    let indBuff;

    for (let i = index.x; i < index.x + height; i++) {
      indBuff = currentIndex(i);
      curr = array[indBuff];

      if (!(curr.type === DropArea)) {
        return;
      }

      array[indBuff] = null;
    }

    array[currentIndex(index.x)] = this.props.createAvatar(
      {
        index,
        title,
      },
      height
    );

    this.setState({ body: array });

    this.props.onDataUpdate(data);
  };
}

export default DragMap;
