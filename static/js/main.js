$(document).ready(function () {
    // Init
    console.log("initialized");
    $('.image-section').hide();
    // $('.loader').hide();
    $('#result').hide();

    let copyImgString;

    // Upload Preview
    const readURL=(input)=> {
        console.log("read",input);
        if (input.files && input.files[0]) {
            console.log("in if");
            var reader = new FileReader();
            reader.onload = function (e) {
                copyImgString=e.target.result;
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(()=> {
        console.log("triggered");
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        console.log("printing");
        console.log(readURL);
        readURL(document.getElementById("imageUpload"));
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        // $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                // $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });

});
