const mongoose = require('mongoose');
const validator = require('validator');
const { URL_REGEX } = require('../utils/const');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(val) {
          return URL_REGEX.test(val);
        },
        message: 'Поле "avatar" должно быть валидным url-адресом',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(isCorrect) {
          return validator.isEmail(isCorrect);
        },
        message: 'Поле "email" должно быть валидным email-адресом',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 2,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
