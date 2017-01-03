;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.jBrowserTab = factory();
  }
}(this, function() {
var eventHandlerMap = {};

var util = {
  _hiddenKey: null,
  valueInArray: function (value, array) {
    var isIn = false;
    util.each(array, function (item, i) {
      if (item === value) {
        isIn = true;
        return false;
      }
    });
    return isIn;
  },

  each: function (array, callback) {
    for (var i = 0, len = array.length; i < len; i++) {
      var result = callback(array[i], i);
      if (result === false) {
        return;
      }
    }
  },

  notifyHandlers: function (isActive) {
    // call handlers
    var handlerArr = eventHandlerMap['visibilitychange'];
    if (handlerArr && handlerArr.length > 0) {
      util.each(handlerArr, function (callback, i) {
        (typeof callback === 'function') && callback.call(null, isActive);
      });
    }
  },

  _init: function () {
    var hiddenKey = 'hidden';
    // Statndards Mode
    if (hiddenKey in document) {
      document.addEventListener('visibilitychange', this._onVisibilityChange, false);
    } else if ((hiddenKey = 'mozHidden') in document) {
      document.addEventListener('mozvisibilitychange', this._onVisibilityChange, false);
    } else if ((hiddenKey = 'webkitHidden') in document) {
      document.addEventListener('webkitvisibilitychange', this._onVisibilityChange, false);
    } else if ((hiddenKey = 'msHidden') in document) {
      document.addEventListener('msvisibilitychange', this._onVisibilityChange, false);
    }
    else if ('onfocusin' in document) {// IE 9 and lower:
      hiddenKey = 'focusinout';
      document.onfocusin = document.onfocusout = this._onVisibilityChange;
    }
    else {// All others:
      this.hiddenKey = 'other';
      window.onpageshow = window.onpagehide = window.onfocus = window.onblur = this._onVisibilityChange;
    }
    this._hiddenKey = hiddenKey;
  },

  _onVisibilityChange: function (evt) {
    evt = evt || window.event;
    var isActive = false;
    if (util.valueInArray(util._hiddenKey, ['hidden', 'mozHidden', 'webkitHidden', 'msHidden'])) {
      isActive = !document[util._hiddenKey];
    } else if (util._hiddenKey === 'focusinout') {
      isActive = evt.type === 'focusin'; // focusin means enter the page.
    } else {
      isActive = util.valueInArray(evt.type, ['onpageshow', 'onfocus']);
    }
    util.notifyHandlers(isActive);
  }
};

var jBrowserTab = {
  on: function (eventName, eventHandler) {
    if (!eventHandlerMap[eventName]) {
      eventHandlerMap[eventName] = [];
    }
    eventHandlerMap[eventName].push(eventHandler);
  },

  off: function (eventName, eventHandler) {
    if (!eventHandlerMap[eventName]) {
      return;
    }
    // Clear all event handlers.
    if (eventHandler === undefined) {
      eventHandlerMap[eventName].length = 0;
    } else { // Clear the special handler
      for (var i = eventHandlerMap[eventName].length - 1; i >= 0; i--) {
        if (eventHandlerMap[eventName][i] === eventHandler) {
          eventHandlerMap[eventName].splice(i, 1);
        }
      }
    }
  }
};

util._init();
return jBrowserTab;
}));
