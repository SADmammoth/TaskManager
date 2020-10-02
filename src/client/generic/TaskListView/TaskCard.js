import React from 'react';
import Form, { MarkdownOutput } from '@sadmammoth/react-form';

class Task extends React.Component {
  render() {
    return (
      <>
        <p className="title">{this.props.title}</p>
        <MarkdownOutput
          id={this.props.taskId + 'content'}
          name={this.props.taskId + 'content'}
          value={this.props.content}
        />
      </>
    );
  }
}

export default Task;
