if ($(".load").length > 0) {
    $(".load").each(function() {
        var path = $(this).data("src");
        var post = $(this).data("u");
        var current = $(this);
        var data = {u: post};
        $(".load .loader").html("<img src='assets/images/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url: 'assets/data/load-'+path+'.php',
            processData: true,
            data: data,
            timeout: 40000,
            async: true,
            success: function (result) {
                current.hide().html(result).fadeIn('slow');
                $('[data-toggle="tooltip"]').tooltip();
            },
            dataType: 'text'
        });
    });
}
$("body").on("click", ".reload",function(e) {
    e.preventDefault();
    var path = $(this).data("src");
    var current = $(this).closest(".load");
    $(this).closest(".load").html('<div class="text-center loader"><img src="assets/images/ajax-loader.gif" /></div>');
    $.ajax({
        type: 'POST',
        url: 'assets/data/load-'+path+'.php',
        processData: true,
        data: data,
        timeout: 40000,
        async: true,
        success: function (result) {
            current.hide().html(result).fadeIn('slow');
        },
        dataType: 'text'
    });
}).on("change",".rebuild-create-campaign",function(e){
    var format = $("select[name='format']").val();
    var cost = $("select[name='cost']").val();
    var data = {format: format,cost:cost};
    $(".create-campaign").html('<div class="text-center loader"><img src="assets/images/ajax-loader.gif" /></div>');
    $.ajax({
        type: 'POST',
        url: 'assets/data/load-create-campaign.php',
        processData: true,
        data: data,
        timeout: 40000,
        async: true,
        success: function (result) {
            $(".create-campaign").hide().html(result).fadeIn('slow');
            $('[data-toggle="tooltip"]').tooltip();
        },
        dataType: 'text'
    });
});

$(document).on("submit", "form[name*='post']", function(e) {

    var selector = $(this);
    var target = $(this).data("target");

    var formURL = "assets/data/load-"+selector.attr("action")+".php";
    var formData = new FormData(this);
    $("."+target+"").html("<div class='text-center'><img src='assets/images/ajax-loader.gif' /></div>");
    $.ajax({
        url: formURL,
        type: "POST",
        data:  formData,
        mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        processData:false,
        success: function(data, textStatus, $XHR)
        {
            $("."+target+"").hide().html(data).fadeIn('slow');
        }
    });
    e.preventDefault();

});