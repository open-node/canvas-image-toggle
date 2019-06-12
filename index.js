(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Slider = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * config 结构
 * {
 *   width: 600, // 图片宽度
 *   height: 400, // 图片高度
 *   interval: 5 * 1000, // 切换完成后停留时长, 毫秒
 *   process: 5 * 1000, // 切换过程时长, 毫秒
 *   times: 20, // 切换过程次数，越大则切换效果越平滑，但是消耗的计算资源也越大，反之则越顿挫
 *   container: element, // 展示容器 dom 节点
 *   getImgSrc: function // 获取展示图片地址的函数
 * }
 */
var Slider = function Slider(_ref) {
  var width = _ref.width,
      height = _ref.height,
      times = _ref.times,
      interval = _ref.interval,
      process = _ref.process,
      container = _ref.container,
      getImgSrc = _ref.getImgSrc;

  if (!container || !container.appendChild) throw Error("\u6307\u5B9A\u5BB9\u5668\u4E0D\u5B58\u5728");
  width = Math.max(+width, 0) || 600;
  height = Math.max(+height, 0) || 400;
  times = Math.max(+times, 0) || 20;
  interval = Math.max(+interval, 0) || 5 * 1000;
  process = Math.max(+process, 0) || 5 * 1000;
  var dy = Math.ceil(height / times);
  container.innerHTML = "\n    <canvas class=\"slider-fg\" width=\"" + width + "\" height=\"" + height + "\"></canvas>\n    <canvas class=\"slider-bg\" width=\"" + width + "\" height=\"" + height + "\"></canvas>\n  ";

  var _container$getElement = container.getElementsByTagName("canvas"),
      _container$getElement2 = _slicedToArray(_container$getElement, 2),
      fgCanvas = _container$getElement2[0],
      bgCanvas = _container$getElement2[1];

  var fg = fgCanvas.getContext("2d");
  var bg = bgCanvas.getContext("2d");
  var _index = 0;

  // 执行过渡效果
  var slide = function slide(i) {
    if (times < i) return setTimeout(drawNextImage, interval);
    var y = dy * i;
    var imgData = bg.getImageData(0, height - y, width, dy);
    setTimeout(function () {
      fg.putImageData(imgData, 0, height - y);
      slide(i + 1);
    }, process / times);
  };

  // 加载绘制下一张图片
  var drawNextImage = function drawNextImage() {
    var img = new Image();
    img.onload = function () {
      bg.drawImage(img, 0, 0);
      slide(0, process);
    };
    img.src = getImgSrc(_index++);
  };

  // 初始化第一张图片
  var Init = function Init() {
    var img = new Image();
    img.onload = function () {
      fg.drawImage(img, 0, 0);
    };
    img.src = getImgSrc(_index++);

    setTimeout(drawNextImage, interval);
  };

  Init();
};

module.exports = Slider;
},{}]},{},[1])(1)
});
