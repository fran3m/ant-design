"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fa_IR = _interopRequireDefault(require("rc-pagination/lib/locale/fa_IR"));
var _fa_IR2 = _interopRequireDefault(require("../calendar/locale/fa_IR"));
var _fa_IR3 = _interopRequireDefault(require("../date-picker/locale/fa_IR"));
var _fa_IR4 = _interopRequireDefault(require("../time-picker/locale/fa_IR"));
const typeTemplate = '${label} از نوع ${type} معتبر نیست';
const localeValues = {
  locale: 'fa',
  Pagination: _fa_IR.default,
  DatePicker: _fa_IR3.default,
  TimePicker: _fa_IR4.default,
  Calendar: _fa_IR2.default,
  global: {
    placeholder: 'لطفاً انتخاب کنید',
    close: 'بستن'
  },
  Table: {
    filterTitle: 'منوی فیلتر',
    filterConfirm: 'تایید',
    filterReset: 'پاک کردن',
    filterEmptyText: 'بدون فیلتر',
    filterCheckAll: 'انتخاب همه‌ی موارد',
    filterSearchPlaceholder: 'جستجو در فیلترها',
    emptyText: 'بدون داده',
    selectAll: 'انتخاب صفحه‌ی کنونی',
    selectInvert: 'معکوس کردن انتخاب‌ها در صفحه‌ی کنونی',
    selectNone: 'انتخاب هیچکدام',
    selectionAll: 'انتخاب همه‌ی داده‌ها',
    sortTitle: 'مرتب سازی',
    expand: 'باز شدن ردیف',
    collapse: 'بستن ردیف',
    triggerDesc: 'ترتیب نزولی',
    triggerAsc: 'ترتیب صعودی',
    cancelSort: 'لغوِ ترتیبِ داده شده'
  },
  Tour: {
    Next: 'بعدی',
    Previous: 'قبلی',
    Finish: 'پایان'
  },
  Modal: {
    okText: 'تایید',
    cancelText: 'لغو',
    justOkText: 'تایید'
  },
  Popconfirm: {
    okText: 'تایید',
    cancelText: 'لغو'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'جستجو',
    itemUnit: 'عدد',
    itemsUnit: 'عدد',
    remove: 'حذف',
    selectCurrent: 'انتخاب صفحه فعلی',
    removeCurrent: 'پاک کردن انتخاب‌های صفحه فعلی',
    selectAll: 'انتخاب همه',
    deselectAll: 'لغو انتخاب همه',
    removeAll: 'پاک کردن همه انتخاب‌ها',
    selectInvert: 'معکوس کردن انتخاب‌ها در صفحه‌ی کنونی'
  },
  Upload: {
    uploading: 'در حال آپلود...',
    removeFile: 'حذف فایل',
    uploadError: 'خطا در آپلود',
    previewFile: 'مشاهده‌ی فایل',
    downloadFile: 'دریافت فایل'
  },
  Empty: {
    description: 'داده‌ای موجود نیست'
  },
  Icon: {
    icon: 'آیکن'
  },
  Text: {
    edit: 'ویرایش',
    copy: 'کپی',
    copied: 'کپی شد',
    expand: 'توسعه',
    collapse: 'بستن'
  },
  Form: {
    optional: '(اختیاری)',
    defaultValidateMessages: {
      default: 'خطا در ${label}',
      required: 'فیلد ${label} اجباریست',
      enum: '${label} باید یکی از [${enum}] باشد',
      whitespace: '${label} نمیتواند خالی باشد',
      date: {
        format: 'ساختار تاریخ در ${label} نامعتبر است',
        parse: '${label} قابل تبدیل به تاریخ نیست',
        invalid: '${label} تاریخی نا معتبر است'
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
        len: '${label} باید ${len} کاراکتر باشد',
        min: '${label} باید حداقل ${min} کاراکتر باشد',
        max: '${label} باید حداکثر ${max} کاراکتر باشد',
        range: '${label} باید بین ${min}-${max} کاراکتر باشد'
      },
      number: {
        len: '${label} باید برابر ${len}',
        min: '${label} حداقل میتواند ${min} باشد',
        max: '${label} حداکثر میتواند ${max} باشد',
        range: '${label} باید بین ${min}-${max} باشد'
      },
      array: {
        len: 'تعداد ${label} باید ${len} باشد.',
        min: 'تعداد ${label} حداقل باید ${min} باشد',
        max: 'تعداد ${label} حداکثر باید ${max} باشد',
        range: 'مقدار ${label} باید بین ${min}-${max} باشد'
      },
      pattern: {
        mismatch: 'الگوی ${label} با ${pattern} برابری نمی‌کند'
      }
    }
  },
  Image: {
    preview: 'پیش‌نمایش'
  },
  QRCode: {
    expired: 'کد QR منقضی شد',
    refresh: 'به‌روزرسانی',
    scanned: 'اسکن شد'
  },
  ColorPicker: {
    presetEmpty: 'خالی',
    transparent: 'شفاف',
    singleColor: 'تک‌رنگ',
    gradientColor: 'گرادینت'
  }
};
var _default = exports.default = localeValues;