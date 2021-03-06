define(function (require, exports, module) {(function(){
  var makeFrom, make, raise;
  makeFrom = curry$(function(type, name, message){
    var options, ref$;
    options = arguments[3] || {};
    return import$((ref$ = type.call(clone$(type.prototype), message), ref$.name = name, ref$), options);
  });
  make = curry$(function(name, message){
    return makeFrom(Error, name, message, arguments[2]);
  });
  raise = function(error){
    throw error;
  };
  module.exports = (make.from = makeFrom, make.raise = raise, make.make = make, make);
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function clone$(it){
    function fun(){} fun.prototype = it;
    return new fun;
  }
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);

});
