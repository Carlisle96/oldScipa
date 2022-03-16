

$(document).ready(function() {

    $("#submitForm").on('submit',function(event) {
         event.preventDefault();
         var formData = new FormData(this);

         var title = formData.get("title")
         var author = formData.get("author")
         var bibtex = formData.get("bibtex")
         var file = formData.get("paper")
         if(!title) {
           Swal.fire({
               title: "Invalid input",
               text: "Need to provide title of paper",
               type: 'error',
               confirmButtonText: 'Ok'
           })
           throw new Error("Need to provide title of paper")
         }

         if(!author) {
           Swal.fire({
               title: "Invalid input",
               text: "Need to provide author of paper",
               type: 'error',
               confirmButtonText: 'Ok'
           })
           throw new Error("Need to provide author of paper")
         }

         if(!bibtex || !file ) {

           Swal.fire({
               title: "Invalid input",
               text: "Need to provide both files",
               type: 'error',
               confirmButtonText: 'Ok'
           })
           throw new Error("Need to provide both files")
         }

         $.ajax({
             type: "POST",
             url: "http://35.242.243.4:5000/submit-file",
             data: formData,
             cache: false,
             contentType: false,
             processData: false,
             crossDomain: true,
             dataType: 'text',
             success: function(data, textStatus, jqXHR){
               $("#spinnerDiv").hide();
                Swal.fire({
                 title: 'Paper submitted!',
                 text: 'Paper with title "'+title+'" was submitted with ID '+jqXHR.responseText+' !',
                 type: 'success',
                 confirmButtonText: 'Cool'
               }).then((result) => {
                    if (result.value) {
                      window.location.href = "/";
                     }
                  }) // to reset form data
             },
             error : function(jqXHR,textStatus,errorThrown){
               $("#spinnerDiv").hide();
               console.log(jqXHR);
               console.log(textStatus);
               console.log(errorThrown);
               Swal.fire({
                title: 'Something went wrong!',
                text: jqXHR.responseText,
                type: 'error',
                confirmButtonText: 'Ok'
              }).then((result) => {
                   if (result.value) {
                     window.location.href = "/submit";
                    }
                 }) // to reset form data
             }

             // }
         });
        $("#spinnerDiv").show();
    });

    $('#inSubFile').change(function() {
      var i = $(this).prev('label').clone();
      var file = $('#inSubFile')[0].files[0].name;
      $('#butSubFile').text(file);
    });

    $('#inSubBibTex').change(function() {
      var i = $(this).prev('label').clone();
      var file = $('#inSubBibTex')[0].files[0].name;
      $('#butSubBibTex').text(file);
    });


});

function resetForm() {
  $('#butSubFile').text("Upload Your Paper");
  $('#butSubBibTex').text("Upload Your BibTex");
}
