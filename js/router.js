'use strict';
let scriptList = [];

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var r = this.routes;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName, route.scriptName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName, route.scriptName);
                }
            }
        }
    },
    goToRoute: function (htmlName, scriptName) {
        (function(scope) { 
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                    let event = new Event("open" + htmlName);
                    document.dispatchEvent(event); 
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
            
            if(scriptName){                
                const script = document.createElement("script");
                script.src = 'js/' + scriptName; 
                if(!scriptList.includes(scriptName)){                    
                    scriptList.push(scriptName);
                    document.body.appendChild(script);
                }
            }  
                     
        })(this);
    }
};