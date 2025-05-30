"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _kmr_IQ = _interopRequireDefault(require("rc-pagination/lib/locale/kmr_IQ"));
var _kmr_IQ2 = _interopRequireDefault(require("../calendar/locale/kmr_IQ"));
var _kmr_IQ3 = _interopRequireDefault(require("../date-picker/locale/kmr_IQ"));
var _kmr_IQ4 = _interopRequireDefault(require("../time-picker/locale/kmr_IQ"));
const localeValues = {
  locale: 'ku',
  Pagination: _kmr_IQ.default,
  DatePicker: _kmr_IQ3.default,
  TimePicker: _kmr_IQ4.default,
  Calendar: _kmr_IQ2.default,
  global: {
    close: 'Betal ke'
  },
  Table: {
    filterTitle: 'Menuê peldanka',
    filterConfirm: 'Temam',
    filterReset: 'Jê bibe',
    selectAll: 'Hemî hilbijêre',
    selectInvert: 'Hilbijartinan veguhere'
  },
  Tour: {
    Next: 'Temam',
    Previous: 'Betal ke',
    Finish: 'Temam'
  },
  Modal: {
    okText: 'Temam',
    cancelText: 'Betal ke',
    justOkText: 'Temam'
  },
  Popconfirm: {
    okText: 'Temam',
    cancelText: 'Betal ke'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Lêgerîn',
    itemUnit: 'tişt',
    itemsUnit: 'tişt'
  },
  Upload: {
    uploading: 'Bardike...',
    removeFile: 'Pelê rabike',
    uploadError: 'Xeta barkirine',
    previewFile: 'Pelê pêşbibîne',
    downloadFile: 'Pelê dakêşin'
  },
  Empty: {
    description: 'Agahî tune'
  }
};
var _default = exports.default = localeValues;