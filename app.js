var app = angular.module('noteMate', ['ngRoute']);

app.controller('MainCtrl', function($scope, Notes) {
  
  $scope.notes = Notes.entries;
  $scope.tempNote = {};
  var index;
  
  $scope.save = function() {
    Notes.save($scope.tempNote);
    $scope.clear();
  };
  
  $scope.del = function(idx) {
    Notes.del(idx);
  };
  
  $scope.edit = function(idx) {
    $scope.tempNote = angular.copy($scope.notes[idx]);
    index = idx;
  };
  
  $scope.clear = function() {
    $scope.tempNote = {};
  };
  
  $scope.saveEdit = function() {
    $scope.notes[index] = $scope.tempNote;
  };
  
  $scope.mouse = false;
  
});

app.service('Notes', function(){
    
  this.entries =  [
    {title: "Hey", desc: "This is a sample note. Add your own note by clicking the button below. :)"}];
  
  this.save = function(entry) {
    this.entries.push(entry);
  };
  
  this.del = function(idx) {
    this.entries.splice(idx, 1);
  };
  
});

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'notes.html'
    })
    .when('/notes', {
      templateUrl: 'notes.html'
    })
    .when('/new', {
      templateUrl: 'newnote.html'
    })
    .when('/edit', {
      templateUrl: 'editnote.html'
    })
    .otherwise({
      templateUrl: 'notes.html'
    });
});