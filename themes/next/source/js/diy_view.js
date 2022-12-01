async function main() {
  var viewText = document.getElementById('views_text')
  var pathname = location.pathname;
  var uvId = localStorage.getItem('uvId');
  var type = 'PV';
  if (!uvId) {
    uvId = randomId()
    localStorage.setItem('uvId', uvId)
    type = 'UV'
  }

  // 保存该次浏览记录
  var xhrHistory = new XMLHttpRequest();
  xhrHistory.open("GET", `https://middle-platform.vercel.app/api/blog/history?uvId=${uvId}&path=${pathname}&type=${type}`, true);
  xhrHistory.send(null)

  // 获取历史记录pv
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `https://middle-platform.vercel.app/api/blog/getPageHistory?path=${pathname}`, true);
  xhr.onreadystatechange = function () {
    // 监听xhr对象的请求状态 与服务器的响应状态
    if (this.readyState == 4 && this.status == 200) {
      let responseData = JSON.parse(this.responseText || "{}");
      if (viewText) {
        viewText.innerHTML = responseData.data.pv || 0;
      }
    }
  }
  xhr.send(null)
}

/**
 * 随机数
 * @returns
 */
function randomId() {
  return parseInt(Math.random() * new Date().valueOf() + Math.random() * new Date().valueOf()).toString()
}

main()
