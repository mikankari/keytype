(function() {
  var count, finish, getRomanKeys, getTypedKeys, indexes, init, input, keyPressed, keys, next, output, timer;

  input = null;

  output = null;

  indexes = null;

  keys = null;

  timer = null;

  count = 0;

  init = function() {
    input = document.querySelector("input");
    input.addEventListener("keyup", keyPressed, false);
    output = document.querySelector("#output");
    indexes = Object.keys(words);
    indexes.sort(function() {
      return Math.random() - 0.5;
    });
    timer = new Date().getTime();
    count = 0;
    next();
  };

  next = function() {
    var keys_text, ruby, value, word;
    input.value = "";
    word = indexes.pop();
    if (word == null) {
      finish();
      return;
    }
    ruby = words[word];
    keys = getRomanKeys(ruby);
    keys_text = ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        value = keys[_i];
        _results.push(value[0]);
      }
      return _results;
    })()).join("");
    output.innerHTML = "" + word + "<br>" + ruby + "<br>" + keys_text + "<br>";
  };

  finish = function() {
    timer = new Date().getTime() - timer;
    return output.innerHTML = "" + count + "chars / " + (timer / 1000) + "s = " + (count / (timer / 1000)) + "chars/s<br>";
  };

  keyPressed = function(event) {
    var iscorrect, types;
    types = event.target.value;
    types = getTypedKeys(types);
    console.log("" + (keys.join(" | ")) + " == " + (types.join(" | ")));
    iscorrect = keys.every(function(value, index) {
      return value.indexOf(types[index]) !== -1;
    });
    if (iscorrect) {
      count += types.length;
      return next();
    }
  };

  getRomanKeys = function(word) {
    var char, char_length, fix, index, isxtu, list, map, xtu, _, _i, _j, _len;
    list = [];
    for (index = _i = 0, _len = word.length; _i < _len; index = ++_i) {
      _ = word[index];
      for (char_length = _j = 2; _j >= 1; char_length = --_j) {
        char = word.substring(index, index + char_length);
        map = keymap[char];
        if (map != null) {
          map = map.slice(0);
          if (isxtu) {
            xtu = list.pop();
            xtu = ((function() {
              var _k, _len1, _results;
              _results = [];
              for (_k = 0, _len1 = map.length; _k < _len1; _k++) {
                fix = map[_k];
                _results.push(fix.charAt(0));
              }
              return _results;
            })()).concat(xtu);
            list.push(xtu);
          }
          list.push(map);
          switch (char_length) {
            case 2:
              _i++;
              break;
            case 1:
              isxtu = char === "っ";
          }
          break;
        }
      }
    }
    return list;
  };

  getTypedKeys = function(roman) {
    var char, char_length, index, isxtu, list, _, _i, _j, _len;
    list = [];
    for (index = _i = 0, _len = roman.length; _i < _len; index = ++_i) {
      _ = roman[index];
      for (char_length = _j = 3; _j >= 1; char_length = --_j) {
        char = roman.substring(index, index + char_length);
        if (char.match(/^[kstnhmyrwygzdbplxcqfjv]*[aiueo]$/)) {
          if (!(isxtu = char.charAt(0) === char.charAt(1))) {
            list.push(char);
            switch (char_length) {
              case 3:
                _i += 2;
                break;
              case 2:
                _i++;
            }
            break;
          }
        }
        if (char.match(/^(-|n|nn)$/)) {
          list.push(char);
          switch (char_length) {
            case 2:
              _i++;
          }
          break;
        }
        if (char_length === 1 && isxtu) {
          list.push(char);
        }
      }
    }
    return list;
  };

  window.addEventListener("load", init, false);

  window.getTypedKeys = getTypedKeys;

}).call(this);
