$(document).ready(function() {

    $("#heading-carousel").owlCarousel({
        singleItem: true,
        navigation:false,
        pagination: false
    });
    $("#partners-carousel").owlCarousel({
        items: 6,
        navigation:false,
        pagination: false
    });

});
$("body").on("click", ".owl-menu",function(e) {
    var headingCarousel = $("#heading-carousel").data('owlCarousel');
    e.preventDefault();
    var action = $(this).data('slide');
    headingCarousel.goTo(action);
}).on("click", ".add-domain",function(e) {
    e.preventDefault();
    $(".domains").append('<br /><input type="text" class="input-style" name="website[]" placeholder="domain.com" style="margin-top: 10px">');
}).on("click", ".delete-domain",function(e) {
    e.preventDefault();
    $(this).parents('.input-holder').remove();
}).on("change",".auto-submit",function() {
    $(this).closest("form").submit();
}).on("click",".bid",function(e) {
    e.preventDefault();
    var unique = $(this).data("u");
    var type = $(".adType").val();
    var size = $(".size").val();
    var cost = $(".cost").val();
    var pack = $(".package").val();
    var price = $(".pricingBid").val();
    var data = {};
    $('#modal').modal('show').on('hidden.bs.modal');
    if(unique !== undefined)
        data = {unique:unique};
    else
        data = {type:type,size:size,cost:cost,pack:pack,price:price};
    $(".modal-content").html('<div class="text-center loader"><img src="assets/images/ajax-loader.gif" /></div>');
    $.post("assets/data/data-bid.php", data, function (result) {
        $(".modal-content").html(result);
    });
});


$('.date-pick').daterangepicker({
    locale: {
        format: 'YYYY-MM-DD'
    },
    singleDatePicker: true,
    showDropdowns: true
});
$('input[name="daterange"]').daterangepicker(
    {
        locale: {
            format: 'YYYY-MM-DD'
        },
        startDate: $(".startDate").val(),
        endDate: $(".endDate").val(),
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    },
    function(start, end, label) {
        $(".startDate").val(start.format('YYYY-MM-DD'));
        $(".endDate").val(end.format('YYYY-MM-DD'));
        $(".date-form").submit();
    });

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
function getGetOrdinal(n) {
    var s=["th","st","nd","rd"],
        v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
}
function toUSD(target,value,satoshi){
    $.post("assets/ajax/call-btc-usd.php", {value:value,isSatoshi:satoshi}, function (result) {
        $(target).html(result);
    });
}