'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * react-org-chart
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2018 Caprica Software Limited.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var dataAttributes = function dataAttributes(props) {
    return Object.keys(props).reduce(function (res, name) {
        if (name.startsWith('data-')) {
            res[name] = props[name];
        }
        return res;
    }, {});
};

var OrgChart = function (_Component) {
    _inherits(OrgChart, _Component);

    function OrgChart(props) {
        _classCallCheck(this, OrgChart);

        return _possibleConstructorReturn(this, (OrgChart.__proto__ || Object.getPrototypeOf(OrgChart)).call(this, props));
    }

    _createClass(OrgChart, [{
        key: 'render',
        value: function render() {
            var settings = {
                depth: this.props.depth || this.props.depth === 0 ? this.props.depth : -1,
                stack: this.props.stack,
                onClick: this.props.onClick
            };
            var classes = 'orgChart';
            if (this.props.className) {
                classes += ' ' + this.props.className;
            }
            return _react2.default.createElement(
                'div',
                { className: classes },
                this.props.depth !== 0 && _react2.default.Children.map(this.props.children, function (child) {
                    return _react2.default.cloneElement(child, { ...settings });
                })
            );
        }
    }]);

    return OrgChart;
}(_react.Component);

var Node = function (_Component2) {
    _inherits(Node, _Component2);

    function Node(props) {
        _classCallCheck(this, Node);

        return _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, props));
    }

    _createClass(Node, [{
        key: 'onNodeClick',
        value: function onNodeClick(e) {
            if (this.props.onClick) {
                this.props.onClick(e, e.currentTarget.dataset);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var allChildren = _react2.default.Children.toArray(this.props.children);
            var childNodes = allChildren.filter(function (child) {
                return child.type && child.type.name === Node.TAG;
            });
            var adjunct = allChildren.filter(function (child) {
                return child.type && child.type.name === Adjunct.TAG;
            }).find(function () {
                return true;
            });
            var content = allChildren.filter(function (child) {
                return !child.type || child.type.name !== Node.TAG && child.type.name !== Adjunct.TAG;
            });
            var childCount = childNodes.length;
            var hasChildren = childCount > 0;
            var level = this.props.level || 0;
            var index = this.props.index || 0;
            var stack = this.props.stack;
            var depth = this.props.depth;
            var stacking = !(depth === -1 || level + 1 < depth);
            var nodeClassName = 'node' + (this.props.className ? ' ' + this.props.className : '');
            var label = this.props.label;

            return _react2.default.createElement(
                'table',
                { cellPadding: 0, cellSpacing: 0, border: 0 },
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        { className: 'nodes' },
                        _react2.default.createElement(
                            'td',
                            { className: 'node', colSpan: childCount > 1 ? childCount * 2 : 2 },
                            adjunct && _react2.default.cloneElement(adjunct, { level: level, index: index, onClick: this.props.onClick }),
                            _react2.default.createElement(
                                'div',
                                _extends({ className: nodeClassName + ' level' + level + ' node' + index + ' ' + (hasChildren ? 'hasChildren' : '') }, dataAttributes(this.props), { onClick: this.onNodeClick.bind(this) }),
                                label && _react2.default.createElement(
                                    'h2',
                                    null,
                                    this.props.label
                                ),
                                content
                            ),
                            stack && stacking && hasChildren && _react2.default.createElement(
                                'div',
                                { className: 'stack-container' },
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'stack level' + (level + 1) + ' node' + index },
                                    childNodes.map(function (child, idx) {
                                        return _react2.default.createElement(
                                            'li',
                                            _extends({ key: idx, className: nodeClassName + ' level' + (level + 1) + ' node' + idx }, dataAttributes(child.props), { onClick: _this3.onNodeClick.bind(_this3) }),
                                            child.props.label
                                        );
                                    })
                                )
                            )
                        )
                    ),
                    hasChildren && !stacking && _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement(
                            'tr',
                            { className: 'lines' },
                            _react2.default.createElement(
                                'td',
                                { colSpan: childCount * 2 },
                                _react2.default.createElement(
                                    'table',
                                    { cellPadding: 0, cellSpacing: 0, border: 0 },
                                    _react2.default.createElement(
                                        'tbody',
                                        null,
                                        _react2.default.createElement(
                                            'tr',
                                            { className: 'lines x' },
                                            _react2.default.createElement('td', { className: 'line left' }),
                                            _react2.default.createElement('td', { className: 'line right' })
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tr',
                            { className: 'lines v' },
                            childNodes.map(function (child, idx) {
                                return _react2.default.createElement(
                                    _react.Fragment,
                                    { key: idx },
                                    _react2.default.createElement('td', { className: 'line left ' + (idx > 0 ? 'top' : '') }),
                                    _react2.default.createElement('td', { className: 'line right ' + (idx < childCount - 1 ? 'top' : '') })
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'tr',
                            null,
                            childNodes.map(function (child, idx) {
                                return _react2.default.createElement(
                                    'td',
                                    { key: idx, colSpan: 2 },
                                    _react2.default.cloneElement(child, { level: level + 1, index: idx, depth: depth, stack: stack, onClick: _this3.props.onClick })
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Node;
}(_react.Component);

Node.TAG = 'Node';

var Adjunct = function (_Component3) {
    _inherits(Adjunct, _Component3);

    function Adjunct(props) {
        _classCallCheck(this, Adjunct);

        return _possibleConstructorReturn(this, (Adjunct.__proto__ || Object.getPrototypeOf(Adjunct)).call(this, props));
    }

    _createClass(Adjunct, [{
        key: 'onNodeClick',
        value: function onNodeClick(e) {
            if (this.props.onClick) {
                this.props.onClick(e, e.currentTarget.dataset);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                index = _props.index,
                label = _props.label,
                level = _props.level;

            var data = dataAttributes(this.props);
            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    _extends({ className: 'adjunct node level' + level + ' node' + index }, data, { onClick: this.onNodeClick.bind(this) }),
                    label && _react2.default.createElement(
                        'h2',
                        null,
                        label
                    ),
                    children
                ),
                _react2.default.createElement('div', { className: 'adjunct-link' })
            );
        }
    }]);

    return Adjunct;
}(_react.Component);

Adjunct.TAG = 'Adjunct';

OrgChart.Node = Node;
OrgChart.Adjunct = Adjunct;

exports.default = OrgChart;