/*
 * @Author: duiying
 * @CreateDate: Do not edit
 * @LastEditors: hexy.he
 * @LastEditTime: 2023-05-17 16:46:32
 * @Description: ...
 */

// function getcurrentTabId(callback) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     if (callback) callback(tabs.length ? tabs[0].id : null)
//   })
// }

// getcurrentTabId((tabId) => {
//   chrome.tabs.sendMessage(tabId, 'message', function (response) {
//     if (callback) callback(response);
//   })
// })

// chrome.cookies.get(
//   {
//     url: 'https://channels.weixin.qq.com/*',
//     name: 'sessionid'
//   },
//   e => {
//     this.getcurrentTabId((tabId) => {
//       chrome.tabs.sendMessage(tabId, message, function (response) {
//         if (callback) callback(response);
//       })
//     })
//   }
// )

// chrome.tabs.onActivated.addListener(tab => {
//   chrome.cookies.get(
//     {
//       url: 'https://channels.weixin.qq.com/*',
//       name: 'sessionid'
//     },
//     e => {
//       chrome.tabs.sendMessage(tab.tabId, { cookie: e }, {}, function(response) {
//         console.log('response', response);
//       });
//     }
//   )
// })
chrome.runtime.onMessage.addListener((message, sender) => {
  console.log('message', sender)
  if (message.key === 'getCookie') {

    chrome.cookies.get(
      {
        url: 'https://channels.weixin.qq.com/*',
        name: 'sessionid'
      },
      e => {
        chrome.tabs.sendMessage(sender.tab.id, { cookie: e }, {}, function(response) {
          console.log('response', response);
        });
      }
    )
  }
})