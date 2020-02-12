import React from "react";
import { Helmet } from "react-helmet";

import CalendarView from "../../generic/CalendarView";
import Sidebar from "../../generic/Sidebar";
import Menu from "../../generic/Menu";

import { DraggableTaskList, TaskList } from "../../generic/TaskListView";
import Client from "../../../helpers/Client.ts";
import Button from "../../generic/Button";

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
          timeStep={1}
          style={{ width: "70%", float: "left", height: "70vh" }}
        ></CalendarView>

        <Button
          content="Register user"
          onClick={() => Client.registerUser("root", "user")}
        ></Button>
        <Sidebar style={{ height: "70vh" }}>
          <Menu
            buttons={[
              {
                title: "Address",
                icon: require("../../assets/icons/address-card-solid.svg"),
                className: "icon-btn",
                action: () => alert(0)
              },
              {
                title: "Address",
                icon: require("../../assets/icons/address-card-solid.svg"),
                className: "icon-btn",
                action: () => alert(0)
              },
              {
                title: "Address",
                content: "hi",
                className: "icon-btn",
                action: () => alert(0)
              },
              {
                title: "Address",
                content: (
                  <>
                    <i class="fas fa-ad"></i>Hello
                  </>
                ),
                className: "icon-btn",
                action: () => alert(0)
              }
            ]}
            style={{ float: "left" }}
          />
          <DraggableTaskList listId={0} style={{ float: "left" }} />
        </Sidebar>
      </>
    );
  }
}
