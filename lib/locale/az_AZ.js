"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _az_AZ = _interopRequireDefault(require("rc-pagination/lib/locale/az_AZ"));
var _az_AZ2 = _interopRequireDefault(require("../calendar/locale/az_AZ"));
var _az_AZ3 = _interopRequireDefault(require("../date-picker/locale/az_AZ"));
var _az_AZ4 = _interopRequireDefault(require("../time-picker/locale/az_AZ"));
const typeTemplate = '${label} Hökmlü deyil ${type}';
const localeValues = {
  locale: 'az',
  Pagination: _az_AZ.default,
  DatePicker: _az_AZ3.default,
  TimePicker: _az_AZ4.default,
  Calendar: _az_AZ2.default,
  global: {
    placeholder: 'Zəhmət olmasa seçin',
    close: 'Bağla'
  },
  Table: {
    filterTitle: 'Filter menyu',
    filterConfirm: 'Axtar',
    filterReset: 'Sıfırla',
    emptyText: 'Məlumat yoxdur',
    selectAll: 'Cari səhifəni seç',
    selectInvert: 'Mövcud səhifənin elementlərinin sırasını tərs çevir',
    filterEmptyText: 'Filter yoxdur',
    filterCheckAll: 'Bütün maddələri seç',
    filterSearchPlaceholder: 'Filterlərdə axtar',
    selectNone: 'Bütün məlumatı sil',
    selectionAll: 'Bütün məlumatı seç',
    sortTitle: 'Sırala',
    expand: 'Sıranı genişləndir',
    collapse: 'Sıranı qapadın',
    triggerDesc: 'Azalan sıralama üçün klik edin',
    triggerAsc: 'Artan sıralama üçün klik edin',
    cancelSort: 'Sıralamayı ləğv edin'
  },
  Tour: {
    Next: 'Növbəti',
    Previous: 'Əvvəlki',
    Finish: 'Bitir'
  },
  Modal: {
    okText: 'Bəli',
    cancelText: 'Ləğv et',
    justOkText: 'Bəli'
  },
  Popconfirm: {
    okText: 'Bəli',
    cancelText: 'Ləğv et'
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'Tapılmadı',
    searchPlaceholder: 'Burada axtar',
    itemUnit: 'item',
    itemsUnit: 'items',
    remove: 'Sil',
    selectCurrent: 'Cari səhifəni seç',
    removeCurrent: 'Cari səhifəni sil',
    selectAll: 'Bütün məlumatı seç',
    deselectAll: 'Bütün seçmə nişanlarını sil',
    removeAll: 'Bütün məlumatı sil',
    selectInvert: 'Mövcud səhifənin elementlərinin sırasını tərs çevir'
  },
  Upload: {
    uploading: 'Yüklənir...',
    removeFile: 'Faylı sil',
    uploadError: 'Yükləmə xətası',
    previewFile: 'Fayla önbaxış',
    downloadFile: 'Faylı yüklə'
  },
  Empty: {
    description: 'Məlumat yoxdur'
  },
  Icon: {
    icon: 'icon'
  },
  Text: {
    edit: 'Dəyişiklik et',
    copy: 'Kopyala',
    copied: 'Kopyalandı',
    expand: 'Genişləndir',
    collapse: 'Yığılma'
  },
  Form: {
    optional: '（Seçimli）',
    defaultValidateMessages: {
      default: 'Sahə təsdiq xətası ${label}',
      required: 'Xahiş edirik daxil olun ${label}',
      enum: '${label} Onlardan biri olmalıdır[${enum}]',
      whitespace: '${label} Null xarakter ola bilməz',
      date: {
        format: '${label} Tarix formatı hökmlü deyil',
        parse: '${label} Tarixi döndərmək mümkün deyil',
        invalid: '${label} səhv tarixdir'
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
        len: '${label} Olmalıdır ${len} işarələr',
        min: '${label} ən az ${min} işarələr',
        max: '${label} ən çox ${max} işarələr',
        range: '${label} Olmalıdır ${min}-${max} hərflər arasında'
      },
      number: {
        len: '${label} Bərabər olmalıdır ${len}',
        min: '${label} Minimal dəyəri ${min}',
        max: '${label} Maksimal qiymət: ${max}',
        range: '${label} Olmalıdır ${min}-${max} aralarında'
      },
      array: {
        len: 'Olmalıdır ${len} parça ${label}',
        min: 'ən az ${min} parça ${label}',
        max: 'ən çox ${max} parça ${label}',
        range: '${label} miqdarıOlmalıdır ${min}-${max} aralarında'
      },
      pattern: {
        mismatch: '${label} Şablona uyğun gəlmir ${pattern}'
      }
    }
  },
  Image: {
    preview: 'Önbaxış'
  },
  QRCode: {
    expired: 'QR kodunun müddəti bitmişdir',
    refresh: 'Yenilə',
    scanned: 'Gözətildi'
  },
  ColorPicker: {
    presetEmpty: 'Boşdur',
    transparent: 'Şəffaf',
    singleColor: 'Tək rəng',
    gradientColor: 'Gradient rəng'
  }
};
var _default = exports.default = localeValues;