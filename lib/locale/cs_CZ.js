"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cs_CZ = _interopRequireDefault(require("rc-pagination/lib/locale/cs_CZ"));
var _cs_CZ2 = _interopRequireDefault(require("../calendar/locale/cs_CZ"));
var _cs_CZ3 = _interopRequireDefault(require("../date-picker/locale/cs_CZ"));
var _cs_CZ4 = _interopRequireDefault(require("../time-picker/locale/cs_CZ"));
const typeTemplate = '${label} není platný ${type}';
const localeValues = {
  locale: 'cs',
  Pagination: _cs_CZ.default,
  DatePicker: _cs_CZ3.default,
  TimePicker: _cs_CZ4.default,
  Calendar: _cs_CZ2.default,
  global: {
    placeholder: 'Prosím vyber',
    close: 'Zavřít'
  },
  Table: {
    filterTitle: 'Filtr',
    filterConfirm: 'Potvrdit',
    filterReset: 'Obnovit',
    filterEmptyText: 'Žádné filtry',
    filterCheckAll: 'Vybrat všechny položky',
    filterSearchPlaceholder: 'Vyhledat ve filtrech',
    emptyText: 'Žádná data',
    selectAll: 'Vybrat všechny řádky na současné stránce',
    selectInvert: 'Invertovat výběr na současné stránce',
    selectNone: 'Odznačit vše',
    selectionAll: 'Vybrat všechny řádky',
    sortTitle: 'Řadit',
    expand: 'Rozbalit řádek',
    collapse: 'Zabalit řádek',
    triggerDesc: 'Klikni pro sestupné řazení',
    triggerAsc: 'Klikni pro vzestupné řazení',
    cancelSort: 'Klikni pro zrušení řazení'
  },
  Tour: {
    Next: 'Další',
    Previous: 'Předchozí',
    Finish: 'Dokončit'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Zrušit',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Zrušit'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Vyhledávání',
    itemUnit: 'položka',
    itemsUnit: 'položek',
    remove: 'Odstranit',
    selectCurrent: 'Vybrat aktuální stranu',
    removeCurrent: 'Smazat aktuální stranu',
    selectAll: 'Označit vše',
    removeAll: 'Odznačit vše',
    selectInvert: 'Opačný výběr'
  },
  Upload: {
    uploading: 'Nahrávání...',
    removeFile: 'Odstranit soubor',
    uploadError: 'Chyba při nahrávání',
    previewFile: 'Zobrazit soubor',
    downloadFile: 'Stáhnout soubor'
  },
  Empty: {
    description: 'Žádná data'
  },
  Icon: {
    icon: 'ikona'
  },
  Text: {
    edit: 'Upravit',
    copy: 'Kopírovat',
    copied: 'Zkopírované',
    expand: 'Zvětšit'
  },
  Form: {
    optional: '(nepovinné)',
    defaultValidateMessages: {
      default: 'Validační chyba pole pro ${label}',
      required: 'Prosím vložte ${label}',
      enum: '${label} musí být jeden z [${enum}]',
      whitespace: '${label} nemůže být prázdný znak',
      date: {
        format: '${label} formát datumu je neplatný',
        parse: '${label} není možné konvertovat na datum',
        invalid: '${label} je neplatné datum'
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
        len: '${label} musí být ${len} znaků',
        min: '${label} musí být alespoň ${min} znaků',
        max: '${label} musí být do ${max} znaků',
        range: '${label} musí být mezi ${min}-${max} znaky'
      },
      number: {
        len: '${label} musí být stejný jako ${len}',
        min: '${label} musí být minimálně ${min}',
        max: '${label} musí být maximálně ${max}',
        range: '${label} musí být mezi ${min}-${max}'
      },
      array: {
        len: 'Musí být ${len} ${label}',
        min: 'Alespoň ${min} ${label}',
        max: 'Nejvíc ${max} ${label}',
        range: 'Počet ${label} musí být mezi ${min}-${max}'
      },
      pattern: {
        mismatch: '${label} neodpovídá vzoru ${pattern}'
      }
    }
  },
  Image: {
    preview: 'Náhled'
  },
  QRCode: {
    expired: 'QR kód vypršel',
    refresh: 'Obnovit',
    scanned: 'Naskenováno'
  },
  ColorPicker: {
    presetEmpty: 'Prázdné',
    transparent: 'Průhledné',
    singleColor: 'Jednobarevné',
    gradientColor: 'Přechodové'
  }
};
var _default = exports.default = localeValues;