export function ajax(url, options) {
  return fetch(`//api.${process.env.DOMAIN}${url}`, options)
    .then(response => response.json());
}
