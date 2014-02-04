// use http://jonathan.tang.name/files/js_keycode/test_keycode.html
// to discover key codes
describe("binding functions to key combinations", function() {

  beforeEach(function() {

    this.callbackFn = function(e) {};

    spyOn(this, 'callbackFn');
    this.fixture = $('<div id="container"></div>');
    $('body').append(this.fixture);

    this.createInputEl = function(type, id) {
      this.fixture.append('<input type="' + type + '" id="' + id + '"/>');
    };

    this.text_input_types = ["text", "password", "number", "email", "url", "range", "date", "month", "week",
      "time", "datetime", "datetime-local", "search", "color", "tel"];

    // creates new key event
    this.createKeyEvent = function(keycode, namespace) {

      var eventName = "keyup";
      if (namespace) {
        eventName += '.' + namespace;
      }

      var event = jQuery.Event(eventName);
      event.keycode = keycode;
      event.which = keycode;

      return event;
    };
  });

  afterEach(function(){
    $('#container').remove();
    $(document).unbind();
  });

  it("should bind the 'return' hotkey event to the document and trigger the bound callback", function() {

    this.createInputEl('text', '01');
    $(document).bind('keyup', 'return', this.callbackFn);
    $(document).trigger(this.createKeyEvent('13'));
    expect(this.callbackFn).toHaveBeenCalled();
  });

  it("should bind 'Ctrl+a' and call the bound callback function", function() {

    this.createInputEl('text', '01');
    $(document).bind('keyup', 'Ctrl+a', this.callbackFn);

    var event = this.createKeyEvent('65');
    event.ctrlKey = true;
    $(document).trigger(event);
    expect(this.callbackFn).toHaveBeenCalled();
  });

  it("should bind to 'Alt+a' and call the bound callback function", function() {

    this.createInputEl('text', '01');
    $(document).bind('keyup', 'Alt+a', this.callbackFn);
    var event = this.createKeyEvent('65');
    event.altKey = true;
    $(document).trigger(event);
    expect(this.callbackFn).toHaveBeenCalled();
  });
});
