

var snipBtn = document.querySelector('button#snip');
var snipCloseBtn = document.querySelector('button#snip-close-button');






window.onload = () => {

    chrome.tabs.query({currentWindow: true, active: true},  function (tabs){
        var activeTab = tabs[0];



        chrome.tabs.sendMessage(activeTab.id, {"msg": "snip-open"}, (res) => {
            
            if (res.isAlreadyOn > 0) {
                document.body.classList.toggle("snip-on");
                document.body.classList.toggle("snip-off"); 
            }


        });
        



    }); 
        
}















snipBtn.addEventListener('click' ,  (event) => {




    chrome.tabs.query({currentWindow: true, active: true},  function (tabs){
        var activeTab = tabs[0];


        chrome.windows.getCurrent( function (win) {    
                

            chrome.tabs.captureVisibleTab(win.id,{"format":"png"},  function(imgUrl) {

                        

                chrome.tabs.sendMessage(activeTab.id, {"msg": "snip","imageUrl": imgUrl});
        
                document.body.classList.toggle("snip-on");
                document.body.classList.toggle("snip-off");                
                
            });    
        }); 
        
    });  


});





snipCloseBtn.addEventListener('click', (event) => {



    chrome.tabs.query({currentWindow: true, active: true},  function (tabs){
        var activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, {"msg": "snip-close"});


        document.body.classList.toggle("snip-on");
        document.body.classList.toggle("snip-off");
    
    });


});

