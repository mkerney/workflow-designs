$(document).ready(function () {
    var options =
            {
                container: "#tagcloud", //Container id where chart will be appended
                header: "HOT TOPICS", //Heading of Chart
                uri: "/proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242",
                speed: 3,
                slower: 0.9,
                timer: 5,
                fontMultiplier: 15,
                hoverStyle: {
                    border: 'none',
                    color: '#0b2e6f'
                },
                mouseOutStyle: {
                    border: '',
                    color: ''
                }
            }
    loadTagCloud(options);

});
//---------------------------------------------------------------------------
/**
 *Function to call a function to plot Bubble chart and to call function on window resize
 */

function loadTagCloud(options)
{
    var defaultOptions;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: options.uri,
        success: function (response) {
            options.data = handleTagCloudData(response);
            defaultOptions = jQuery.extend(true, {}, options);
            populateTagCloud(options);
        }
    });
    $(window).on("resize", function () {
        if ($(options.container).find("table").length == 0) {
            $(options.container).empty();
            var curent_options = jQuery.extend(true, {}, defaultOptions);
            populateTagCloud(curent_options);
        }
    });
    function handleTagCloudData(response) {
        var keys = d3.keys(response);
        var newData = {};
        $.each(keys, function (i, d) {
            $.each(response[d], function (i1, d1) {
               newData[i1]=d1
            })
        });        
        return newData;
    }


//-----------------------------------------------------------------------------
    /**
     * 
     * Function to poplate globe
     */
    function populateTagCloud(options) {
        var actualOptions = jQuery.extend(true, {}, options);
        var randomSubstring = Math.floor(Math.random() * 10000000000);
        var chartContainerdiv = '<div class="chartContainer"  align="center" style="width: 60%; margin: auto; margin-top: 30px; font-size: 14px;font-family: roboto-regular;"> <div class="graphBox" style="margin: auto; background-color: #374c59; width: 100%;left: 0px;top: 0px;overflow: hidden;position: relative;"> <div class="headerDiv" style="font-weight:bold;background-color: #425661;text-align: left;color: #239185; border-bottom: 1px solid rgba(192, 192, 192, 0.47);width: 100%; line-height: 2.5;font-size: 16px ;padding-left: 5px;">' + options.header + '</div><div id="tag_cloud_div' + randomSubstring + '" class="chartContentDiv" style="width: 100%;"></div> </div></div>'
        $(options.container).html(chartContainerdiv);
        var chart_container = "#tag_cloud_div" + randomSubstring;
        options.width = options.width ? options.width : $(chart_container).width() - 10;
        if (options.height > options.width) {
            options.height = options.width
        }
        else{
            options.width = options.height
        }
        $(chart_container).css("height", options.height)
        if ($(chart_container).siblings(".headerDiv").find(".bstheme_menu_button").length == 0)
            var header_options = '<div style="float: right; padding: 0 10px; cursor: pointer;" class="bstheme_menu_button bstheme_menu_button_' + randomSubstring + '" data-toggle="collapse" data-target="#opt_' + randomSubstring + '"><i class="fa fa-ellipsis-v" aria-hidden="true"></i><div class="bstheme_options" style="position:absolute;right:10px;z-index:2000"> <div style="display:none;" id="opt_' + randomSubstring + '" class="collapse"><span class="header_refresh_' + randomSubstring + '"><i class="fa fa-refresh" aria-hidden="true"></i></span> <span class="header_table_' + randomSubstring + '"> <i class="fa fa-table" aria-hidden="true"></i></span> <span class="header_chart_' + randomSubstring + '" style="display:none" ><i class="fa fa-bar-chart" aria-hidden="true"></i></span></div></div> </div>';
        $(chart_container).siblings(".headerDiv").append(header_options);
        var containerid = options.container;
        //append list
        var keys = d3.keys(options.data);
        var lis = "<ul>";
        $.each(keys, function (i, d) {
            lis = lis + '<li><a href="#">' + d + '</a></li>';
        });
        lis = lis + "</ul>"
        $(chart_container).append(lis);

        $(chart_container).tagoSphere(options);
//------------------------------------------------------------------------------
        /**
         * Fuction to handle show hide of header options
         */
        $("body").on("click", ".bstheme_menu_button_" + randomSubstring, function () {
            var id = ($(this).attr("data-target"));
            if ($(id).css("display") == "none") {
                $(id).css("display", "inline-block");
            } else {
                $(id).css("display", "none");
            }
        });
//------------------------------------------------------------------------------
        /**
         * Fuction to handle show hide of header options
         */
        $("body").on("click", ".header_refresh_" + randomSubstring, function () {
            var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
            if ("#" + chartId == chart_container) {
                $(containerid).empty();
                loadTagCloud(actualOptions);
            }
        });
//------------------------------------------------------------------------------
        /**
         * Fuction to handle show hide of header options
         */
        $("body").on("click", ".header_table_" + randomSubstring, function () {
            $(chart_container).empty();
            $(chart_container).css("overflow", "auto")
             $(chart_container).css("width", "100%")
            $(this).css("display", "none");
            $(".header_chart_" + randomSubstring).css("display", "inline-block");

            var tbl = "<div style='padding:5px;background-color: #FFF;overflow:auto'><table class='table-striped' style='width:100%;'><thead><tr><th>" + "Name" + "</th><th>" + "Size" + "</th></tr></thead><tbody>";

            $.each(actualOptions.data, function (i, v) {
                console.log(i, v);
                tbl = tbl + ("<tr><td>" + i + "</td><td>" + v + "</td></tr>");
            })
            tbl = tbl + "</tbody></table></div>";
            $(chart_container).append(tbl);


        });
//------------------------------------------------------------------------------
        /**
         * Fuction to handle show hide of header options
         */
        $("body").on("click", ".header_chart_" + randomSubstring, function () {
            $(chart_container).css("overflow", "hidden")
            var chartId = $(this).parent().parent().parent().parent().siblings("div").attr("id");
            if ("#" + chartId == chart_container) {
                $(this).css("display", "none");
                $(".header_table_" + randomSubstring).css("display", "inline-block");
                $(containerid).empty();
                populateTagCloud(actualOptions);
            }
        });
    }

}
