SPA.Chart = (function ($) {

  let configMap = {
    $chartContainer: null
  }

  let init = function ($chartContainer) {
    console.log("succes loaded init");
    configMap.$chartContainer = $chartContainer;
    return true;
  };

  let showPieChart = function (chartData, animate){
    console.log("test");
  }

  return {
    init: init,
    showPieChart: showPieChart
  };
})(jQuery);
