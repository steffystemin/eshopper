
$("select.withOther").change(function(){
    var other = $(this).attr("id") + "_other";
    var val = $(this).val();
    if(val && val.toUpperCase().includes("OTHER")){
        $( "#"+other ).prop( "hidden", false );
        $( "#"+other ).focus();
    }else{
        $( "#"+other ).prop( "hidden", true );
        $( "#"+other ).val("");
    }
});

$("input._numeric_only").keypress(function(event) {
    return /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/.test(String.fromCharCode(event.keyCode));
  });

$("#reset").click(function(event){
    $("form")[0].reset();
});

$("#submit").click(function(event){
    $("form")[0].submit();
});

