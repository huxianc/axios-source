/*
 * @Description: 
 * @Author: huxianc
 * @Date: 2021-01-11 16:14:04
 * @LastEditors: huxianc
 * @LastEditTime: 2021-01-15 16:58:26
 */
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later  返回值是 handlers.length - 1
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  // 将设置的拦截器 push 进 handlers 数组中
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  // 存在就置为 null 
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    // h 就是 utils.forEach 返回的 item 也就是 handlers 的 item 
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
