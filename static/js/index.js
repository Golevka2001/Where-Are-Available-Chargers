$('span.percent').each(function () {
    var percent = $(this).text() + ' 100%';
    $(this).parent().css('background-size', percent);
});
