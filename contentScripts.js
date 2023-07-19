
console.log('----土巴兔chrome插件成功载入----')
const { host } = window.location;

if (host === 'channels.weixin.qq.com') {
  window.addEventListener("message", function(evt) {
    if (evt.origin !== "https://oms.to8to.com") return;
    const { data } = evt;
    if (data.opt === 'fetchVideoAccountId') {
      const node = document.getElementById('finder-uid-copy');
      window.parent.postMessage({
        from: 'chrome://extensions',
        type: 'videoAccountId',
        value: node ? node.innerText : null
      }, 'https://oms.to8to.com')
    }
  }, false)
}

if (host === 'oms.to8to.com') {
  window.addEventListener('message', function(evt) {
    if (evt.origin !== "https://oms.to8to.com") return;
    const { data } = evt;
    if (data.opt === 'fetchSessionId') {
      chrome.runtime.sendMessage('', { key: 'getCookie' })
    }
  }, false)

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    window.postMessage({
      from: 'chrome://extensions',
      type: 'sessionId',
      value: request.cookie ? request.cookie.value : null
    }, "https://oms.to8to.com")
    sendResponse('我收到了')
  })
}