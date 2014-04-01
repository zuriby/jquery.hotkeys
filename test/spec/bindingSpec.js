// use http://jonathan.tang.name/files/js_keycode/test_keycode.html
// to discover key codes
describe("binding functions to key combinations", function() {

  beforeEach(function() {

    jQuery.hotkeys.options.filterTextInputs = true;

    this.cleanup = function($el) {
      $el.remove();
      $(document).unbind();
    };

    this.bindAndTriggerKeyEvent = function(keyAsText, keyCode, callback, keyModifiers) {

      var keyEvent = 'keyup';

      keyModifiers = _.extend( {ctrl: false, alt: false, shift: false, meta: false}, keyModifiers);

      $(document).bind(keyEvent, keyAsText, callback);
      var event = this.createKeyEvent(keyCode, keyEvent);

      event.altKey = !!keyModifiers.alt;
      event.ctrlKey = !!keyModifiers.ctrl;
      event.shiftKey = !!keyModifiers['shift'];
      event.metaKey = !!keyModifiers.meta;

      return $(document).trigger(event);
    };

    this.assertTextInputKeyEventTriggered = function (bindDirectly, expectToBeTriggered) {

      var keyEvent = 'keyup';
      var keyCode = '65';
      var keyAsText = 'a';

      var i = 0;

      _.each(this.textInputTypes, function(input_type) {
        var spy = sinon.spy();

        var $el = this.createInputEl(input_type, ++i);
        var $bindElement = bindDirectly ? $el : $(document);

        $bindElement.bind(keyEvent, keyAsText, spy);

        var event = this.createKeyEvent(keyCode);
        $el.trigger(event);

        expectToBeTriggered ? sinon.assert.calledOnce(spy) : sinon.assert.notCalled(spy);
        this.cleanup($el);

      }, this);
    };

    this.callbackFn = sinon.spy();

    this.fixture = $('<div id="container"></div>');
    $('body').append(this.fixture);

    this.createInputEl = function(type, id) {
      var $el = $('<input type="' + type + '" id="' + id + '"/>');
      this.fixture.append($el);
      return $el;
    };

    this.textInputTypes = jQuery.hotkeys.textAcceptingInputTypes;

    // creates new key event
    this.createKeyEvent = function(keyCode, keyEvent) {
      keyEvent = keyEvent || 'keyup';

      var event = jQuery.Event(keyEvent);
      event.keyCode = keyCode;
      event.which = keyCode;

      return event;
    };
 });

  afterEach(function(){
    this.cleanup(this.fixture);
  });

  it("should bind the 'return' key to the document and trigger the bound callback", function() {

    this.bindAndTriggerKeyEvent('return', '13', this.callbackFn);
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should bind the 'alt+s' keys and call the callback handler function", function() {

    this.bindAndTriggerKeyEvent('alt+a', '65', this.callbackFn, {alt: true});
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should bind the 'shift+pagedown' keys and call the callback handler function", function() {

    this.bindAndTriggerKeyEvent('shift+pagedown', '34', this.callbackFn, {shift: true});
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should bind the 'alt+shift+a' with a namespace, trigger the callback handler and unbind correctly", function() {

    var spy = sinon.spy();

    $(document).bind('keyup.a', 'alt+shift+a', spy);
    $(document).bind('keyup.b', 'alt+shift+a', spy);
    $(document).unbind('keyup.a'); // remove first binding, leaving only second

    this.bindAndTriggerKeyEvent('alt+shift+a', '65', this.callbackFn, {shift: true, alt: true});

    // ensure only second binding is still in effect
    sinon.assert.calledOnce(spy);
  });

  it("should bind the 'meta+a' keys and call the callback handler function", function() {

    this.bindAndTriggerKeyEvent('meta+a', '65', this.callbackFn, {meta: true});
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should bind the 'hyper+a' keys and call the callback handler function", function() {

    this.bindAndTriggerKeyEvent('hyper+a', '65', this.callbackFn, {meta: true, shift: true, alt: true, ctrl: true});
    sinon.assert.calledOnce(this.callbackFn);
  });

  it("should not trigger event handler callbacks bound to any standard input types if not bound directly", function() {

    this.assertTextInputKeyEventTriggered(false, false);
  });

  it("should bind and trigger events from a text input element if bound directly", function() {

    this.assertTextInputKeyEventTriggered(true, true);
  });

  it("should trigger event handler callbacks bound to any text input types if filter is turned off", function() {

    jQuery.hotkeys.options.filterTextInputs = false;
    this.assertTextInputKeyEventTriggered(false, true);
  });

});
