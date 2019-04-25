let SPA = (function ($) {
  //private
  let configMap = {
    $domElements: {
      $buttons: null
    }
  }

  let _setDomElements = function ($parentContainer) {
    configMap.$domElements.$buttons = $($parentContainer).find('.btn');
    _attachEventListener();
  }

  let _attachEventListener = function () {
    $(configMap.$domElements.$buttons).click(function() {
      SPA.Calender.addEvent('TestEvent', '2019-04-25T15:30:00', '2019-04-25T16:30:00');
    });
  }

  //public
  let init  = function ($container) {
    SPA.Data.init('development');
    SPA.Chart.init($container);
    SPA.Calender.init($container);

    //
    _setDomElements($container);
    console.log(configMap.$domElements.$buttons);
    return true;
  };

  return {
    init: init,
    configMap: configMap
  };
})(jQuery);
