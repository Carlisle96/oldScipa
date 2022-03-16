var readablePapers;
let lastPapers = [];
let lastAPapers = [];
let submitedPapers;

window.addEventListener('load', function() {

    updateDataHome();

    // always fetch fresh data
    setInterval(function() {
        updateDataHome();
        lastPapers = readablePapers;
        lastAPapers = submitedPapers;

    }, 3000);
});

function updateDataHome() {

    contract.getReadable.call(function(err, papers) {
        readablePapers = (papers);
        if(readablePapers.length !== lastPapers.length) {
            let htmlCODE = "";
            if(readablePapers[0] && !(readablePapers.length === 1 && readablePapers[0]["c"][0] === 0)) {

                for (var i = 0; i < readablePapers.length ; i++) {

                    if(readablePapers[i]["c"][0] === 0) {
                        console.log("omitting 0")
                    } else {
                        htmlCODE += "<tr id=\"readablerow" + readablePapers[i]["c"][0] + "\"></tr>";
                        const url = 'http://35.242.243.4:5000/search-paper';
                        const params = {
                            paper_name: '',
                            author: '',
                            paper_id: readablePapers[i]["c"][0],
                        };
                        $.ajax({
                            url: url,
                            data: params,
                            type: "GET",
                            success: function (result) {
                                result = JSON.parse(result);
                                let rowIDname = "#readablerow" + params.paper_id;
                                let rowidstring = "<td>" + result[0][0] +  "</td><td>" + result[0][2] +  "</td><td>" + result[0][1] +  "</td><td>" +
                                    "<button class=\"fancybuttonRead\" onclick=\"request(" + result[0][0] +  ", \'" + result[0][2] +  "\' )\" id=\"button" +
                                    result[0][0] +  "\">Read</i></button></td>";
                                $(rowIDname).html(rowidstring);

                            },
                            error: function (error) {
                                console.log('Error ${error}');
                            }
                        });

                    }
                }

                $('#paperTable').show();
                $('#warning').hide();
                $('#readables').html(htmlCODE);
            } else {
                htmlCODE = "You did not buy any papers yet!";
                $('#paperTable').hide();
                $('#warning').show();
                $('#warning').html(htmlCODE);
            }
        }

    });

    contract.getSubmited.call(function(err, papers) {
        submitedPapers = (papers);

        if(submitedPapers.length !== lastAPapers.length) {
            let htmlCODE = "";
            if(submitedPapers[0] && !(submitedPapers.length === 1 && submitedPapers[0]["c"][0] === 0)) {

                for (var i = 0; i < submitedPapers.length ; i++) {

                    if(submitedPapers[i]["c"][0] === 0) {
                        console.log("omitting 0")
                    } else {
                        htmlCODE += "<tr id=\"submitedrow" + submitedPapers[i]["c"][0] + "\"></tr>";
                        const url = 'http://35.242.243.4:5000/search-paper';
                        const params = {
                            paper_name: '',
                            author: '',
                            paper_id: submitedPapers[i]["c"][0],
                        };
                        $.ajax({
                            url: url,
                            data: params,
                            type: "GET",
                            success: function (result) {
                                result = JSON.parse(result);
                                let rowIDname = "#submitedrow" + params.paper_id;
                                $(rowIDname).html(
                                    "<td>" + result[0][0] +  "</td><td>" + result[0][2] +  "</td><td>" + result[0][1] +  "</td><td>" +
                                    "<button class=\"fancybuttonRead\" onclick=\"request(" + result[0][0] +  ", \'" + result[0][2] +  "\' )\" id=\"sbutton" +
                                    result[0][0] +  "\">Read</i></button></td>"
                                );
                            },
                            error: function (error) {
                                console.log('Error ${error}');
                            }
                        });

                    }
                }

                $('#submitTable').show();
                $('#swarning').hide();
                $('#submited').html(htmlCODE);
            } else {
                htmlCODE = "You did not submit any papers yet!";
                $('#submitTable').hide();
                $('#swarning').show();
                $('#swarning').html(htmlCODE);
            }
        }

    })

}
