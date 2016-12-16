(function(){
'use strict';


angular
    .module('app')
    .directive('backgroundImageDirective', function () {
    //http://stackoverflow.com/a/24901629
        return function (scope, element, attrs) {
                        console.log(attrs.backgroundImageDirective);

            element.css({
                'background-image': 'url(' + attrs.backgroundImageDirective + ')',
                'background-repeat': 'no-repeat',
            });
        };
    });

angular
    .module('app')
    .controller('MetadataController', MetadataController);

    MetadataController.$incect = ['$http'];

    function MetadataController ($http){
        var md = this;
        md.metadata = null;
        //make private functions visible
        md.getAll = getAll;
        md.modifyMetadata = modifyMetadata;

        init();

        function init(){
            getAll();
        }

        function getAll(){
            var url = "/metadata/all";
            var eventsPromise = $http.get(url);
            eventsPromise.then(function(response){
               md.metadata = response.data[0]; //get first (only one) from list
            });
        }

        function modifyMetadata(){
            var url = "/metadata/modify/";
            $http.post(url).then(function(response){
                 md.metadata = response.data[0]; //get first (only one) from list
            });
        }
    }
})();