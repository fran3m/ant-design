"use strict";
"use client";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcFieldForm = require("rc-field-form");
var _useState = _interopRequireDefault(require("rc-util/lib/hooks/useState"));
var _ref2 = require("rc-util/lib/ref");
var _reactNode = require("../../_util/reactNode");
var _warning = require("../../_util/warning");
var _configProvider = require("../../config-provider");
var _useCSSVarCls = _interopRequireDefault(require("../../config-provider/hooks/useCSSVarCls"));
var _context = require("../context");
var _useChildren = _interopRequireDefault(require("../hooks/useChildren"));
var _useFormItemStatus = _interopRequireDefault(require("../hooks/useFormItemStatus"));
var _useFrameState = _interopRequireDefault(require("../hooks/useFrameState"));
var _useItemRef = _interopRequireDefault(require("../hooks/useItemRef"));
var _style = _interopRequireDefault(require("../style"));
var _util = require("../util");
var _ItemHolder = _interopRequireDefault(require("./ItemHolder"));
var _StatusProvider = _interopRequireDefault(require("./StatusProvider"));
const NAME_SPLIT = '__SPLIT__';
const _ValidateStatuses = ['success', 'warning', 'error', 'validating', ''];
// https://github.com/ant-design/ant-design/issues/46417
// `getValueProps` may modify the value props name,
// we should check if the control is similar.
function isSimilarControl(a, b) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  return keysA.length === keysB.length && keysA.every(key => {
    const propValueA = a[key];
    const propValueB = b[key];
    return propValueA === propValueB || typeof propValueA === 'function' || typeof propValueB === 'function';
  });
}
const MemoInput = /*#__PURE__*/React.memo(_ref => {
  let {
    children
  } = _ref;
  return children;
}, (prev, next) => isSimilarControl(prev.control, next.control) && prev.update === next.update && prev.childProps.length === next.childProps.length && prev.childProps.every((value, index) => value === next.childProps[index]));
function genEmptyMeta() {
  return {
    errors: [],
    warnings: [],
    touched: false,
    validating: false,
    name: [],
    validated: false
  };
}
function InternalFormItem(props) {
  const {
    name,
    noStyle,
    className,
    dependencies,
    prefixCls: customizePrefixCls,
    shouldUpdate,
    rules,
    children,
    required,
    label,
    messageVariables,
    trigger = 'onChange',
    validateTrigger,
    hidden,
    help,
    layout
  } = props;
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const {
    name: formName
  } = React.useContext(_context.FormContext);
  const mergedChildren = (0, _useChildren.default)(children);
  const isRenderProps = typeof mergedChildren === 'function';
  const notifyParentMetaChange = React.useContext(_context.NoStyleItemContext);
  const {
    validateTrigger: contextValidateTrigger
  } = React.useContext(_rcFieldForm.FieldContext);
  const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;
  const hasName = !(name === undefined || name === null);
  const prefixCls = getPrefixCls('form', customizePrefixCls);
  // Style
  const rootCls = (0, _useCSSVarCls.default)(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(prefixCls, rootCls);
  // ========================= Warn =========================
  const warning = (0, _warning.devUseWarning)('Form.Item');
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(name !== null, 'usage', '`null` is passed as `name` property') : void 0;
  }
  // ========================= MISC =========================
  // Get `noStyle` required info
  const listContext = React.useContext(_rcFieldForm.ListContext);
  const fieldKeyPathRef = React.useRef(null);
  // ======================== Errors ========================
  // >>>>> Collect sub field errors
  const [subFieldErrors, setSubFieldErrors] = (0, _useFrameState.default)({});
  // >>>>> Current field errors
  const [meta, setMeta] = (0, _useState.default)(() => genEmptyMeta());
  const onMetaChange = nextMeta => {
    // This keyInfo is not correct when field is removed
    // Since origin keyManager no longer keep the origin key anymore
    // Which means we need cache origin one and reuse when removed
    const keyInfo = listContext === null || listContext === void 0 ? void 0 : listContext.getKey(nextMeta.name);
    // Destroy will reset all the meta
    setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta, true);
    // Bump to parent since noStyle
    if (noStyle && help !== false && notifyParentMetaChange) {
      let namePath = nextMeta.name;
      if (!nextMeta.destroy) {
        if (keyInfo !== undefined) {
          const [fieldKey, restPath] = keyInfo;
          namePath = [fieldKey].concat((0, _toConsumableArray2.default)(restPath));
          fieldKeyPathRef.current = namePath;
        }
      } else {
        // Use origin cache data
        namePath = fieldKeyPathRef.current || namePath;
      }
      notifyParentMetaChange(nextMeta, namePath);
    }
  };
  // >>>>> Collect noStyle Field error to the top FormItem
  const onSubItemMetaChange = (subMeta, uniqueKeys) => {
    // Only `noStyle` sub item will trigger
    setSubFieldErrors(prevSubFieldErrors => {
      const clone = Object.assign({}, prevSubFieldErrors);
      // name: ['user', 1] + key: [4] = ['user', 4]
      const mergedNamePath = [].concat((0, _toConsumableArray2.default)(subMeta.name.slice(0, -1)), (0, _toConsumableArray2.default)(uniqueKeys));
      const mergedNameKey = mergedNamePath.join(NAME_SPLIT);
      if (subMeta.destroy) {
        // Remove
        delete clone[mergedNameKey];
      } else {
        // Update
        clone[mergedNameKey] = subMeta;
      }
      return clone;
    });
  };
  // >>>>> Get merged errors
  const [mergedErrors, mergedWarnings] = React.useMemo(() => {
    const errorList = (0, _toConsumableArray2.default)(meta.errors);
    const warningList = (0, _toConsumableArray2.default)(meta.warnings);
    Object.values(subFieldErrors).forEach(subFieldError => {
      errorList.push.apply(errorList, (0, _toConsumableArray2.default)(subFieldError.errors || []));
      warningList.push.apply(warningList, (0, _toConsumableArray2.default)(subFieldError.warnings || []));
    });
    return [errorList, warningList];
  }, [subFieldErrors, meta.errors, meta.warnings]);
  // ===================== Children Ref =====================
  const getItemRef = (0, _useItemRef.default)();
  // ======================== Render ========================
  function renderLayout(baseChildren, fieldId, isRequired) {
    if (noStyle && !hidden) {
      return /*#__PURE__*/React.createElement(_StatusProvider.default, {
        prefixCls: prefixCls,
        hasFeedback: props.hasFeedback,
        validateStatus: props.validateStatus,
        meta: meta,
        errors: mergedErrors,
        warnings: mergedWarnings,
        noStyle: true
      }, baseChildren);
    }
    return /*#__PURE__*/React.createElement(_ItemHolder.default, Object.assign({
      key: "row"
    }, props, {
      className: (0, _classnames.default)(className, cssVarCls, rootCls, hashId),
      prefixCls: prefixCls,
      fieldId: fieldId,
      isRequired: isRequired,
      errors: mergedErrors,
      warnings: mergedWarnings,
      meta: meta,
      onSubItemMetaChange: onSubItemMetaChange,
      layout: layout
    }), baseChildren);
  }
  if (!hasName && !isRenderProps && !dependencies) {
    return wrapCSSVar(renderLayout(mergedChildren));
  }
  let variables = {};
  if (typeof label === 'string') {
    variables.label = label;
  } else if (name) {
    variables.label = String(name);
  }
  if (messageVariables) {
    variables = Object.assign(Object.assign({}, variables), messageVariables);
  }
  // >>>>> With Field
  return wrapCSSVar(/*#__PURE__*/React.createElement(_rcFieldForm.Field, Object.assign({}, props, {
    messageVariables: variables,
    trigger: trigger,
    validateTrigger: mergedValidateTrigger,
    onMetaChange: onMetaChange
  }), (control, renderMeta, context) => {
    const mergedName = (0, _util.toArray)(name).length && renderMeta ? renderMeta.name : [];
    const fieldId = (0, _util.getFieldId)(mergedName, formName);
    const isRequired = required !== undefined ? required : !!(rules === null || rules === void 0 ? void 0 : rules.some(rule => {
      if (rule && typeof rule === 'object' && rule.required && !rule.warningOnly) {
        return true;
      }
      if (typeof rule === 'function') {
        const ruleEntity = rule(context);
        return (ruleEntity === null || ruleEntity === void 0 ? void 0 : ruleEntity.required) && !(ruleEntity === null || ruleEntity === void 0 ? void 0 : ruleEntity.warningOnly);
      }
      return false;
    }));
    // ======================= Children =======================
    const mergedControl = Object.assign({}, control);
    let childNode = null;
    process.env.NODE_ENV !== "production" ? warning(!(shouldUpdate && dependencies), 'usage', "`shouldUpdate` and `dependencies` shouldn't be used together. See https://u.ant.design/form-deps.") : void 0;
    if (Array.isArray(mergedChildren) && hasName) {
      process.env.NODE_ENV !== "production" ? warning(false, 'usage', 'A `Form.Item` with a `name` prop must have a single child element. For information on how to render more complex form items, see https://u.ant.design/complex-form-item.') : void 0;
      childNode = mergedChildren;
    } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {
      process.env.NODE_ENV !== "production" ? warning(!!(shouldUpdate || dependencies), 'usage', 'A `Form.Item` with a render function must have either `shouldUpdate` or `dependencies`.') : void 0;
      process.env.NODE_ENV !== "production" ? warning(!hasName, 'usage', 'A `Form.Item` with a render function cannot be a field, and thus cannot have a `name` prop.') : void 0;
    } else if (dependencies && !isRenderProps && !hasName) {
      process.env.NODE_ENV !== "production" ? warning(false, 'usage', 'Must set `name` or use a render function when `dependencies` is set.') : void 0;
    } else if (/*#__PURE__*/React.isValidElement(mergedChildren)) {
      process.env.NODE_ENV !== "production" ? warning(mergedChildren.props.defaultValue === undefined, 'usage', '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.') : void 0;
      const childProps = Object.assign(Object.assign({}, mergedChildren.props), mergedControl);
      if (!childProps.id) {
        childProps.id = fieldId;
      }
      if (help || mergedErrors.length > 0 || mergedWarnings.length > 0 || props.extra) {
        const describedbyArr = [];
        if (help || mergedErrors.length > 0) {
          describedbyArr.push(`${fieldId}_help`);
        }
        if (props.extra) {
          describedbyArr.push(`${fieldId}_extra`);
        }
        childProps['aria-describedby'] = describedbyArr.join(' ');
      }
      if (mergedErrors.length > 0) {
        childProps['aria-invalid'] = 'true';
      }
      if (isRequired) {
        childProps['aria-required'] = 'true';
      }
      if ((0, _ref2.supportRef)(mergedChildren)) {
        childProps.ref = getItemRef(mergedName, mergedChildren);
      }
      // We should keep user origin event handler
      const triggers = new Set([].concat((0, _toConsumableArray2.default)((0, _util.toArray)(trigger)), (0, _toConsumableArray2.default)((0, _util.toArray)(mergedValidateTrigger))));
      triggers.forEach(eventName => {
        childProps[eventName] = function () {
          var _a2, _c2;
          var _a, _b, _c;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          (_a = mergedControl[eventName]) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [mergedControl].concat(args));
          (_c = (_b = mergedChildren.props)[eventName]) === null || _c === void 0 ? void 0 : (_c2 = _c).call.apply(_c2, [_b].concat(args));
        };
      });
      // List of props that need to be watched for changes -> if changes are detected in MemoInput -> rerender
      const watchingChildProps = [childProps['aria-required'], childProps['aria-invalid'], childProps['aria-describedby']];
      childNode = /*#__PURE__*/React.createElement(MemoInput, {
        control: mergedControl,
        update: mergedChildren,
        childProps: watchingChildProps
      }, (0, _reactNode.cloneElement)(mergedChildren, childProps));
    } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
      childNode = mergedChildren(context);
    } else {
      process.env.NODE_ENV !== "production" ? warning(!mergedName.length || !!noStyle, 'usage', '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.') : void 0;
      childNode = mergedChildren;
    }
    return renderLayout(childNode, fieldId, isRequired);
  }));
}
const FormItem = InternalFormItem;
FormItem.useStatus = _useFormItemStatus.default;
var _default = exports.default = FormItem;