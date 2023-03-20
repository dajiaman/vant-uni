const toString = Object.prototype.toString


/**
 * 判断值类型是否是所给类型
 * @param {*} val 校验的参数
 * @param {string} type 类型
 * @returns {Boolean} 返回true和false
 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef(val) {
  return val !== undefined && val !== null;
}

export function isString(val) {
  return is(val, 'String')
}

/**
 * 判断值是否为number类型
 * @param {*} val 校验的参数
 * @returns {Boolean} 返回true和false
 */
export function isNumber(val) {
  return is(val, 'Number')
}


/**
 * 字符串是否是数字
 * @param {Object} val
 */
export function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}


/**
 * 判断值是否为數組
 * @param {*} val 校验的参数
 * @returns {Boolean} 返回true和false
 */
export function isArray(val) {
  return val && Array.isArray(val)
}

export function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumeric(value) ? `${value}rpx` : value;
}

function kebabCase(word) {
  var newWord = word
    .replace(getRegExp("[A-Z]", 'g'), function(i) {
      return '-' + i;
    })
    .toLowerCase()

  return newWord;
}


export function style(styles) {
  if (isArray(styles)) {
    return styles
      .filter(function(item) {
        return item != null && item !== '';
      })
      .map(function(item) {
        return style(item);
      })
      .join(';');
  }

  if ('Object' === styles.constructor) {
    return object
      .keys(styles)
      .filter(function(key) {
        return styles[key] != null && styles[key] !== '';
      })
      .map(function(key) {
        return [kebabCase(key), [styles[key]]].join(':');
      })
      .join(';');
  }

  return styles;
}

function flattenVNodes(vnodes) {
  const result = [];

  function traverse(vnodes) {
    vnodes.forEach((vnode) => {
      result.push(vnode);

      if (vnode.componentInstance) {
        traverse(vnode.componentInstance.$children.map((item) => item.$vnode));
      }

      if (vnode.children) {
        traverse(vnode.children);
      }
    });
  }

  traverse(vnodes);
  return result;
}


// sort children instances by vnodes order
export function sortChildren(children, parent) {
  const {
    componentOptions
  } = parent.$vnode;
  if (!componentOptions || !componentOptions.children) {
    return;
  }

  const vnodes = flattenVNodes(componentOptions.children);
  children.sort((a, b) => vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode));
}
