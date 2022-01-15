richTextField.document.designMode = 'On';
    


for (const elem of document.querySelectorAll('button.click-cmd')) {   
    
    $(elem).bind('click', function (e) {       
        richTextField.document.execCommand( $(this).attr('clickCmd') , false, null);
    });
    
}


for (const elem of $('button.click-cmd-arg')) {   
    

    $(elem).bind('click', function (e) {       
        
        
        if ($(this).attr('cmd-arg').split('prompt')) {
            
            var promptString = prompt( $(this).attr('cmd-arg').split('prompt')[1].split(',')[0].split("'")[1], '');
            if (promptString  != null ) 
                richTextField.document.execCommand( $(this).attr('clickCmdArg') , false, promptString);


        }
        else {

        }

        // richTextField.document.execCommand( $(this).attr('clickCmdArg') , false, $(this).attr('cmd-arg'));
    });

}




for (const elem of $('.change-cmd')) { 

    $(elem).bind('change', function (e) {       
        
        richTextField.document.execCommand( $(elem).attr('changeCmd') , false, $(elem).val() );
    });


}





