$( "#save-button" ).on( "click", function() {
    html2canvas(document.querySelector("#tier-list")).then(canvas => {
      canvas.toBlob(function(blob) {
        window.saveAs(blob, 'my_image.jpg');
      });
      });
  });