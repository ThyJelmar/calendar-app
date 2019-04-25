SPA.Calender = (function ($) {
  //private
  let configMap = {
    $calendarContainer: null,
    $calendar: null,
    calendarMain: null
  }

  let _clickDateHandler  = function (info) {
    alert('Clicked on: ' + info.dateStr);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('Current view: ' + info.view.type);
  }

  let _clickEventHandler  = function (info) {
    alert('Event: ' + info.event.title);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('View: ' + info.view.type);
    info.el.style.borderColor = 'red';
  }

  let _reload = function () {
    configMap.calendarMain.render();
  }

  //public
  let init  = function ($calendarContainer) {
    configMap.$calendarContainer = $calendarContainer;
    configMap.$calendar = document.getElementById('calendar');
    let currentDate = new Date();
    configMap.calendarMain = new FullCalendar.Calendar(configMap.$calendar, {
      plugins: [ 'timeGrid', 'interaction' ],
      defaultView: 'timeGridDay',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      events: [
        {
          title: 'The Title',
          start: '2019-04-25T12:30:00',
          end: '2019-04-25T14:30:00'
        }
      ],
      nowIndicator: true,
      now: currentDate.toISOString(),
      dateClick: function(info) {
        _clickDateHandler(info);
      },
      eventClick: function(info) {
        _clickEventHandler(info);
      }
    });

    configMap.calendarMain.render();
    return true;
  };

  let addEvent  = function (title, start, end) {
    configMap.calendarMain.addEvent({
              title: 'dynamic event',
              start: start,
              end: end
            });
    _reload();
  }

  return {
    init: init,
    configMap: configMap,
    addEvent: addEvent
  };
})(jQuery);
