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
        x: null,
        y: null,
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
            cursor: 'grab',
            left: draggedRect.left + 'px',
            top: draggedRect.top + 'px',
          },
          lastPos: {
            x: null,
            y: null,
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
    event.dataTransfer.effectAllowed = 'copyMove';
    this.setDragImage(event);
    this.setData(event);

    this.setState(
      (state) => {
        return {
          ...state,
          style: {
            ...state.style,
            position: 'absolute',
          },
          dragging: true,
        };
      },
      () => {
        setTimeout(() => this.props.onDragStart && this.props.onDragStart(), 0);
      }
    );

    document.addEventListener('mouseup', (event) =>
      this.setState({ style: { ...this.state.style, pointerEvents: 'auto' } })
    );
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
          x: null,
          y: null,
        },
        dragging: false,
      };
    });
  };

  mouseMove = (event) => {
    if (this.state.dragging) {
      if (this.state.lastPos.x === null) {
        this.setState({
          ...this.state,
          lastPos: {
            x: event.clientX,
            y: event.clientY,
          },
        });
        return;
      }
      this.setState((state) => {
        let diffX = state.lastPos.x - event.clientX;
        let diffY = state.lastPos.y - event.clientY;

        console.log(diffX, state.lastPos);
        return {
          ...state,
          style: {
            ...state.style,
            pointerEvents: 'none',
            left: parseInt(state.style.left) - diffX + 'px',
            top: parseInt(state.style.top) - diffY + 'px',
          },
          lastPos: {
            x: event.clientX,
            y: event.clientY,
          },
        };
      });
    }
  };

  render() {
    const { style, dragging } = this.state;
    let { avatar, className, style: propsStyle } = this.props;
    if (!propsStyle) {
      propsStyle = [];
    }

    return (
      <div
        ref={this.dragged}
        className={`draggable ${className || ''}`}
        draggable="true"
        style={{ ...propsStyle, ...style }}
        onMouseDown={() =>
          this.setState({
            style: { ...this.state.style, cursor: 'grabbing' },
          })
        }
        onDragStart={this.mouseDown}
        onDragEnd={this.mouseUp}
      >
        {dragging ? avatar : this.props.children}
      </div>
    );
  }
}

export default DraggableElement;
