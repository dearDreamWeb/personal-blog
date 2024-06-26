// const DOMAIN = 'http://localhost:8432/v1/blog'
const DOMAIN = 'https://hangpiao.blogwxb.cn/goMiddlePlatform/v1/blog'
async function main() {
  changeHistory()
  pageHistory()
  window.removeEventListener('pushState', pageHistory)
  window.addEventListener('pushState', pageHistory);
}

/**
 * 随机ID
 * @returns
 */
function createHash(hashLength = 24) {
  if (!hashLength || typeof (Number(hashLength)) != 'number') { return; }
  var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  var hs = [];
  var hl = Number(hashLength);
  var al = ar.length;
  for (var i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)]);
  }

  return hs.join('');
}

/**
 * 生成浏览器指纹
 */
async function getBrowserFingerprinting() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const txt = "BrowserLeaks,com <canvas> 1.0";
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText(txt, 4, 17);

  // 要加密的字符串
  const str = canvas.toDataURL();

  // 将字符串转换为 ArrayBuffer
  const encoder = new TextEncoder();
  const encodedStr = encoder.encode(str);

  // 使用 Web Crypto API 进行 SHA-256 加密
  const crypto = window.crypto.subtle;
  const hashArrayBuffer = await crypto.digest("SHA-256", encodedStr);
  // 将 ArrayBuffer 转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashArrayBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
  return hashHex
}


/**
 * 监听url变化
 */
function changeHistory() {
  const _historyWrap = function (type) {
    const orig = history[type];
    const e = new Event(type);
    return function () {
      const rv = orig.apply(this, arguments);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return rv;
    };
  };
  history.pushState = _historyWrap('pushState');
  history.replaceState = _historyWrap('replaceState');
}

// 保存并获取该页面的历史记录pv
async function pageHistory() {
  var uvId = localStorage.getItem('uvId');
  var pathname = location.pathname;
  var type = 'PV';
  if (!uvId) {
    uvId = await getBrowserFingerprinting()
    localStorage.setItem('uvId', uvId)
    type = 'UV'
  }
  // 保存该次浏览记录
  var xhrHistory = new XMLHttpRequest();
  xhrHistory.open("GET", `${DOMAIN}/history?uvId=${uvId}&path=${pathname}&type=${type}`, true);
  xhrHistory.send(null)

  var uvViews = document.getElementById('uv-views')
  var pvViews = document.getElementById('pv-views')

  // 获取历史记录pv uv
  if (uvViews && pvViews) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `${DOMAIN}/getPageHistory`, true);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let responseData = JSON.parse(this.responseText || "{}");
        if (uvViews) {
          uvViews.innerHTML = responseData.data.uv || 0;
        }
        if (pvViews) {
          pvViews.innerHTML = responseData.data.pv || 0;
        }
      }
    }
    xhr.send(null)
  }


  var viewText = document.getElementById('views_text')
  if (viewText && pathname !== '/') {
    var xhrPage = new XMLHttpRequest();
    xhrPage.open("GET", `${DOMAIN}/getPageHistory?path=${pathname}`, true);
    xhrPage.onreadystatechange = function () {
      // 监听xhr对象的请求状态 与服务器的响应状态
      if (this.readyState == 4 && this.status == 200) {
        let responseData = JSON.parse(this.responseText || "{}");
        viewText.innerHTML = responseData.data.pv || 0;

      }
    }
    xhrPage.send(null)
  }
}

main()
