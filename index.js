
export function urlAddRandomVersion(url) {
  if (url.indexOf("randomVersion") > -1) {
    return url.replace(/randomVersion\=\d+/, `randomVersion=${Date.now()}`);
  }

  const reg = /(#[^/]+)|(#)$/;
  const version = `${url.indexOf("?") > -1 ? "&" : "?"}randomVersion=${Date.now()}`;

  if (reg.test(url)) {
    return url.replace(reg, anchor => {
      return version + anchor;
    });
  }

  return url + version;
}


export function getSort(fn) {
  return (a, b) => {
    let ret = 0;

    if (fn.call(null, a, b)) {
      ret = -1;
    } else if (fn.call(null, b, a)) {
      ret = 1;
    }

    return ret;
  };
}

/**
 * 多重排序
 */
export function getMultipleSort(arr) {
  return (a, b) => {
    let tmp;
    let i = 0;

    do {
      tmp = arr[i++](a, b);
    } while (tmp === 0 && i < arr.length);

    return tmp;
  };
}

export function getVal(target, path, defaultValue = undefined) {
  let ret = target;
  let key = "";
  const pathList = path.split(".");

  do {
    key = pathList.shift();
    if (ret && key !== undefined && typeof ret === "object" && key in ret) {
      ret = ret[key];
    } else {
      ret = undefined;
    }
  } while (pathList.length && ret !== undefined);

  return ret === undefined || ret === null ? defaultValue : ret;
}
