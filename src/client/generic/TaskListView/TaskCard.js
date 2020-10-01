import React from 'react';
import Form, { MarkdownOutput } from '@sadmammoth/react-form';

class Task extends React.Component {
  render() {
    return (
      <div
        className={'task-card ' + (this.props.className || '')}
        style={this.props.style}
      >
        <p className="title">{this.props.title}</p>
        <MarkdownOutput value={this.props.content} />
      </div>
    );
  }
}

export default Task;
