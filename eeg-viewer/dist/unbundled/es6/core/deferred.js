function deferred(constructor) {
  var res = void 0,
      rej = void 0;

  var promise = new Promise(function (resolve, reject) {
    if (constructor) {
      constructor(resolve, reject);
    }

    res = resolve;
    rej = reject;
  });

  promise.resolve = function (a) {
    res(a);
    return promise;
  };

  promise.reject = function (a) {
    rej(a);
    return promise;
  };

  return promise;
}

export default deferred;
//# sourceMappingURL=core/deferred.js.map
