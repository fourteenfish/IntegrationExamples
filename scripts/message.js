// This enables the iframe to be resized to fit its content using postMessage() from the iframe to the parent window.
// As an alternative you could just set the iframe height to something generous to avoid the iframe scrolling vertically.
// The script also closes the popover when the new entry has been saved.

// Support for postMessage() has been around in browsers for some time now, and Internet Explorer has included support since version 8.

// IE	FIREFOX	CHROME	SAFARI	OPERA
// 8+	3.0+	1.0+	4.0+	9.5+

 
$(document).ready(function() {
    $(window).on("message", function(e) {
        var data = e.originalEvent.data;
        console.log(data);
        
        if (data.event == "height") {
            var height = data.iframeHeight;
            if ($('iframe').height() < height) $('iframe:eq(0)').height(height);
        }
        else if (data.event == "saved") {
            $('div.pagecover, div.popover').remove();
            console.log('Entry saved to FourteenFish.  Incoming ID: ' + data.incomingid + '  FourteenFish ID: ' + data.fishid);
        }
        else if (data.event == "refreshlist") {
            $('iframe.cpdlist').attr("src", $('iframe.cpdlist').attr("src"));
        }
    });
});