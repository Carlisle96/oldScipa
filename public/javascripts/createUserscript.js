$(document).ready(function() {
  console.log($("#userForm"));
  // $("#userForm").submit(function(e) {
  //   alert("submit")
  //   e.preventDefault(); // avoid to execute the actual submit of the form.
  //
  //   var form = $(this);
  //   var url = form.attr('action');
  //   alert(url)
  //   $.ajax({
  //          type: "POST",
  //          url: url,
  //          data: form.serialize(), // serializes the form's elements.
  //          success: function(data)
  //          {
  //              alert(data); // show response from the php script.
  //          }
  //        });
  //
  //
  //  });
  //  $("#userForm").ajaxForm({url: 'http://google.de', type: 'get'})

    $("#userForm").on('submit',async function(event) {
                 event.preventDefault(); // to prevent default page reloading
                 var dataString = $(this).serialize(); // to get the form data
                 // alert("hello")
                 //console.log(dataString)

                 var user_first_name = $("#user_first_name").val();
                 var user_last_name = $("#user_last_name").val();
                 var user_name = user_first_name + " " + user_last_name;
                 var pwd = $("#password").val();
                 var wallet = address;

                 if(!user_first_name || !user_last_name) {
                   Swal.fire({
                       title: "Invalid input",
                       text: "Need to provide both first and last name",
                       type: 'error',
                       confirmButtonText: 'Ok'
                   })
                   throw new Error("Need to provide both first and last name")
                 }

                 if(!pwd) {
                   Swal.fire({
                       title: "Invalid input",
                       text: "Need to provide password",
                       type: 'error',
                       confirmButtonText: 'Ok'
                   })
                   throw new Error("Need to provide password")
                 }
                 if(!wallet) {
                   Swal.fire({
                       title: "Invalid input",
                       text: "Need to provide wallet address",
                       type: 'error',
                       confirmButtonText: 'Ok'
                   })
                   throw new Error("Need to provide wallet address")
                 }
                 console.log($("#createSubmitButton"));
                 //$("#createSubmitButton").html('<i class="fas fa-spinner fa-spin"></i>');
                 //$("#createSubmitButton").html('Save');
                 //document.getElementById("createSubmitButton").innerHTML('<i class="fas fa-spinner fa-spin"></i>');
                 $.ajax({
                     type: "POST",
                     url: "http://35.242.243.4:5000/create-user",
                     data: {
                       user_name: user_name,
                       password: pwd,
                       wallet: wallet
                     },
                     success: function(data){
                        Swal.fire({
                         title: 'User created!',
                         text: 'User ' + user_name + ' was created!',
                         type: 'success',
                         confirmButtonText: 'Cool'
                       }).then((result) => {
                            if (result.value) {
                              window.location.href = "/";
                             }
                          }) // to reset form data
                     },
                     error: function(err) {
                         console.log(err);
                         Swal.fire({
                             title: err.statusText,
                             text: err.status + ': ' + err.responseText,
                             type: 'error',
                             confirmButtonText: 'Ok'
                         }).then((result) => {
                             if(result.value) {
                                 window.location.href = "/";
                             }
                         })
                     }
                 });
                $("#spinnerDiv").show();

                 // setTimeout(function (){
                 //   $("#spinnerDiv").hide();
                 //  // Something you want delayed.
                 //
                 //  }, 5000)
     });
});




function createUser() {
  // alert($('form').serializeArray()[1].value)
  user_name = $("#user_password").val()
  pwd = $("#user_name").val()
  alert("createUser")
  axios.post('http://35.242.243.4:5000/create-user', {
    user_name: user_name,
    password: pwd,
    wallet: address
  })
  .then(function (response) {
    Swal.fire({
      title: 'Done!',
      text: response,
      type: 'success',
      confirmButtonText: 'Cool'
    })
  })
  .catch(function (error) {
    console.log(error);
  });


}
