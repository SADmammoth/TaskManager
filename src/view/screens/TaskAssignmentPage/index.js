import React from 'react';
import { Helmet } from 'react-helmet';

import CalendarView from '../../generic/CalendarView';
import Sidebar from '../../generic/Sidebar';
import Menu from '../../generic/Menu';

import { DraggableTaskList, TaskList } from '../../generic/TaskListView';

export default class TaskAssignmentPage extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
        <h1 className="h1">Home</h1>
        <CalendarView
          rows={10}
          columns={10}
          startDate={new Date()}
          dateStep={1}
        ></CalendarView>
        <Sidebar>
          <Menu
            buttons={[
              {
                title: 'Address',
                icon: require('../../assets/icons/address-card-solid.svg'),
                action: () => alert(0)
              },
              {
                title: 'Address',
                icon: require('../../assets/icons/address-card-solid.svg'),
                action: () => alert(0)
              }
            ]}
            height={20}
            width={100}
          />
          <DraggableTaskList tasks={[{ title: 'ok' }, { title: 'ok' }]} />
        </Sidebar>
      </>
    );
  }
}
