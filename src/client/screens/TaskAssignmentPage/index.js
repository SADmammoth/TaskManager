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

import AddressCardIcon from '../../assets/icons/address-card-solid.svg';

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
            tasks[new Date(el.assignedTo)] = el;
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
              tasks[new Date(el.assignedTo)] = el;
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
        <Sidebar style={{ height: '70vh', width: '30vw' }}>
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
                key: 'address-btn-1',
                title: 'Address',
                icon: <AddressCardIcon />,
                className: 'icon-btn',
                action: () => alert(0),
              },
              {
                key: 'address-btn-2',
                title: 'Address',
                icon: <AddressCardIcon />,
                className: 'icon-btn',
                action: () => alert(0),
              },
              {
                key: 'address-btn-3',
                title: 'Address',
                content: 'hi',
                className: 'icon-btn',
                action: () => alert(0),
              },
              {
                key: 'address-btn-4',
                title: 'Address',
                content: (
                  <>
                    <i className="fas fa-ad"></i>Hello
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
