'use strict';
/*
 Usage:
 <div data-cdk-idea-tree data-ng-model="idea" data-reply="reply()"></div>
 */
angular.module(_DIRECTIVES_)
.directive("cdkIdeaTree", function($compile) {
    return {
        restrict: "AE",
        scope: {
          idea: '=ngModel',
          hideReply: '='
        },
        templateUrl:'public/views/idea/cdk-idea-tree.html',
        compile: function(tElement, tAttr) {
        //We are removing the contents/innerHTML from the element we are going to be applying the 
        //directive to and saving it to adding it below to the $compile call as the template
          var contents = tElement.contents().remove();
          var compiledContents;
          return function(scope, iElement, iAttr) {
              if(!compiledContents) {
                  compiledContents = $compile(contents);
              }
          //Call the link function to link the given scope and
          //a Clone Attach Function, http://docs.angularjs.org/api/ng.$compile :
          // "Calling the linking function returns the element of the template. 
          //    It is either the original element passed in, 
          //    or the clone of the element if the cloneAttachFn is provided."                
              compiledContents(scope, function(clone, scope) {
            //Appending the cloned template to the instance element, "iElement", 
            //on which the directive is to used.                  
              iElement.append(clone); 
            });
          };
        },
        controller: 'IdeaController'//'IdeaTreeController'
    };
});