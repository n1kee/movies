
import history from "./history";

export default function http(path, params, method, headers) {
    method = method || "GET";
    params = (params || {});

    const isGetReq = method.match(/get/i);

    if (isGetReq) path += "?" + new URLSearchParams(params);
    params._token = document.querySelector('[name="_token"]').value;
    return fetch(
        `/api${path}`,
        {
            method: method,
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...headers,
            },
            body: isGetReq ? null : JSON.stringify(params),
        },
    ).then(res => {
        if (res.redirected) {
            history.push(new URL(res.url).pathname);
        } else if (res.status !== 200) {
            switch (res.status) {
                case 401:
                case 419:
                    setTimeout(() => history.push('/login'), 0);
                    break;
                default:
                    if (!res.ok) return alert(res.statusText);
            }
        }
        const isJson = res.headers.get("content-type")
            ?.match("application/json");
        return new Promise(next => {
            const cb = data => next({ data, response: res, });
            (isJson ? res.json() : res.text()).then(cb);
        });
    })
    .catch(error => alert(error));
}
