

var snipBtn = document.querySelector('button#snip');



snipBtn.addEventListener('click' , (event) => {
    


    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];

        chrome.windows.getCurrent(function (win) {    
            chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {

                chrome.tabs.sendMessage(activeTab.id, {"msg": "snip","imageUrl": imgUrl});
                
            });    
        }); 
        
    });

});







