import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Form from '@sadmammoth/react-form';

import CalendarView from '../../components/CalendarView/CalendarView';
import Sidebar from '../../components/Sidebar';

import { DraggableTaskList } from '../../components/TaskListView';

import Client from '../../helpers/Client.ts';

export default function TaskAssignmentPage(props) {
  const [tasks, setTasks] = useState(null);
  const [listId, setListId] = useState(0);

  useEffect(() => {
    Client.getTasks(listId)
      .then((res) => {
        const tasks = {};
        res.tasks.forEach((el, i) => {
          if (el.assignedTo) {
            tasks[new Date(el.assignedTo).getTime()] = el;
            tasks[new Date(el.assignedTo).getTime()].taskId = i;
          }
        });
        return tasks;
      })
      .then((tasks) => {
        setTasks(tasks);
      });
  }, [listId]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <h1 className="h1">Home</h1>
      <CalendarView
        rows={9}
        columns={9}
        startDate={new Date(2020, 1, 12, 12, 0, 0, 0)}
        timeStep={1}
        tasks={tasks}
      />

      <Sidebar
        style={{ height: '70vh', width: '30vw' }}
        content={
          <>
            <Form
              onSubmit={null}
              inputs={[
                {
                  type: 'select',
                  name: 'listId',
                  placeholder: 'Inbox',
                  valueOptions: Client.getListsNames,
                  onChange: (name, value) => {
                    setListId(value);
                  },
                },
              ]}
            />

            <DraggableTaskList listId={listId} style={{ float: 'left' }} />
          </>
        }
      />
    </>
  );
}
