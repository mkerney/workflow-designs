$(document).ready(function () {
    var options={


    header : "ASSOCIATED ENTITIES",
    uri1 :"/proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242/graph/1000",//"proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242/graph/1000";
    uri2 :"/proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242/risk",//"proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242/risk"; 
   container :"#example5",
   height:500
}
    timescaleBubble(options);
});

function timescaleBubble(options)
{
    var timescalebubbleData = [];
    loadtimescalebubbleChart(options)
//responsivenss
    $(window).on("resize", function () {
        if ($(options.container).find("svg").length != 0) {
            $(options.container).empty();
            new timescalebubbleChart(options);
        }
    });


    function loadtimescalebubbleChart(options) {
        var loadflag = 0;
        var vertexData = [];
        var riskData = [];
        d3.json(options.uri1, function (data) {
            loadflag++;
            vertexData = data.vertices;
            options.data=timescalebubbleData;
            if (loadflag == 2) {

                var exampleChart = new timescalebubbleChart(options);
            }
        });
        d3.json(options.uri2, function (data) {
            loadflag++;
            riskData = data.body;
            if (loadflag == 2) {

                timescalebubbleData = handleTImeBubleData(vertexData, riskData)
                options.data=timescalebubbleData;
                var exampleChart = new timescalebubbleChart(options);
            }
        });
    }
    //--------------------------------------------------------------------------
    /**
     * FUnction to handle time line bubble data
     */
    function handleTImeBubleData(vertexData, riskData) {
        console.log(vertexData, riskData);
        var finalData = [];
        $.each(vertexData, function (i, v) {
            $.each(riskData, function (i1, v1) {
                if (v.id == v1.vertex) {
                    var rate = getriskRation(v1.direct, v1.indirect, v1.transactional);
                    var size = parseInt(rate / 10);
                    finalData.push({
                        date: v.start,
                        rate: rate,
                        size: size
                    })
                }
            });
        });
        return finalData;
    }
    function getriskRation(direct, indirect, transactional) {
        return (1 - [(1 - direct) * (1 - indirect) * (1 - transactional)]) * 100;
    }
}