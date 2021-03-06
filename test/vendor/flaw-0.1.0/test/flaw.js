define(function (require, exports, module) {(function(){
  var ref$, forAll, asGenerator, choice, ref1$, Id, Str, Map, expect, make, from, raise, allErrors, Errors, keys, u;
  import$(global, require('claire-mocha'));
  ref$ = require('claire'), forAll = ref$.forAll, asGenerator = ref$.asGenerator, choice = ref$.choice, ref1$ = ref$.data, Id = ref1$.Id, Str = ref1$.Str, Map = ref1$.Map;
  expect = require('chai').expect;
  ref$ = require('../'), make = ref$.make, from = ref$.from, raise = ref$.raise;
  allErrors = [Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError];
  Errors = choice.apply(null, allErrors.map(function(x){
    return function(){
      return x;
    };
  }));
  keys = Object.keys;
  u = it;
  describe('{} Flaw', function(){
    describe('λ make-from', function(){
      u('Should be an instance of the given error type.', function(){
        return allErrors.map(function(it){
          return expect(from(it, '', '')).instanceOf(it);
        });
      });
      o('Should have the message it\'s given.', function(){
        return forAll(Errors, Id, Str).satisfy(function(e, n, m){
          return from(e, n, m).message === m;
        });
      });
      o('Should have the name it\'s given.', function(){
        return forAll(Errors, Id, Str).satisfy(function(e, n, m){
          return from(e, n, m).name === n;
        });
      });
      o('Should have a proper stack trace.', function(){
        return forAll(Errors, Id, Str).satisfy(function(e, n, m){
          return from(e, n, m).stack !== void 8;
        });
      });
      return o('Should have the options it\'s given.', function(){
        return forAll(Errors, Id, Str, Map(Str)).given(function(e, n, m, o){
          return keys(o).length > 0;
        }).satisfy(function(e, n, m, o){
          return expect(from(e, n, m, o)).to.include.keys(keys(o));
        });
      });
    });
    describe('λ make', function(){
      return u('Should be an instance of Error.', function(){
        return expect(make('', '')).instanceOf(Error);
      });
    });
    return describe('λ raise', function(){
      return o('Should throw the error.', function(){
        return forAll(Errors).satisfy(function(e, n, m, o){
          var x;
          e = from(e, n, m, o);
          try {
            raise(e);
            return false;
          } catch (e$) {
            x = e$;
            return x === e;
          }
        });
      });
    });
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

});
