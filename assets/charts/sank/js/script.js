var clusterbubbleData = [];//array of data


$(document).ready(function () {
 var height = sessionStorage.getItem('f15')
console.log(height)
 var options={

 header: "TRANSACTIONS JOURNEY",//Heading of Chart
Uri : "assets/charts/sank/js/data.json",//"proxy/api/cases/6eb696d9ccbd41b98c8f7eb12e2b9242/risk";//Url of data
container : "#transactions_journey",
height:300,
}
    sankey_diagram(options);//calling ClusterBubble function
});

//---------------------------------------------------------------------------
/**
*Function to call a function to plot ClusterBubble chart and to call function on window resize
*/


function sankey_diagram(options)
{
  
    loadsankey(options);
current_options =options;
//responsivenss
    // $(window).on("resize", function () {
    //     $(options.container).empty();
    //     new sankey_diagram(options);
    // });
   $(window).on("resize", function () {
        if ($(options.container).find("svg").length != 0) {
            $(options.container).empty();
         
            new sankey_diagram(options);
        }
    });

//---------------------------------------------------------------------------
/**
*Function to load data to plot ClusterBubble chart 
*/

function loadsankey(options) {

   
$(options.container).siblings(".headerDiv").html(options.header);
   d3.json(options.Uri, function (error, data) {

    //    var data
        options.data=data;
       console.log(data);
        var exampleChart = new sankey(options);

    });




}
}