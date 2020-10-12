import React from 'react';
import Form, { MarkdownOutput } from '@sadmammoth/react-form';
import Button from '../Button';
import Client from '../../helpers/Client.ts';

class Task extends React.Component {
  render() {
    return (
      <>
        <p className="title">{this.props.title}</p>
        <MarkdownOutput
          id={this.props.taskId + 'content'}
          name={this.props.taskId + 'content'}
          value={this.props.content || ''}
        />
        <Button
          action={() => Client.deleteTask(this.props.listId, this.props.taskId)}
          content="Delete"
        />
      </>
    );
  }
}

export default Task;
