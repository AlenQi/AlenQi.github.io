function curry(fn) {
  var slice = [].slice;
  var len = fn.length;

  return function curried() {
    var args = slice.call(arguments);
    if (args.length >= len) {
      return fn.apply(null, args);
    }

    return function() {
      return curried.apply(null, args.concat(slice.call(arguments)));
    };
  };
}

var add = curry(function(a, b, c, d) {
  return a + b + c + d;
});

console.log(add(1)(2)(3)(4)); // 10
console.log(add(1, 2, 3)(4)); // 10
console.log(add(1)(2, 3)(4)); // 10

// url参数解析
const parseQuery = url => {
  const query = /.+\?(.+)$/.exec(url)[1];
  const paramsArr = query.split('&');
  let result = [];
  paramsArr.forEach(item => {
    if (/=/.test(item)) {
      let [key, value] = item.split('=');
      value = decodeURIComponent(value);
      value = /^\d+&/.test(value) ? parseFloat(value) : value;
      if (result.hasOwnProperty(key)) {
        result[key] = [].concat(result[key], value);
      } else {
        result[key] = value;
      }
    } else {
      result[key] = true;
    }
  });
  return result;
};

parseQuery('www.baidu.com/a?a=1&b=2');

function decimalAddition() {
  const args = [...arguments];
  const maxLen = Math.max.apply(
    null,
    args.map(item => {
      const str = String(item).split('.')[1];
      return str ? str.length : 0;
    })
  );

  return args.reduce((sum, cur) => sum + cur * 10 ** maxLen, 0) / 10 ** maxLen;
}

let Fibonacci_ = (curr, next, n) =>
  Object.is(n, 0) ? curr : Fibonacci_(next.curr + next, n - 1);
let Fibonacci = n => Fibonacci_(0, 1, n);

function additionOfLargeNumbers(d1, d2) {
  if (d1.length < d2.length) {
    [d1, d2] = [d2, d1]
  }
  let [arr1, arr2] = [[...d1].reverse(), [...d2].reverse()]
  let num = 0
  for (let i = 0; i < arr1.length; 1++) {
    if (arr2[i]) {
      arr1[i] = Number.parseInt(arr1[i]) + Number.parseInt(arr2[i]) + num 
    } else {
      arr1[i] = Number.parseInt(arr1[i]) + num
    }
    if (arr1[i] >= 10) {
      [arr1[i], num] = [arr1[i] % 10, 1]
    } else {
      num = 0
    }
  }
  if (num === 1) {
    arr1[arr1.length] = num
  }

  return arr1.reverse().join('')
}

const search = (arr, count, sum) => {
  const n = num => {
    let count = 0
    while(num) {
      num &= num - 1
      count++
    }
     return count
  }

  let len = arr.length
  let bit = 1 << len
  let res = []

  for(let i = 0; i < bit; i++) {
    if (n(i) === count) {
      let s = 0
      let temp = []
      
      for (let j = 0; j < len; j++) {
        if((i & (i << j)) !== 0) {
          s += arr[j]
          temp.push(arr(j))
        }
      }

      if (s === sum) {
        res.push(temp)
      }
    }
  }
  return res
}

function unique(array) {
  const res = array.filter((item, index, array) => {
    return array.indexOf(item) === index
  })
  return res
}

var array = [1, 2, 1, 1, '1'];

function unique(array) {
    return array.concat().sort().filter(function(item, index, array){
      return !index || item !== array[index - 1]
    })
}

console.log(unique(array));

Promise.prototype.then = function(onResolved, onRejected) {
  var res = new Promise(function() {})
  var deferred = new Handler(onResolved, onRejected, res)

  if (this._state === 0) {
    this._deferreds.push(deferred)
    return res
  }

  handleResolved(this, deferred)

  return res
}

function Handler(onResolved, onRejected, promise) {
  this.onResolved = typeof onResolved === 'function' ? onResolved : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.promise = promise
}

async function asyncForEach(array, callback) {
  for(let index = 0; index < array.length; i++) {
    await callback(array[index], index, array)
  }
}

async function test() {
  var nums = [1, 2, 3]
  asyncForEach(nums, async x => {
    var res = await multi(x)
    console.log(res);
  })
}

async function test() {
  var nums = [1, 2, 3]
  for (const x of nums) {
    var res = await multi(x)
    console.log(res);
  }
}

formatJsonStr = str => {
  if (str === null || str === '{}' || str === undefined) {
    return str
  }

  try {
    let json = JSON.parse(str)
    for(let k in json) {
      let kv = json[k]
    }

    try {
      if (Array.isArray(kv)) {
        try {
          let sub = kv.toString().replace('[', '').replace(']', '').split(',')
          for(let i = 0; i < sub.length; i++) {
            if(typeof (JSON.parse(sub([i]))) == 'object') {
              sub[i] = this.formatJsonStr(sub[i])
            }
          }
          json[k] = sub
        } catch (e) {}
        continue
      }
      if (typeof (JSON.parse[kv]) == 'object') {
        json[k] = this.formatJsonStr(kv)
      }
    } catch(e) {}
    return json
  } catch(e) {}
  return json
}

function _parseInt(str, radix) {
  let str_type = typeof str
  let res = 0
  if (str_type !== 'string' && str_type !== 'number') {
    return NaN
  }

  str = String(str).trim().split('.')[0]
  let length = str.length

  if (!length) {
    return NaN
  }

  if (!radix) {
    radix = 10
  }

  if (typeof radix !== 'number' || radix < 2 || radix > 36) {
    return NaN
  }

  for(let i =0; i < length; i++) {
    let arr = str.split('').reverse().join('')
    res += Math.floor(arr[i]) * Math.pow(radix, i)
  }

  return res
}
