const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const crypto = require('crypto');

let UserSchema = new Schema({
  login: {
    type: Schema.Types.String,
    required: 'Provide login',
    unique: 'Login is already exists',
  },
  passwordHash: Schema.Types.String,
  salt: Schema.Types.String,
});

UserSchema.virtual('password')
  .set(function (password) {
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64');
      this.passwordHash = crypto
        .pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
        .toString('hex');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })

  .get(function () {
    return this.passwordHash;
  });

UserSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return (
    crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString('hex') ===
    this.passwordHash
  );
};

let User = mongoose.model('User', UserSchema);

module.exports = User;
