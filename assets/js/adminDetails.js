function table() {

    d3.json("assets/data/adminDetails.json", function (error, data) {



        var randomSubstring = Math.floor(Math.random() * 10000000000);
        var tbl = "<div id ='pieChart_table_" +
                randomSubstring +
                "' style='width:100%;font-weight:normal;background-color:#283c45;color:#c3cfd4';><table class='table-striped' class='table table-condensed' style='width:100%;background-color:#283C45;color:#c3cfd4;'><thead class='text-uppercase'><tr><th>First Name</th><th>Last Name</th><th>Screen Name</th><th>Title</th><th>Group</th><th>Role</th><th>CREATE DATE</th><th>Actions</th></tr></thead><tbody>";
        console.log(data);
        $.each(data, function (i, v) {
            console.log(v);
            tbl = tbl + ("<tr style='width:100%;padding:5px;background-color:#283C45;color:#828d92'><td>" +
                    (v.firstname.toUpperCase()) +
                    "</td><td>" +
                    v.lastname.toUpperCase() +
                    "</td><td>" +
                    v.screenname.toUpperCase() +
                    "</td><td>" +
                    (v.title.toUpperCase()) +
                    "</td><td>" +
                    (v.group.toUpperCase()) +
                    "</td><td>" +
                    (v.role.toUpperCase()) +
                    "</td><td>" +
                    (v.cdate.toUpperCase()) +
                    "</td><td>" +
                    (v.actions.toUpperCase()) +
                    "</td></tr>");
        })
        tbl = tbl + "</tbody></table></div>";
        $('#managementData').append(tbl);
        $(".table-striped").DataTable({
            "bLengthChange": false,
            "showNEntries": false,
            "bInfo": false,
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (iDisplayIndex % 2 == 1) {
                    //even color
                    $('td', nRow).css('background-color', '#31464f');
                } else {
                    $('td', nRow).css('background-color', '#283C45');
                }
            }});





        $("#pieChart_table_" + randomSubstring + " tr:even").css("background-color", "#32464F");
        $("#pieChart_table_" + randomSubstring + " tr:odd").css("background-color", "#283C45");
        $("#pieChart_table_" + randomSubstring + " tr:first").css("background-color", "#0CB29A");

        var id1 = $("#pieChart_table_" + randomSubstring).children('div').find('div').eq(0);
        var id2 = $("#pieChart_table_" + randomSubstring).children('div').find('div').eq(1);
        var id3 = $("#pieChart_table_" + randomSubstring).children('div').find('div').eq(2);
        var id1attr = id1.attr("id");
        var id2attr = id2.attr("id");
        var id3attr = id3.attr("id");



        $("#" + id1attr + " " + "label").css("color", "#666666")
        $("#" + id2attr + " " + "label").css("color", "#666666")
        $("#" + id3attr).css("color", "#666666")

        $(" .dataTables_filter input").attr('placeholder', 'search').css({"margin-left": "0.5em", "position": "relative", "border": "0", "min-width": "240px",
            "background": "transparent",
            "border-bottom": "1px solid #315b80",
            "border-radius": " 0",
            "padding": " 5px 25px 5px 2px",
            "color": "#ccc",
            "height": " 30px",
            "-webkit-box-shadow": " none",
            "box-shadow": " none"
        })


    });
}

  