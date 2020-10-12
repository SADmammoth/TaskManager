import TaskList from '../models/collections/TaskList.ts';
import { getRoot } from '../controllers/DataController';
import { mapListId } from './mapListId';

export async function addTaskToList(owner, listRequestId, task) {
  const root = await getRoot(owner);
  const listId = mapListId(root, listRequestId);

  const list = await TaskList.findById(listId);

  if (!list) {
    return list;
  }

  list.addTask(task);

  return list;
}
