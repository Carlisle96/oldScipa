var req = new XMLHttpRequest();

async function request(id, title) {
      //console.log("Halleluja" + id + title);
      const {value: password} = await Swal.fire({
            title: 'Enter your password',
            input: 'password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                  maxlength: 100,
                  autocapitalize: 'off',
                  autocorrect: 'off'
            }
      });
      if (password) {

            var data = new FormData();
            data.append('paper_id', id);
            data.append('wallet', address);
            data.append('password', password);

            req.open("POST", "http://35.242.243.4:5000/read-file", true);
            req.responseType = "blob";
            //req.data = { paper_id: id, wallet:address, password:password };
            req.onreadystatechange = function () {
                  if (req.readyState === 4 && req.status === 200) {

                        // test for IE

                        if (typeof window.navigator.msSaveBlob === 'function') {
                              window.navigator.msSaveBlob(req.response, "PdfName-" + new Date().getTime() + ".pdf");
                        } else {
                              var blob = req.response;
                              console.log(blob);

                              var url = URL.createObjectURL(blob);
                              window.location.href = url;
                        }
                  }
            };
            req.send(data);

      }
}



$("hellobutton").click(function () {
      console.log('pressed');
});

function myFunction() {

      Swal.fire({
            title: 'Error!',
            text: 'error',
            type: 'error',
            confirmButtonText: 'Cool'
      })

}
