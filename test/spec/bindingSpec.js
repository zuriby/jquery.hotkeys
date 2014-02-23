// use http://jonathan.tang.name/files/js_keycode/test_keycode.html
// to discover key codes
describe("binding functions to key combinations", function() {

  beforeEach(function() {

    this.callbackFn = sinon.spy();

    this.fixture = $('<div id="container"></div>');
    $('body').append(this.fixture);

    this.createInputEl = function(type, id) {
      var $el = $('<input type="' + type + '" id="' + id + '"/>');
      this.fixture.append($el);
      return $el;
    };

    this.text_input_types = ["text", "password", "number", "email", "url", "range", "date", "month", "week",
      "time", "datetime", "datetime-local", "search", "color", "tel"];

    // creates new key event
    this.createKeyUpEvent = function(keyCode) {

      var event = jQuery.Event('keyup');
      event.keyCode = keyCode;
      event.which = keyCode;

      return event;
    };
 });

  afterEach(function(){
    this.fixture.remove();
    $(document).unbind();
  });

  it("should bind the 'return' key to the document and trigger the bound callback", function() {

    $(document).bind('keyup', 'return', this.callbackFn);

    var event = this.createKeyUpEvent(13);
    $(document).trigger(event);
    sinon.assert.calledOnce(this.callbackFn);

  });

  it("should bind the 'alt+s' keys and call the callback handler function", function() {

    $(document).bind('keyup', 'alt+a', this.callbackFn);
    var event = this.createKeyUpEvent(65);
    event.altKey = true;
    $(document).trigger(event);
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should bind the 'shift+pagedown' keys and call the callback handler function", function() {

    $(document).bind('keyup', 'shift+pagedown', this.callbackFn);
    var event = this.createKeyUpEvent(34);
    event.shiftKey = true;
    $(document).trigger(event);
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should bind the 'alt+shift+a' with a namespace, trigger the callback handler and unbind correctly", function() {

    var spy = sinon.spy();

    $(document).bind('keyup.a', 'alt+shift+a', spy);
    $(document).bind('keyup.b', 'alt+shift+a', spy);
    $(document).unbind('keyup.a'); // remove first binding, leaving only second

    var event = this.createKeyUpEvent(65);
    event.altKey = true;
    event.shiftKey = true;
    $(document).trigger(event);

    // ensure only second binding is still in effect
    sinon.assert.calledOnce(spy);
  });

  it("should bind the 'meta+a' keys and call the callback handler function", function() {

    $(document).bind('keyup', 'meta+a', this.callbackFn);
    var event = this.createKeyUpEvent(65);
    event.metaKey = true;
    $(document).trigger(event);
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should bind the 'hyper+a' keys and call the callback handler function", function() {

    $(document).bind('keyup', 'hyper+a', this.callbackFn);
    var event = this.createKeyUpEvent(65);
    event.shiftKey = true, event.metaKey = true, event.altKey = true, event.ctrlKey = true;
    $(document).trigger(event);
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should not trigger event handler callbacks bound to any standard input types if not bound directly", function() {

    var i = 0;

    _.each(this.text_input_types, function(input_type) {
      var spy = sinon.spy();

      var $el = this.createInputEl(input_type, ++i);
      $(document).bind('keyup', 'a', spy);

      var event = this.createKeyUpEvent('65');
      $el.trigger(event);

      sinon.assert.notCalled(spy);
      $(document).unbind();
      $el.remove();

    }, this);
  });

  it("should bind and trigger events from an input element if bound directly", function() {

    var i = 0;

    _.each(this.text_input_types, function(input_type) {
      var spy = sinon.spy();

      var $el = this.createInputEl(input_type, ++i);
      $el.bind('keyup', 'a', spy);

      var event = this.createKeyUpEvent('65');
      $el.trigger(event);

      sinon.assert.calledOnce(spy);
      $el.remove();

    }, this);
  });
});
