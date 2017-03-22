// This enables the iframe to be resized to fit its content using a 'postMessage' from the iframe to the parent window.
// As an alternative you could just set the iframe height to something generous to avoid vertical scrolling.
 
$(document).ready(function() {
    $(window).on("message", function(e) {
        var height = e.originalEvent.data.iframeHeight;
        $('div.popover iframe').height(height);
    });
});