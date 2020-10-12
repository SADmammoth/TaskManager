import { StatusCodes } from 'http-status-codes';

const self = {
  promises: {},
  triggers: {},

  createPromise: function (userId) {
    self.promises[userId] = new Promise((resolve) => {
      self.triggers[userId] = () => resolve(true);
    });
  },

  removePromise: function (userId) {
    self.promises[userId] = undefined;
    self.triggers[userId] = undefined;
  },

  update: function (req, res) {
    let userId;

    if (res) {
      userId = req.user._id;
    } else {
      userId = req;
    }

    if (self.triggers[userId]) {
      self.triggers[userId]();
    }

    console.log('Data updated');
  },

  subscribe: async function (req, res) {
    let {
      user: { _id: userId },
    } = req;

    self.createPromise(userId);

    const shouldUpdate = await self.promises[userId];

    req.on('close', function () {
      console.log('Subscription cancelled');
      self.removePromise(userId);
    });

    if (shouldUpdate) {
      console.log('Subscriber notified');
      self.removePromise(userId);
      res.send();
    } else {
      res.status(StatusCodes.NO_CONTENT);
      res.send();
    }
  },
};

export default self;
