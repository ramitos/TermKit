console.log('REQUIRED: COMMAND.CONTEXT');

/**
* Represents the system context for a command.
*/
var commandContext = module.exports = function (shell) {
  console.log('NEW COMMANDCONTEXT');
  var self = this;
  
  this.$element = this.$markup();
  
  this.$path = this.$element.find('.path');
  this.$user = this.$element.find('.user');
  
  this.shell = shell;
  
  this.path = shell.environment.cwd;
  this.user = shell.environment.user;
  
  // State
  Object.defineProperty(this, 'path', {
    get: function () {
      return self._path;
    },
    set: function (path) {
      self._path = path;
      self.updateElement();
    }
  });
  
  // State
  Object.defineProperty(this, 'user', {
    get: function () {
      return self._user;
    },
    set: function (user) {
      self._user = user;
      self.updateElement();
    }
  });
};

commandContext.prototype.$markup = function () {
  // Return active markup for this command.
  var that = this;
  var $command = $('<div class="termkitCommandContext"><div class="path"></div><div class="user"></div></div>').data('controller', this);
  return $command;
};

commandContext.prototype.updateElement = function () {
  // Update the element's markup in response to internal changes.
  this.$element.data('controller', this);
  
  var path = misc.escapeText(this.path || '').split('/');
  path.shift();
  this.$path.html('<span>' + path.join('</span><span>') + '</span>');
  this.$user.html(misc.escapeText(this.user || ''));
};