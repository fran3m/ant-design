"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _el_GR = _interopRequireDefault(require("rc-pagination/lib/locale/el_GR"));
var _el_GR2 = _interopRequireDefault(require("../calendar/locale/el_GR"));
var _el_GR3 = _interopRequireDefault(require("../date-picker/locale/el_GR"));
var _el_GR4 = _interopRequireDefault(require("../time-picker/locale/el_GR"));
const typeTemplate = 'Το ${label} δεν είναι έγκυρο ${type}';
const localeValues = {
  locale: 'el',
  Pagination: _el_GR.default,
  DatePicker: _el_GR3.default,
  TimePicker: _el_GR4.default,
  Calendar: _el_GR2.default,
  global: {
    placeholder: 'Παρακαλώ επιλέξτε',
    close: 'Κλείσιμο'
  },
  Table: {
    filterTitle: 'Μενού φίλτρων',
    filterConfirm: 'ΟΚ',
    filterReset: 'Επαναφορά',
    filterEmptyText: 'Χωρίς φίλτρα',
    filterCheckAll: 'Επιλογή όλων',
    filterSearchPlaceholder: 'Αναζήτηση στα φίλτρα',
    emptyText: 'Δεν υπάρχουν δεδομένα',
    selectAll: 'Επιλογή τρέχουσας σελίδας',
    selectInvert: 'Αντιστροφή τρέχουσας σελίδας',
    selectNone: 'Εκκαθάριση όλων των δεδομένων',
    selectionAll: 'Επιλογή όλων των δεδομένων',
    sortTitle: 'Ταξινόμηση',
    expand: 'Ανάπτυξη σειράς',
    collapse: 'Σύμπτυξη σειράς',
    triggerDesc: 'Κλικ για φθίνουσα ταξινόμηση',
    triggerAsc: 'Κλικ για αύξουσα ταξινόμηση',
    cancelSort: 'Κλικ για ακύρωση ταξινόμησης'
  },
  Modal: {
    okText: 'ΟΚ',
    cancelText: 'Άκυρο',
    justOkText: 'Εντάξει'
  },
  Tour: {
    Next: 'Επόμενο',
    Previous: 'Προηγούμενο',
    Finish: 'Τέλος'
  },
  Popconfirm: {
    okText: 'ΟΚ',
    cancelText: 'Άκυρο'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Αναζήτηση',
    itemUnit: 'αντικείμενο',
    itemsUnit: 'αντικείμενα',
    remove: 'Αφαίρεση',
    selectCurrent: 'Επιλογή τρέχουσας σελίδας',
    removeCurrent: 'Αφαίρεση τρέχουσας σελίδας',
    selectAll: 'Επιλογή όλων των δεδομένων',
    removeAll: 'Αφαίρεση όλων των δεδομένων',
    selectInvert: 'Αντιστροφή τρέχουσας σελίδας'
  },
  Upload: {
    uploading: 'Μεταφόρτωση...',
    removeFile: 'Αφαίρεση αρχείου',
    uploadError: 'Σφάλμα μεταφόρτωσης',
    previewFile: 'Προεπισκόπηση αρχείου',
    downloadFile: 'Λήψη αρχείου'
  },
  Empty: {
    description: 'Δεν υπάρχουν δεδομένα'
  },
  Icon: {
    icon: 'εικονίδιο'
  },
  Text: {
    edit: 'Επεξεργασία',
    copy: 'Αντιγραφή',
    copied: 'Αντιγράφηκε',
    expand: 'Ανάπτυξη',
    collapse: 'Σύμπτυξη'
  },
  Form: {
    optional: '(προαιρετικό)',
    defaultValidateMessages: {
      default: 'Σφάλμα επικύρωσης πεδίου για ${label}',
      required: 'Παρακαλώ εισάγετε ${label}',
      enum: 'Το ${label} πρέπει να είναι ένα από [${enum}]',
      whitespace: 'Το ${label} δεν μπορεί να είναι κενός χαρακτήρας',
      date: {
        format: 'Η μορφή ημερομηνίας του ${label} είναι άκυρη',
        parse: 'Το ${label} δεν μπορεί να μετατραπεί σε ημερομηνία',
        invalid: 'Το ${label} είναι μια άκυρη ημερομηνία'
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
        len: 'Το ${label} πρέπει να είναι ${len} χαρακτήρες',
        min: 'Το ${label} πρέπει να είναι τουλάχιστον ${min} χαρακτήρες',
        max: 'Το ${label} πρέπει να είναι το πολύ ${max} χαρακτήρες',
        range: 'Το ${label} πρέπει να είναι μεταξύ ${min}-${max} χαρακτήρων'
      },
      number: {
        len: 'Το ${label} πρέπει να είναι ίσο με ${len}',
        min: 'Το ${label} πρέπει να είναι τουλάχιστον ${min}',
        max: 'Το ${label} πρέπει να είναι το πολύ ${max}',
        range: 'Το ${label} πρέπει να είναι μεταξύ ${min}-${max}'
      },
      array: {
        len: 'Πρέπει να είναι ${len} ${label}',
        min: 'Τουλάχιστον ${min} ${label}',
        max: 'Το πολύ ${max} ${label}',
        range: 'Το ποσό του ${label} πρέπει να είναι μεταξύ ${min}-${max}'
      },
      pattern: {
        mismatch: 'Το ${label} δεν ταιριάζει με το μοτίβο ${pattern}'
      }
    }
  },
  Image: {
    preview: 'Προεπισκόπηση'
  },
  QRCode: {
    expired: 'Ο κωδικός QR έληξε',
    refresh: 'Ανανέωση',
    scanned: 'Σαρώθηκε'
  },
  ColorPicker: {
    presetEmpty: 'Κενό',
    transparent: 'Διαφανές',
    singleColor: 'Μονόχρωμο',
    gradientColor: 'Διαβάθμιση χρώματος'
  }
};
var _default = exports.default = localeValues;