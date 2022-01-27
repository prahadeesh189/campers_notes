chrome.runtime.onMessage.addListener( async (request, sender, sendResponse) => {

    if( request.msg == "snip" ) {


        $("div#snip-bg").remove();
        $("div#snip").remove();

        

        $('body').append(`

            <div id="snip-bg">
        

                <div id="snip">
            
                </div>
                
            </div>
        
        `);
        



        var startX, startY;
        

        $('body div#snip-bg').bind('mousedown', (event) => {
            

            // console.log('start');



            startX = event.clientX;
            startY = event.clientY;

            
            $('body div#snip-bg div#snip').css('top', startY);
            $('body div#snip-bg div#snip').css('left', startX);

            $('body div#snip-bg div#snip').css('height', "0px");
            $('body div#snip-bg div#snip').css('width', "0px");



            $('body div#snip-bg div#snip').css('display', "block");


            $('body div#snip-bg').bind('mousemove', (evnt) => {

                var currX = evnt.clientX - startX;
                var currY = evnt.clientY - startY;

        
                if (currX < 0) {
                    $('body div#snip-bg div#snip').css('left',  `${evnt.clientX}px`  );
                    $('body div#snip-bg div#snip').css('right', startX);
                }
                else if (currX > 0) {
                    $('body div#snip-bg div#snip').css('right',  `${evnt.clientX}px`  );
                    $('body div#snip-bg div#snip').css('left', startX);
                }
                else {
                    $('body div#snip-bg div#snip').css('right', "0px");
                    $('body div#snip-bg div#snip').css('left',  "0px");
                }

                

                if (currY < 0) {
                    $('body div#snip-bg div#snip').css('top',  `${evnt.clientY}px`  );
                    $('body div#snip-bg div#snip').css('bottom', startY);
                }
                else if (currY > 0) {
                    $('body div#snip-bg div#snip').css('bottom',  `${evnt.clientY}px`  );
                    $('body div#snip-bg div#snip').css('top', startY);
                }
                else {
                    $('body div#snip-bg div#snip').css('bottom', "0px");
                    $('body div#snip-bg div#snip').css('top',  "0px");
                }





                $('body div#snip-bg div#snip').css('height', Math.max(currY, currY * -1));
                $('body div#snip-bg div#snip').css('width',  Math.max(currX, currX * -1));

            });
        });


        $('body div#snip-bg').bind('mouseup', (event) => {
            

            var top =    parseFloat($('body div#snip-bg div#snip').css('top').split('px')[0]);
            var right =  parseFloat($('body div#snip-bg div#snip').css('right').split('px')[0]);
            var bottom = parseFloat($('body div#snip-bg div#snip').css('bottom').split('px')[0]);
            var left =   parseFloat($('body div#snip-bg div#snip').css('left').split('px')[0]);


            // console.log("top: ", top);
            // console.log("right: ", right);
            // console.log("bottom: ", bottom);
            // console.log("left: ", left);





            var ht = Math.max(top-bottom, bottom-top);
            var wd = Math.max(right-left, left-right);


            // $('body').append(`

            //     <img src="${ request.imageUrl }">
            
            // `);

            var canvas = document.createElement('canvas');
            canvas.width =  wd;
            canvas.height = ht;

            var context = canvas.getContext('2d');
            var imageObj = new Image();

            var renderedHeight = parseInt( $('body div#snip-bg').css('height').split('px')[0]);
            var renderedWidth =  parseInt($('body div#snip-bg').css('width').split('px')[0]);



            imageObj.onload = function() {


                // console.log( (imageObj.width*left)/renderedWidth  );
                // console.log( (imageObj.height*top)/renderedHeight );

                context.drawImage(imageObj, (imageObj.width*left)/renderedWidth, (imageObj.height*top)/renderedHeight, (imageObj.width*wd)/renderedWidth, (imageObj.height*ht)/renderedHeight, 0, 0, wd, ht );
                // var pngUrl = canvas.toDataURL();


                var title = location.pathname.split('/').join(' ');


                canvas.toBlob(async function (blob) {
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            ["image/png"]: blob
                        })
                    ]);
                    const downloadImg = document.createElement("a");
                    downloadImg.download = title;
                    downloadImg.href = URL.createObjectURL(blob);
                    downloadImg.click();
                }, 'image/png');





                // $('body').append(`

                //     <img src="${ pngUrl }">
                
                // `);
            };

            imageObj.src = request.imageUrl;



            


            // console.log('over');

            $('body div#snip-bg div#snip').remove();
            $('body div#snip-bg').remove();



            $('body div#snip-bg').unbind('mousedown');
            $('body div#snip-bg').unbind('mousemove');
            $('body div#snip-bg').unbind('mouseup');
        });





    }
    else if (request.msg == "snip-close") {

        $("div#snip-bg").remove();
        $("div#snip").remove();

    }
    else if (request.msg == "snip-open") {

        sendResponse({
            isAlreadyOn: $("div#snip-bg").length
        });

    }


    
});



