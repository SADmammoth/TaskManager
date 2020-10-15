import React from 'react';
import { MarkdownOutput } from '@sadmammoth/react-form';
import Button from '../Button';
import Client from '../../helpers/Client.ts';

const Task = ({ title, taskId, listId, content }) => {
  return (
    <>
      <p className="title">{title}</p>
      <MarkdownOutput
        id={taskId + 'content'}
        name={taskId + 'content'}
        value={content || ''}
      />
      <Button
        action={() => Client.deleteTask(listId, taskId)}
        content="Delete"
      />
    </>
  );
};

export default Task;
