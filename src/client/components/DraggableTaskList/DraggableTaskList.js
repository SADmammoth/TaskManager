import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableTask from './DraggableTask';
import DraggableList from '../Draggable/DraggableList/DraggableList';
import Client from '../../helpers/Client.ts';
import useSubscription from '../../helpers/useSubscription';

function DraggableTaskList(props) {
  const [tasks, setTasks] = useState([]);
  const [taskIds, setTaskIds] = useState([]);
  const [dragging, setDragging] = useState(null);

  const { style, listId, className } = props;

  const [subscribe, unsubscribe] = useSubscription(
    document.location.pathname,
    requestTaskList
  );

  useEffect(() => {
    requestTaskList();
  }, []);

  useEffect(() => {
    subscribe(document.location.pathname);
    return () => {
      unsubscribe();
    };
  });

  const requestTaskList = async () => {
    let tasks = await Client.getTasks(listId);

    if (tasks.tasks) {
      setTasks(
        tasks.tasks
          .map((el, i) => ({ ...el, taskId: i }))
          .filter((el) => !el.assignedTo)
      );
      setTaskIds(tasks.tasks.map((task, index) => index));
    }
  };

  const createTask = (task, taskId, listId, unassignedIndex) => {
    if (!task) {
      return task;
    }
    return (
      <DraggableTask
        key={taskId + listId}
        taskId={taskId}
        listId={listId}
        {...task}
        onDragStart={() => {
          setDragging(unassignedIndex);
        }}
        onDragReject={() => {
          setDragging(null);
        }}
      />
    );
  };

  return (
    <ul className={'no-type-list ' + className || ''} style={style}>
      <DraggableList
        onOrderChange={({ taskId, index }) => {
          const stateTasks = { ...tasks };
          let sourceIndex = stateTasks.findIndex(
            ({ taskId: candidateId }) => candidateId === taskId
          );

          tasks.splice(index.x, 0, stateTasks.splice(sourceIndex, 1)[0]);

          let sorted = stateTasks.map((task) => task.taskId);
          let notSorted = taskIds.filter((taskId) => !sorted.includes(taskId));
          Client.changeListOrder(listId, [...sorted, ...notSorted]);
          setTasks(tasks);
          setDragging(null);
        }}
        dragging={dragging}
        list={tasks.map((el, i) => {
          return createTask(el, el.taskId, listId, i);
        })}
      />
    </ul>
  );
}

DraggableTaskList.propTypes = {
  listId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  className: PropTypes.string,
};

export default DraggableTaskList;
