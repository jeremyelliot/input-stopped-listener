/* 
 * jQuery custom event that fires when an input has stopped changing 
 * for n milliseconds.
 * 
 * Useful for waiting until a user has stopped typing before doing 
 * something with their input.
 * 
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function ($) {

  $.fn.inputStoppedListener = function (options) {

    var self = $(this);
    var settings = {
      /**
       * @property {Integer} wait time in milliseconds before 
       * input is considered to have stopped.
       */
      wait: 300,
      /**
       * @property {String} eventType the type of the event that will be 
       * dispatched.
       * Change this if the event type clashes with another library.
       */
      eventType: "input:stopped",
      /**
       * @property {String} listenEvents Events that indicate input has changed.
       * The default is 'keyup change'. You might want to replace it with 
       * 'keyup change blur' for example.
       */
      listenEvents: "keyup change",
      /**
       * @property {String} inputSelector a CSS selector to filter Elements 
       * to which the listener should be attached.
       * The default is 'input' but you might want to use something
       * like 'input[type="text"]'
       */
      inputSelector: "input"

    };
    $.extend(settings, options);

    self.filter(settings.inputSelector).each(function () {

      var inputElement = $(this);

      inputElement.on(settings.listenEvents, function () {

        /* get the value of the input when a change happens */
        var inputValue = inputElement.val();

        /* 
         * after wait time we'll check to see if the input value has changed
         * since the change event
         */
        setTimeout(function () {

          // cancel event if input value has changed
          if (inputValue !== inputElement.val()) {
            return;
          }

          /* 
           * input has not changed for (wait) milliseconds so 
           * trigger the custom event
           */
          inputElement.trigger(settings.eventType);

        }, settings.wait);

      });

    });

    return self;

  };

})(jQuery);
