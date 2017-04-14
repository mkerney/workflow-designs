
var lineData = [];
$(document).ready(function () {
//    load data
 var lineData = [];

 var options={
    container:"#example8",
    height: '150',
    // width:'250',
    gridy:true ,
    uri :"assets/linechartwith-tooltip/data/data.json" 
 }
 var options1={
    container:"#companyexample8",
    height: '300',
   // width:'350',
    gridy:true ,
    uri :"assets/linechartwith-tooltip/data/data.json" 
 }
 var options2={
    container:"#companyexample12",
    height: '200',
   // width:'250',
    gridy:true ,
    uri :"assets/linechartwith-tooltip/data/data.json" 
 }
loadlineData(options);
loadlineData(options1);
loadlineData(options2);

   
  });
//responsivenss
   /* $(window).on("resize", function () {
       loadlineData();
     });
*/
function loadlineData(options){
    var current_options = options;
    console.log(options);
    // var uri = "assets/linechartwith-tooltip/data/data.json";

    var lineData = [];
     d3.json(options.uri, function (error, data) {
        console.log(data,options);
lineData=data;
current_options.data=data;
         console.log("data",data);
         var options = new lineChart(current_options);


   
})
}
//--------------------------------------------------------------------------------------------------------------
