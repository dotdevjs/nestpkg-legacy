(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.ReactInversify = {}, global.React));
}(this, (function (exports, React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function ReactInversify(props) {
    return React.createElement("div", null, React.createElement("h1", null, "Welcome to react-inversify!"));
  }

  exports.ReactInversify = ReactInversify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
