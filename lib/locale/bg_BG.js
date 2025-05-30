"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bg_BG = _interopRequireDefault(require("rc-pagination/lib/locale/bg_BG"));
var _bg_BG2 = _interopRequireDefault(require("../calendar/locale/bg_BG"));
var _bg_BG3 = _interopRequireDefault(require("../date-picker/locale/bg_BG"));
var _bg_BG4 = _interopRequireDefault(require("../time-picker/locale/bg_BG"));
const typeTemplate = '${label} не е валиден ${type}';
const localeValues = {
  locale: 'bg',
  Pagination: _bg_BG.default,
  DatePicker: _bg_BG3.default,
  TimePicker: _bg_BG4.default,
  Calendar: _bg_BG2.default,
  global: {
    close: 'Затвори'
  },
  Table: {
    filterTitle: 'Филтриране',
    filterConfirm: 'Добре',
    filterReset: 'Нулриане',
    selectAll: 'Избор на текуща страница',
    selectInvert: 'Обръщане'
  },
  Tour: {
    Next: 'Следващ',
    Previous: 'Предишен',
    Finish: 'Завърши'
  },
  Modal: {
    okText: 'Добре',
    cancelText: 'Отказ',
    justOkText: 'Добре'
  },
  Popconfirm: {
    okText: 'Добре',
    cancelText: 'Отказ'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Търсене',
    itemUnit: 'избор',
    itemsUnit: 'избори'
  },
  Upload: {
    uploading: 'Качване...',
    removeFile: 'Премахване',
    uploadError: 'Грешка при качването',
    previewFile: 'Преглед',
    downloadFile: 'Свали файл'
  },
  Empty: {
    description: 'Няма данни'
  },
  Form: {
    optional: '（по желание）',
    defaultValidateMessages: {
      default: 'грешка при проверка на полето ${label}',
      required: 'Моля, въведете ${label}',
      enum: '${label} трябва да е един от [${enum}]',
      whitespace: '${label} Не може да бъде нулев знак',
      date: {
        format: '${label} невалиден формат на датата',
        parse: '${label} не може да се преобразува в дата',
        invalid: '${label} е невалидна дата'
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: '${label} ще бъде ${len} знака',
        min: '${label} най-малко ${min} герои',
        max: '${label} повечето ${max} герои',
        range: '${label} Трябва да е вътре ${min}-${max} между знаци'
      },
      number: {
        len: '${label} трябва да е равно на ${len}',
        min: '${label} Минималната стойност е ${min}',
        max: '${label} Максималната стойност е ${max}',
        range: '${label} Трябва да е вътре ${min}-${max} между'
      },
      array: {
        len: 'ще бъде ${len} индивидуален ${label}',
        min: 'най-малко ${min} индивидуален ${label}',
        max: 'повечето ${max} индивидуален ${label}',
        range: '${label} Количеството трябва да е вътре ${min}-${max} между'
      },
      pattern: {
        mismatch: '${label} не отговаря на модела ${pattern}'
      }
    }
  }
};
var _default = exports.default = localeValues;