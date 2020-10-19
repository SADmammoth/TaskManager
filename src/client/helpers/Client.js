import concatPath from './concatPath';

const Client = {
  userToken: 2233,
  apiPath: process.env.API_PATH,
  subscribed: false,
  subscribers: {},
  subLoop: 0,
  abortController: new AbortController(),
  headers: { Authorization: '' },

  addToken: (token) => {
    let cleanToken = token.replace('JWT ', '');
    Client.headers.Authorization = `bearer ${cleanToken}`;
    localStorage.setItem('token', cleanToken);
  },
  replaceTask: async (task, listId, taskId, callback) => {
    await fetch(
      concatPath(Client.apiPath, 'lists', listId.toString(), taskId.toString()),
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...Client.headers },
        body: JSON.stringify(task),
      }
    )
      .then(Client.checkStatus)
      .then(callback);
  },

  changeTask: async (task, listId, taskId, callback) => {
    await fetch(
      concatPath(Client.apiPath, 'lists', listId.toString(), taskId.toString()),
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...Client.headers },
        body: JSON.stringify(task),
      }
    )
      .then(Client.checkStatus)
      .then(callback);
  },

  addTask: async (task, listId, callback) => {
    await fetch(concatPath(Client.apiPath, 'lists', listId.toString()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...Client.headers,
      },
      body: JSON.stringify(task),
    })
      .then(Client.checkStatus)
      .then(callback);
  },

  forceUpdate: (object) => {
    Client.notify(object);
  },

  notify: (object) => {
    console.log('View updated');

    Object.values(Client.subscribers).forEach((cb) => {
      console.log(cb);
      !cb || cb(object);
    });
  },

  subscribeOnDataUpdate: async (path, callback) => {
    Client.subscribers[path] = callback;
    Client.subLoop = 0;
    Client.subscribed = true;
    while (Client.subscribed) {
      await Client.requestSubscription((res) =>
        Client.notify(Client.parseJSON(res))
      );
      if (Client.subLoop > 5) {
        throw new Error('Subscription loop is overloaded');
      }
    }
    console.log(Client.subscribers);
  },

  unsubscribe: async (path) => {
    console.log('Unsubscribed');
    Client.subscribers[path] = undefined;
    if (Object.values(Client.subscribers).filter((el) => !!el).length === 0) {
      Client.subscribed = false;
      Client.abortController.abort();
      Client.abortController = new AbortController();
      Client.signal = Client.abortController.signal;
    }
    console.log(Client.subscribers);
  },

  requestSubscription: async (onSuccess) => {
    if (Object.values(Client.subscribers).filter((el) => !!el).length === 0) {
      Client.subscribed = false;
      return;
    }
    Client.subscribed = true;

    console.log('Subscribed');
    return fetch(concatPath(Client.apiPath, '/subscribe'), {
      signal: Client.abortController.signal,
      headers: { ...Client.headers },
    })
      .then((res) => {
        Client.checkStatus(res);
      })
      .then(() => {
        Client.subLoop = 0;
      })
      .then(onSuccess)
      .catch((e) => {
        Client.subLoop++;
        console.log(e);
      });
  },

  getTasks: async (taskListId, callback) => {
    let response = await fetch(
      concatPath(Client.apiPath, '/lists/', taskListId.toString()),
      {
        headers: { ...Client.headers },
      }
    ).then(Client.checkStatus);

    let responseObject = await Client.parseJSON(response);
    callback && callback();

    return responseObject;
  },

  getAllTasks: async (callback) => {
    let response = await fetch(concatPath(Client.apiPath, '/lists/tasks/all'), {
      headers: { ...Client.headers },
    }).then(Client.checkStatus);

    let responseObject = await Client.parseJSON(response);
    if (callback) callback(responseObject);

    return responseObject;
  },

  getListsNames: async () => {
    let response = await fetch(concatPath(Client.apiPath, '/lists/all'), {
      headers: { ...Client.headers },
    }).then(Client.checkStatus);

    let responseObject = await Client.parseJSON(response);

    return responseObject.map((list, i) => ({
      label: list.title,
      value: i.toString(),
    }));
  },

  createList: async (title) => {
    await fetch(concatPath(Client.apiPath, '/lists'), {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json', ...Client.headers },
    }).then(Client.checkStatus);
  },

  registerUser: async (login, password) => {
    await fetch(concatPath(Client.apiPath, '/users'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...Client.headers },
      body: JSON.stringify({ login: login, password: password }),
    });
  },

  loginUser: async (login, password) => {
    let { token } = await fetch(concatPath(Client.apiPath, '/users/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...Client.headers },
      body: JSON.stringify({ login: login, password: password }),
    })
      .then(Client.checkStatus)
      .then(Client.parseJSON);
    Client.addToken(token);
  },

  setListOrder: (listId, order) => {
    return fetch(concatPath(Client.apiPath, `/lists/${listId}/orders`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...Client.headers },
      body: JSON.stringify(order),
    });
  },

  changeListOrder: (listId, order) => {
    return fetch(
      concatPath(Client.apiPath, `/lists/${listId}/orders/current`),
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...Client.headers },
        body: JSON.stringify(order),
      }
    );
  },

  deleteTask: (listId, taskId) => {
    return fetch(concatPath(Client.apiPath, `/lists/${listId}/${taskId}`), {
      method: 'DELETE',
      headers: { ...Client.headers },
    });
  },

  checkStatus: (response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(
      'Status code ' + response.status + ': ' + response.statusText
    );
  },
  parseJSON: (response) => {
    if (!response) {
      return;
    }
    return response.json();
  },
};

export default Client;
