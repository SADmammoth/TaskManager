import React from 'react';
import ReactDOM from 'react-dom';

class DraggableElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        left: 0,
        top: 0,
      },
      lastPos: {
        x: 0,
        y: 0,
      },
      dragging: false,
    };

    this.dragged = React.createRef();
  }

  componentDidMount() {
    this.reset();
    document
      .getElementById('root')
      .addEventListener('dragover', this.mouseMove);
  }

  componentWillUnmount() {
    document
      .getElementById('root')
      .removeEventListener('dragover', this.mouseMove);
  }

  reset = () => {
    this.setState(
      {
        style: {
          position: 'static',
        },

        dragging: false,
      },
      () => {
        let { current: dragged } = this.dragged;
        let draggedRect = dragged.getBoundingClientRect();

        this.setState((state) => ({
          ...state,
          style: {
            ...state.style,
            left: draggedRect.left + 'px',
            top: draggedRect.top + 'px',
          },
          lastPos: {
            x: parseInt(draggedRect.left),
            y: parseInt(draggedRect.top),
          },
        }));
      }
    );
  };

  convertToHtml(component) {
    let div = document.createElement('div');
    ReactDOM.render(component, div);
    return div.children[0];
  }

  setDragImage(event) {
    event.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
  }

  setData(event) {
    event.dataTransfer.setData(
      'application/json',
      JSON.stringify(this.props.data)
    );
  }

  mouseDown = (event) => {
    this.setDragImage(event);
    this.setData(event);

    this.setState((state) => {
      console.log({
        ...state,
        style: {
          ...state.style,
          position: 'absolute',
        },
        lastPos: {
          x: parseInt(state.style.left) - 10,
          y: parseInt(state.style.top) - 10,
        },
        dragging: true,
      });
      return {
        ...state,
        style: {
          ...state.style,
          position: 'absolute',
        },
        lastPos: {
          x: parseInt(state.style.left) - 10,
          y: parseInt(state.style.top) - 10,
        },
        dragging: true,
      };
    });
  };

  mouseUp = (event) => {
    if (event.dataTransfer.dropEffect === 'none') {
      this.reset();
      return;
    }

    this.setState((state) => {
      return {
        ...state,
        lastPos: {
          x: 0,
          y: 0,
        },
        dragging: false,
      };
    });
  };

  mouseMove = (event) => {
    console.log(this.state.dragging);
    if (this.state.dragging) {
      this.setState((state) => {
        let diffX = state.lastPos.x - event.pageX;
        let diffY = state.lastPos.y - event.pageY;

        console.log({ ...state }, diffX);
        return {
          ...state,
          style: {
            ...state.style,
            left: parseInt(state.style.left) - diffX + 'px',
            top: parseInt(state.style.top) - diffY + 'px',
          },
          lastPos: {
            x: event.pageX,
            y: event.pageY,
          },
        };
      });
    }
  };

  render() {
    const { style, dragging } = this.state;
    const { avatar } = this.props;
    return (
      <div
        ref={this.dragged}
        className="draggable"
        draggable="true"
        style={style}
        onDragStart={this.mouseDown}
        onDragEnd={this.mouseUp}
      >
        {dragging ? avatar : this.props.children}
      </div>
    );
  }
}

export default DraggableElement;
