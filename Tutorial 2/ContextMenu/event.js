chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'twitterContextMenu',
        title: 'Search Twitter for \'%s\'',
        type: 'normal',
        contexts: ['selection']
    });

    chrome.contextMenus.create({
        id: 'yandexContextMenu',
        title: 'Search Yandex for \'%s\'',
        type: 'normal',
        contexts: ['selection']
    });
});

// chrome.contextMenus.onClicked.addListener((info)=>{
//     chrome.tabs.create({
//         url:'http://twitter.com/search?q='+encodeURIComponent(info.selectionText)
//     });
// });


chrome.contextMenus.onClicked.addListener(contextClick)

function contextClick(info, tab) {
    // console.log(info);
    // console.log(tab);

    const { menuItemId } = info;


    if (menuItemId === 'twitterContextMenu') {
        chrome.tabs.create({
            url: 'http://twitter.com/search?q=' + encodeURIComponent(info.selectionText)
        });
    } else if (menuItemId === 'yandexContextMenu') {
        console.log(info.selectionText);
        chrome.tabs.create({
            url: 'https://yandex.com.tr/search/?text=' + encodeURIComponent(info.selectionText)
        });
    }
}