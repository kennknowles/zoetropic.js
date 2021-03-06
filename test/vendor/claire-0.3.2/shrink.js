define(function (require, exports, module) {(function(){
  var ref$, Generator, asGenerator, t, round, toChar, isUpper, isLower, isDigit, isSpace, Nothing, transform, shrinkable, Num, Int, Bool, Char, List, exhaust;
  ref$ = require('./generating'), Generator = ref$.Generator, asGenerator = ref$.asGenerator, t = ref$.transform;
  round = Math.round;
  toChar = String.fromCharCode;
  isUpper = function(a){
    return /[A-Z]/.test(a);
  };
  isLower = function(a){
    return /[a-z]/.test(a);
  };
  isDigit = function(a){
    return /[0-9]/.test(a);
  };
  isSpace = function(a){
    return /\s/.test(a);
  };
  Nothing = {};
  transform = curry$(function(f, gen){
    return t(function(it){
      switch (false) {
      case it !== Nothing:
        return Nothing;
      default:
        return f(it);
      }
    })(
    gen);
  });
  shrinkable = function(xs){
    return asGenerator(function(){
      switch (false) {
      case !xs.length:
        return xs.pop();
      default:
        return Nothing;
      }
    });
  };
  Num = function(a){
    return asGenerator(function(){
      switch (false) {
      case round(a) !== 0:
        return Nothing;
      default:
        return a = a / 2;
      }
    });
  };
  Int = function(a){
    return transform(round, Num(a));
  };
  Bool = function(a){
    return shrinkable([true, false].filter((function(it){
      return it !== a;
    })));
  };
  Char = function(a){
    var lowers, uppers, digits, spaces;
    lowers = ['a', 'b', 'c'].filter(function(){
      return isLower(a);
    });
    if (isUpper(a)) {
      lowers.push(a.toLowerCase());
    }
    uppers = ['A', 'B', 'C'].filter(function(){
      return isUpper(a);
    });
    digits = ['1', '2', '3'].filter(function(){
      return isDigit(a);
    });
    spaces = [' ', '\n'].filter(function(){
      return isSpace(a);
    });
    return shrinkable(lowers.concat(uppers, digits, spaces));
  };
  List = function(a){
    throw Error('unimplemented');
  };
  exhaust = function(x){
    var r, a;
    r = [];
    while ((a = x.next().value) !== Nothing) {
      r.push(a);
    }
    return r;
  };
  module.exports = {
    Nothing: Nothing,
    Num: Num,
    Int: Int,
    Bool: Bool,
    Char: Char,
    exhaust: exhaust
  };
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
