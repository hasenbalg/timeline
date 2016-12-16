(function(){
'use strict';

angular
    .module('app')
    .controller('EventsController', EventsController);

    EventsController.$incect = ['$http'];

    function EventsController ($http){
        var vm = this;
        vm.events =[];

        //make private functions visible

        vm.getAll = getAll;
        vm.deleteEvent = deleteEvent;
        vm.modifyEvent = modifyEvent;

        init();

        function init(){
            getAll();
        }

        function getAll(){
            var url = "/event/all";
            var eventsPromise = $http.get(url);
            eventsPromise.then(function(response){
               vm.events = response.data;
            });
        }

        function deleteEvent(id){
            var url = "/event/delete/" + id;
            var eventsPromise = $http.get(url);
                        eventsPromise.then(function(response){
                           vm.events = response.data;
                        });
        }

        function modifyEvent(){
            var url = "/event/modify/";
            $http.post(url).then(function(response){
                 vm.events = response.data;
            });
        }
    }
})();