mainApp.controller('RegisterController', function($localStorage, $routeParams, $location) {
  var self = this;
  var temp = JSON.parse(localStorage.getItem('users')); 
  if (typeof temp === 'undefined' || !temp) {
    var users = [];
    localStorage.setItem('users', JSON.stringify(users));
  }
  // registering a new user
  self.save = function(username, password, passwordConf) {
    var users = [];
    users = JSON.parse(localStorage.getItem('users'));  
    var dupUsers = users.filter(function(element) {
      return element.username == username;
    });

    var usernameFlag = false;
    if (dupUsers.length > 0) {
      document.getElementById('errorRegisterUsername').className = "has-error has-feedback";
      document.getElementById("registerUsername").focus();
    }
    else {
      document.getElementById('errorRegisterUsername').className = "";
      usernameFlag = true;
    }

    var passwordFlag = false;
    if (password.length > 0 ) {
      document.getElementById('errorRegisterPassword').className = "";
      passwordFlag = true;
    }
    else {
      document.getElementById('errorRegisterPassword').className = "has-error has-feedback";
      document.getElementById("registerPassword").focus();
    }

    if (passwordFlag && password != passwordConf) {
      document.getElementById('errorRegisterPasswordConf').className = "has-error has-feedback";
      document.getElementById("registerPasswordConf").focus();
    }
    else {
      document.getElementById('errorRegisterPasswordConf').className = "";
    }


    if (usernameFlag && passwordFlag && passwordConf == password) {
      users.push({username: username, password: password});
      localStorage.setItem('users', JSON.stringify(users));
      self.users = JSON.parse(localStorage.getItem('users'));
      self.currentUser = username;
      localStorage.setItem('currentUser', self.currentUser);
      $location.url('/notes');
    }
  }

  // checking user's credentials before logging in.
  self.check = function(username, password) {
    var users = [];
    users = JSON.parse(localStorage.getItem('users'));
    var usersFiltered = users.filter(function(element) {
      return element.username == username && element.password == password;
    });
    if (usersFiltered.length == 1) {
        self.currentUser = username;
        localStorage.setItem('currentUser', self.currentUser);
        $location.url('/notes');
    }
    var usersFilteredUsername = JSON.parse(localStorage.getItem('users')).filter(function(element) {
      return element.username == username;
    });

    if (usersFilteredUsername.length == 0) {
      document.getElementById('errorLoginUsername').className = "has-error has-feedback";
      document.getElementById("inputUsername").focus();
    }
    else {
      if (usersFilteredUsername[0].password != password) {
        document.getElementById('errorLoginPassword').className = "has-error has-feedback";
      document.getElementById("inputPassword").focus();
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
  }

  
  self.users = JSON.parse(localStorage.getItem('users'));
});


