var fileInput = $('.file-input');
var droparea = $('.file-drop-area');
var reset = $(".file-drop-area input[type='reset']");
var confirm = $(".file-drop-area input[type='submit']");

// highlight drag area
fileInput.on('dragenter focus click', function() {
  droparea.addClass('is-active');
});

// back to normal state
fileInput.on('dragleave blur drop', function() {
  droparea.removeClass('is-active');
});

// load file
fileInput.on('change', function() {
  // check file extension
  var fileName = $(this).val().split('\\').pop();
  var extension = fileName.split('.').pop();
  if (extension === 'csv') {
    // validate csv
    //  if validated
    var textContainer = $(this).parent().find('.file-msg');
    textContainer.text(fileName);
    reset.css('display', 'block');
    confirm.css('display', 'block');
  } else {
    alert('Please load a .csv file.');
  }
});

reset.click(function() {
  var textContainer = $(this).parent().find('.file-msg');
  textContainer.text('or drag and drop a file here.');
  reset.css('display', 'none');
  confirm.css('display', 'none');
});

confirm.click(function() {

});
