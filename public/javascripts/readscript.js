var req = new XMLHttpRequest();

/*
async function OLDrequest(id, title) {
  console.log("Halleluja" + id + title);
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
    $.post( "read/request/"+id, { title: title, address:address, password:password} ).done(function(data, status, xhr) {
      window.location = this.url;
    });
  }
  // $.get( "read/request/"+id, { title: title} ).done(function(data, status, xhr) {
  //   window.location = this.url;
  // });
  // $.post( "read/request/"+id, { title: title, address:$('#address').html(), password:} ).done(function(data, status, xhr) {
  //   window.location = this.url;
  // });

}

*/
let lastReadPapers = [];
let accessiblePapers;

window.addEventListener('load', function() {

  updateDataRead();

  setInterval(function() {

    updateDataRead();
    lastReadPapers = accessiblePapers;

  }, 3000);

});

function updateDataRead() {

  accessiblePapers = [0];

  contract.getReadable.call(function(err,accpapers) {
    console.log("")
    for(let i=0; i<accpapers.length; i++) {
      accessiblePapers[i] = accpapers[i]["c"][0];
    }
    console.log(accpapers.length + " vs. " + lastReadPapers.length)
    if(accpapers.length !== lastReadPapers.length) {

      if(accessiblePapers) {
        $('#paperTable tbody tr').each(function(){
          var id = parseInt($(this).find('td:first-child').html(),10);

          var title = $(this).find('td:nth-child(2)').html()
          if(accessiblePapers.includes(id)) {
            $('#button'+id).html('Read');
            $('#button'+id).addClass('fancybuttonRead');
            $('#button'+id).click(function() {
              request(id,title);
            })
          } else {
            $('#button'+id).parent().html("<button onclick=\"myBuyFunction(" + id + ")\" class=\"fancybuttonBuy\">Buy</button>");
          }
        });
      }


    }


  });
}

function myBuyFunction(id) {

  contract.readPaper(id,{value: 10000000000000000, gas: 1000000 }, function(err, result){
    console.log("Error " + err);
    console.log(result);
  });

}

/*
function myFunction() {

      Swal.fire({
        title: 'Error!',
        text: 'error',
        type: 'error',
        confirmButtonText: 'Cool'
      })

  }
 */
