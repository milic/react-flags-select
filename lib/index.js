"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _countries = _interopRequireDefault(require("./countries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ReactFlagsSelect = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ReactFlagsSelect, _Component);

  function ReactFlagsSelect(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    var defaultCountry = _countries["default"][_this.props.defaultCountry] && _this.props.defaultCountry;
    _this.state = {
      openOptions: false,
      defaultCountry: defaultCountry,
      filteredCountries: []
    };
    _this.toggleOptions = _this.toggleOptions.bind(_assertThisInitialized(_this));
    _this.closeOptions = _this.closeOptions.bind(_assertThisInitialized(_this));
    _this.onSelect = _this.onSelect.bind(_assertThisInitialized(_this));
    _this.filterSearch = _this.filterSearch.bind(_assertThisInitialized(_this));
    _this.setCountries = _this.setCountries.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ReactFlagsSelect.prototype;

  _proto.toggleOptions = function toggleOptions() {
    !this.state.disabled && this.setState({
      openOptions: !this.state.openOptions
    });
  };

  _proto.toggleOptionsWithKeyboard = function toggleOptionsWithKeyboard(evt) {
    evt.preventDefault();

    if (evt.keyCode === 13) {
      //enter key: toggle options
      this.toggleOptions();
    } else if (evt.keyCode === 27) {
      //esc key: hide options
      !this.state.disabled && this.setState({
        openOptions: false
      });
    }
  };

  _proto.closeOptions = function closeOptions(event) {
    if (event.target !== this.refs.selectedFlag && event.target !== this.refs.flagOptions && event.target !== this.refs.filterText) {
      this.setState({
        openOptions: false
      });
    }
  };

  _proto.onSelect = function onSelect(countryCode) {
    this.setState({
      selected: countryCode,
      filter: ''
    });
    this.props.onSelect && this.props.onSelect(countryCode);
  };

  _proto.onSelectWithKeyboard = function onSelectWithKeyboard(evt, countryCode) {
    evt.preventDefault();

    if (evt.keyCode === 13) {
      //enter key: select
      this.onSelect(countryCode);
      this.closeOptions(evt);
    } else if (evt.keyCode === 27) {
      //esc key: hide options
      this.toggleOptions();
    }
  };

  _proto.updateSelected = function updateSelected(countryCode) {
    var isValid = _countries["default"][countryCode];
    isValid && this.setState({
      selected: countryCode
    });
  };

  _proto.filterSearch = function filterSearch(evt) {
    var _this2 = this;

    var filterValue = evt.target.value;
    var filteredCountries = filterValue && this.state.countries.filter(function (key) {
      var label = _this2.props.customLabels[key] || _countries["default"][key];
      return label && label.match(new RegExp(filterValue, 'i'));
    });
    this.setState({
      filter: filterValue,
      filteredCountries: filteredCountries
    });
  };

  _proto.setCountries = function setCountries() {
    var _this3 = this;

    var fullCountries = Object.keys(_countries["default"]);
    var selectCountries = this.props.countries && this.props.countries.filter(function (country) {
      return _countries["default"][country];
    }); //Filter BlackList

    if (this.props.blackList && selectCountries) {
      selectCountries = fullCountries.filter(function (countryKey) {
        return selectCountries.filter(function (country) {
          return countryKey === country;
        }).length === 0;
      });
    }

    this.setState({
      countries: selectCountries || fullCountries
    }, function () {
      var selected = _this3.state.selected;

      if (selected && !_this3.state.countries.includes(selected)) {
        _this3.setState({
          selected: null
        });
      }
    });
  };

  _proto.componentDidMount = function componentDidMount() {
    this.setCountries();
    !this.props.disabled && window.addEventListener("click", this.closeOptions);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.countries !== this.props.countries || prevProps.blackList !== this.props.blackList) {
      this.setCountries();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    !this.props.disabled && window.removeEventListener("click", this.closeOptions);
  };

  _proto.render = function render() {
    var _this4 = this;

    var isSelected = this.state.selected || this.state.defaultCountry;
    var selectedSize = this.props.selectedSize;
    var optionsSize = this.props.optionsSize;
    var alignClass = this.props.alignOptions.toLowerCase() === 'left' ? 'to--left' : '';
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flag-select " + (this.props.className ? this.props.className : "")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      ref: "selectedFlag",
      style: {
        fontSize: selectedSize + "px"
      },
      className: "selected--flag--option " + (this.props.disabled ? 'no--focus' : ''),
      tabIndex: "0",
      onClick: this.toggleOptions,
      onKeyUp: function onKeyUp(evt) {
        return _this4.toggleOptionsWithKeyboard(evt);
      }
    }, isSelected && /*#__PURE__*/_react["default"].createElement("span", {
      className: "country-flag",
      style: {
        width: selectedSize + "px",
        height: selectedSize + "px"
      }
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: require("../flags/" + isSelected.toLowerCase() + ".svg"),
      alt: isSelected
    }), this.props.showSelectedLabel && /*#__PURE__*/_react["default"].createElement("span", {
      className: "country-label"
    }, this.props.customLabels[isSelected] || _countries["default"][isSelected])), !isSelected && /*#__PURE__*/_react["default"].createElement("span", {
      className: "country-label"
    }, this.props.placeholder), /*#__PURE__*/_react["default"].createElement("span", {
      className: "arrow-down " + (this.props.disabled ? 'hidden' : '')
    }, "\u25BE")), this.state.openOptions && /*#__PURE__*/_react["default"].createElement("div", {
      ref: "flagOptions",
      style: {
        fontSize: optionsSize + "px"
      },
      className: "flag-options " + alignClass
    }, this.props.searchable && /*#__PURE__*/_react["default"].createElement("div", {
      className: "filterBox"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      placeholder: this.props.searchPlaceholder,
      ref: "filterText",
      onChange: this.filterSearch
    })), (this.state.filter ? this.state.filteredCountries : this.state.countries).map(function (countryCode) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "flag-option " + (_this4.props.showOptionLabel ? 'has-label' : ''),
        key: countryCode,
        tabIndex: "0",
        onClick: function onClick() {
          return _this4.onSelect(countryCode);
        },
        onKeyUp: function onKeyUp(evt) {
          return _this4.onSelectWithKeyboard(evt, countryCode);
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "country-flag",
        style: {
          width: optionsSize + "px",
          height: optionsSize + "px"
        }
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: require("../flags/" + countryCode.toLowerCase() + ".svg")
      }), _this4.props.showOptionLabel && /*#__PURE__*/_react["default"].createElement("span", {
        className: "country-label"
      }, _this4.props.customLabels[countryCode] || _countries["default"][countryCode])));
    })));
  };

  return ReactFlagsSelect;
}(_react.Component);

ReactFlagsSelect.defaultProps = {
  selectedSize: 16,
  optionsSize: 14,
  placeholder: "Select a country",
  showSelectedLabel: true,
  showOptionLabel: true,
  alignOptions: "right",
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
var _default = ReactFlagsSelect;
exports["default"] = _default;
module.exports = exports.default;