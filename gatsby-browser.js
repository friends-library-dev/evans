import './src/css/fontawesome.css';
import './src/css/tailwind.css';
import './src/css/cover.css';

export function onClientEntry() {
  function addScript(src) {
    const script = document.createElement(`script`);
    script.setAttribute(`defer`, ``);
    script.src = src;
    document.body.appendChild(script);
  }

  try {
    const JSCDN = `https://cdn.jsdelivr.net/npm`;

    // add smoothscroll support for Safari et al
    if (!(`scrollBehavior` in document.documentElement.style)) {
      addScript(`${JSCDN}/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js`);
    }

    // add fetch
    if (!(`fetch` in window)) {
      addScript(`${JSCDN}/whatwg-fetch@3.2.0/dist/fetch.umd.min.js`);
    }

    // polyfill document.querySelectorAll().forEach support
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }

    // catch uncaught errors
    if (process.env.NODE_ENV !== `development`) {
      window.onerror = (event, source, lineno, colno, err) => {
        window.fetch(`/.netlify/functions/site/log-error`, {
          method: `POST`,
          headers: {
            'Content-Type': `application/json`,
          },
          body: JSON.stringify({
            error: err,
            event: event,
            source: source,
            lineno: lineno,
            colno: colno,
            location: `window.onerror`,
            url: window.location.href,
            userAgent: navigator.userAgent,
          }),
        });
      };
    }
  } catch (e) {
    // ¯\_(ツ)_/¯
  }
}
