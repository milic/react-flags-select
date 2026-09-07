"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _countries = _interopRequireDefault(require("./countries"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ReactFlagsSelect(props) {
  var _useState = (0, _react.useState)(false),
    openOptions = _useState[0],
    setOpenOptions = _useState[1];
  var _useState2 = (0, _react.useState)(),
    selected = _useState2[0],
    setSelected = _useState2[1];
  var _useState3 = (0, _react.useState)(_countries["default"][props.defaultCountry] && props.defaultCountry),
    defaultCountry = _useState3[0];
  var _useState4 = (0, _react.useState)([]),
    countriesList = _useState4[0],
    setCountriesList = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    filteredCountries = _useState5[0],
    setFilteredCountries = _useState5[1];
  var _useState6 = (0, _react.useState)(''),
    filter = _useState6[0],
    setFilter = _useState6[1];
  var selectedFlagRef = (0, _react.useRef)(null);
  var flagOptionsRef = (0, _react.useRef)(null);
  var filterTextRef = (0, _react.useRef)(null);
  var setCountries = (0, _react.useCallback)(function () {
    var fullCountries = Object.keys(_countries["default"]);
    var selectCountries = props.countries && props.countries.filter(function (country) {
      return _countries["default"][country];
    });
    if (props.blackList && selectCountries) {
      selectCountries = fullCountries.filter(function (countryKey) {
        return selectCountries.filter(function (country) {
          return countryKey === country;
        }).length === 0;
      });
    }
    setCountriesList(selectCountries || fullCountries);
  }, [props.countries, props.blackList]);
  (0, _react.useEffect)(function () {
    setCountries();
    if (!props.disabled) {
      window.addEventListener('click', closeOptions);
      return function () {
        return window.removeEventListener('click', closeOptions);
      };
    }
  }, [setCountries, props.disabled]);
  (0, _react.useEffect)(function () {
    if (selected && !countriesList.includes(selected)) {
      setSelected(null);
    }
  }, [countriesList, selected]);
  (0, _react.useEffect)(function () {
    setCountries();
  }, [props.countries, props.blackList, setCountries]);
  var toggleOptions = (0, _react.useCallback)(function () {
    if (!props.disabled) setOpenOptions(function (open) {
      return !open;
    });
  }, [props.disabled]);
  var toggleOptionsWithKeyboard = function toggleOptionsWithKeyboard(evt) {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      toggleOptions();
    } else if (evt.keyCode === 27) {
      if (!props.disabled) setOpenOptions(false);
    }
  };
  function closeOptions(event) {
    if (event.target !== selectedFlagRef.current && event.target !== flagOptionsRef.current && event.target !== filterTextRef.current) {
      setOpenOptions(false);
    }
  }
  var onSelect = function onSelect(countryCode) {
    setSelected(countryCode);
    setFilter('');
    props.onSelect && props.onSelect(countryCode);
  };
  var onSelectWithKeyboard = function onSelectWithKeyboard(evt, countryCode) {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      onSelect(countryCode);
      closeOptions(evt);
    } else if (evt.keyCode === 27) {
      toggleOptions();
    }
  };
  var updateSelected = function updateSelected(countryCode) {
    var isValid = _countries["default"][countryCode];
    if (isValid) setSelected(countryCode);
  };
  var filterSearch = function filterSearch(evt) {
    var filterValue = evt.target.value;
    var filtered = filterValue && countriesList.filter(function (key) {
      var label = props.customLabels[key] || _countries["default"][key];
      return label && label.match(new RegExp(filterValue, 'i'));
    });
    setFilter(filterValue);
    setFilteredCountries(filtered);
  };
  var isSelected = selected || defaultCountry;
  var selectedSize = props.selectedSize;
  var optionsSize = props.optionsSize;
  var alignClass = props.alignOptions.toLowerCase() === 'left' ? 'to--left' : '';
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flag-select " + (props.className ? props.className : '')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: selectedFlagRef,
    style: {
      fontSize: selectedSize + "px"
    },
    className: "selected--flag--option " + (props.disabled ? 'no--focus' : ''),
    tabIndex: "0",
    onClick: toggleOptions,
    onKeyUp: toggleOptionsWithKeyboard
  }, isSelected ? /*#__PURE__*/_react["default"].createElement("span", {
    className: "country-flag",
    style: {
      width: selectedSize + "px",
      height: selectedSize + "px"
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "/flags/" + isSelected.toLowerCase() + ".svg",
    alt: isSelected
  }), props.showSelectedLabel && /*#__PURE__*/_react["default"].createElement("span", {
    className: "country-label"
  }, props.customLabels[isSelected] || _countries["default"][isSelected])) : /*#__PURE__*/_react["default"].createElement("span", {
    className: "country-label"
  }, props.placeholder), /*#__PURE__*/_react["default"].createElement("span", {
    className: "arrow-down " + (props.disabled ? 'hidden' : '')
  }, "\u25BE")), openOptions && /*#__PURE__*/_react["default"].createElement("div", {
    ref: flagOptionsRef,
    style: {
      fontSize: optionsSize + "px"
    },
    className: "flag-options " + alignClass
  }, props.searchable && /*#__PURE__*/_react["default"].createElement("div", {
    className: "filterBox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    placeholder: props.searchPlaceholder,
    ref: filterTextRef,
    onChange: filterSearch
  })), (filter ? filteredCountries : countriesList).map(function (countryCode) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flag-option " + (props.showOptionLabel ? 'has-label' : ''),
      key: countryCode,
      tabIndex: "0",
      onClick: function onClick() {
        return onSelect(countryCode);
      },
      onKeyUp: function onKeyUp(evt) {
        return onSelectWithKeyboard(evt, countryCode);
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "country-flag",
      style: {
        width: optionsSize + "px",
        height: optionsSize + "px"
      }
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: "/flags/" + countryCode.toLowerCase() + ".svg",
      alt: "Country flag"
    }), props.showOptionLabel && /*#__PURE__*/_react["default"].createElement("span", {
      className: "country-label"
    }, props.customLabels[countryCode] || _countries["default"][countryCode])));
  })));
}
ReactFlagsSelect.defaultProps = {
  selectedSize: 16,
  optionsSize: 14,
  placeholder: 'Select a country',
  showSelectedLabel: true,
  showOptionLabel: true,
  alignOptions: 'right',
  customLabels: {},
  disabled: false,
  blackList: false,
  searchable: false,
  searchPlaceholder: 'Search'
};
ReactFlagsSelect.propTypes = process.env.NODE_ENV !== "production" ? {
  countries: _propTypes["default"].array,
  blackList: _propTypes["default"].bool,
  customLabels: _propTypes["default"].object,
  selectedSize: _propTypes["default"].number,
  optionsSize: _propTypes["default"].number,
  defaultCountry: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  className: _propTypes["default"].string,
  showSelectedLabel: _propTypes["default"].bool,
  showOptionLabel: _propTypes["default"].bool,
  alignOptions: _propTypes["default"].string,
  onSelect: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  searchable: _propTypes["default"].bool,
  searchPlaceholder: _propTypes["default"].string
} : {};
var _default = exports["default"] = ReactFlagsSelect;
module.exports = exports.default;