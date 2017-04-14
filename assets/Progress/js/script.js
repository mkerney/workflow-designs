 var progressbarData = [];

 $(document).ready(function () {
//    load data


var w = $(".col-sm-4.col-lg-3.pad-0").width();
console.log(w);
       var h = $(".col-sm-6").height();
 var w1 = $(".col-sm-6").width();
      var h1 = $(".col-sm-6").height();
var w2 = $(".sidebar-panel-content").width();
      var h2 = $(".sidebar-panel-content").height();


      var options1={
        // width:w,
        height:150,
        uri:"assets/Progress/data.json",
        container:"#example2"
      }


        var options2={
        width:w1,
        height:h1,
        uri:"assets/Progress/data.json",
        container:"#example3"
      }

     var options3={
        width:w2,
        height:150,
        uri:"assets/Progress/data.json",
        container:"#example5"
      }


      var options4={

        height:200,
        uri:"assets/Progress/data.json",
        container:"#companyexample5"
      }

       var options5={

        height:200,
        uri:"assets/Progress/data.json",
        container:"#companyexample3"
      }
        

      var options6={
        height:200,
        uri:"assets/Progress/data.json",
        container:"#companyexample2"
      }


       
  progress(options1);       
  progress(options2);
  progress(options3); 
  progress(options4);   
  progress(options5);  
  progress(options6);              

    });


 function progress(options)
 {
    loadprogressbarChart(options);  
//responsivenss
    $(window).on("resize", function () {     
       

       new progressbarChart(options); 
    

    })

function loadprogressbarChart(options){
    d3.json(options.uri, function (error, data) {
       progressbarData= data;
       options.data=progressbarData;
     
      
        var exampleChart = new progressbarChart(options); 
      

        }); 
}

}