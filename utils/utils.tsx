export function makeHostUrl(headers: Headers) {
  const protocol = headers.get("x-url")?.split("://")[0];

  let host = headers.get("host");

  if (host?.includes("localhost")) {
    host = host?.replace(/localhost/g, "127.0.0.1");
  }
  const hostUrl = protocol + "://" + host;

  return hostUrl;
}
export function getQueryParams<T>(query: string): T {
  const params = query.split("?")[1].split("&");
  let obj: T = {} as T;
  for (let i = 0; i < params.length; i++) {
    // console.log("tagCon", params[i]);

    const [key, value] = params[i].split("=");

    // console.log("key : ", key, "value : ", value);

    // @ts-ignore
    // obj[key] = value;
    obj[key] =
      key === "conditions"
        ? JSON.parse(decodeURIComponent(value).replaceAll("+", " "))
        : value;
  }
  return obj;
}

export function makeUrlQuery(params: any) {
  const keys = Object.keys(params);
  let url = "";
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = params[keys[i]];

    url += key;
    url += "=";
    if (Array.isArray(value)) {
      url += JSON.stringify(value);
    } else {
      url += value;
    }
    if (keys.length - 1 !== i) {
      url += "&";
    }
  }
  return url;
}

export function hasNonNumericCharacters(value: string): boolean {
  // 입력값이 숫자가 아닌 다른 글자를 포함하고 있는지 확인합니다.
  // 정규 표현식을 사용하여 숫자가 아닌 문자가 있는지 검사합니다.
  const numericRegex = /^-?[0-9]+(\.[0-9]+)?$/;
  return numericRegex.test(value);
}
