SPA.Data = (function ($) {

  let configMap = {
    environment: "development",
    host: "https://localhost/api/",
    endPoints: {
      calender: "calender/",
      addAppointment: "calender/addAppointment",
      addRule: "calender/addRule"
    }
  }

  let init = function (environment) {
    configMap['environment'] = environment;
    return true;
  };

  let getCalender = function (startDate, endDate) {
    return new Promise(function (resolve, reject) {
            $.ajax({
                url: configMap.host + configMap.endPoints.calender + "?startDate="+startDate+"&endDate="+endDate,
                method: "GET",
                success: function (response) {
                    resolve( {
                        name: "load_calender",
                        response: response
                    })
                },
                error : function (error) {
                    reject( {
                        name: "load_calender",
                        response: error
                    })
                }
            })
        })
  }

  let addAppointment = function (startDate, endDate) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: configMap.host + configMap.endPoints.calender + "?startDate="+startDate+"&endDate="+endDate,
                method: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify({
                    "startDate" : startDate, "endDate" : endDate
                }),
                success: function (response) {
                    console.log(response);
                    if(response.type.toLowerCase() != "error"){
                      resolve({
                          name: "setmove",
                          response : response
                      })
                    }else{
                      reject(
                      SPA.Feedback.toonErrorBericht(response.message));
                    }
                },
                error : function (error) {
                  console.log("error: " + jqXHR.responseText);
                  SPA.Feedback.toonErrorBericht(error);
                    reject( {
                        name: "setmove",
                        response: error
                    })
                }
            })
        })
    }

  return {
    init: init,
    getCalender: getCalender,
    addAppointment: addAppointment
  };
})(jQuery);
