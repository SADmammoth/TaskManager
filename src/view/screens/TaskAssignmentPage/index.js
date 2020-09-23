import React from 'react';
import { Helmet } from 'react-helmet';
import Form from '@sadmammoth/react-form';
import shortid from 'shortid';

import CalendarView from '../../generic/CalendarView';
import Sidebar from '../../generic/Sidebar';
import Menu from '../../generic/Menu';

import { DraggableTaskList, TaskList } from '../../generic/TaskListView';
import Client from '../../../helpers/Client.ts';
import Button from '../../generic/Button';

export default class TaskAssignmentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: null,
      listId: 0,
    };
  }

  componentDidMount() {
    Client.getTasks(this.state.listId)
      .then((res) => {
        let tasks = {};
        res.tasks.forEach((el) => {
          if (el.assignedTo) {
            tasks[new Date(el.assignedTo).valueOf().toString()] = el;
          }
        });
        return tasks;
      })
      .then((tasks) => {
        this.setState({
          tasks,
          // loadEnded: true,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.listId !== this.state.listId)
      Client.getTasks(this.state.listId)
        .then((res) => {
          let tasks = {};
          res.tasks.forEach((el) => {
            if (el.assignedTo) {
              tasks[new Date(el.assignedTo).valueOf().toString()] = el;
            }
          });
          return tasks;
        })
        .then((tasks) => {
          this.setState({
            tasks,
            // loadEnded: true,
          });
        });
  }

  render() {
    console.log(this.state.tasks);
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
          tasks={this.state.tasks}
          style={{ width: '70%', float: 'left', height: '70vh' }}
        ></CalendarView>

        <Button
          content="Register user"
          onClick={() => Client.registerUser('root', 'user')}
        ></Button>
        <Sidebar style={{ height: '70vh' }}>
          <Form
            onSubmit={null}
            inputs={[
              {
                type: 'select',
                name: 'listId',
                placeholder: 'Inbox',
                valueOptions: Client.getListsNames,
                onChange: (name, value) => {
                  this.setState({ listId: value });
                },
              },
            ]}
          />
          <Menu
            buttons={[
              {
                title: 'Address',
                icon: require('../../assets/icons/address-card-solid.svg'),
                className: 'icon-btn',
                action: () => alert(0),
              },
              {
                title: 'Address',
                icon: require('../../assets/icons/address-card-solid.svg'),
                className: 'icon-btn',
                action: () => alert(0),
              },
              {
                title: 'Address',
                content: 'hi',
                className: 'icon-btn',
                action: () => alert(0),
              },
              {
                title: 'Address',
                content: (
                  <>
                    <i class="fas fa-ad"></i>Hello
                  </>
                ),
                className: 'icon-btn',
                action: () => alert(0),
              },
            ]}
            style={{ float: 'left' }}
          />
          <DraggableTaskList
            listId={this.state.listId}
            style={{ float: 'left' }}
          />
        </Sidebar>
      </>
    );
  }
}
