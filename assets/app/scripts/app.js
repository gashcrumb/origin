'use strict';

/**
 * @ngdoc overview
 * @name openshiftConsole
 * @description
 * # openshiftConsole
 *
 * Main module of the application.
 */
angular
  .module('openshiftConsole', [
    'hawtioCore',
  ])
  .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/openshift', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsController'
      })
      .when('/openshift/project/:project', {
        templateUrl: 'views/project.html',
        controller: 'ProjectController'
      })      
      .when('/openshift/pods', {
        templateUrl: 'views/pods.html',
        controller: 'PodsController'
      });
      // avoid using otherwise in hawtio plugins
      /*
      .otherwise({
        redirectTo: '/'
      });
      */
      $locationProvider.html5Mode(false);
  }]).
  run(['viewRegistry', 'layoutFull', 'workspace', 'jolokia', function(viewRegistry, layoutFull, workspace, jolokia) {
    jolokia.stop();
    viewRegistry['openshift'] = layoutFull;
    // project tab
    workspace.topLevelTabs.push({
      id: 'openshift.projects',
      content: 'Projects',
      title: 'Projects',
      isValid: function(workspace) { return true; },
      href: function() { return '#/openshift'; },
      isActive: function(workspace) { return workspace.isLinkActive('openshift/project'); }
    });
    // pods tab
    workspace.topLevelTabs.push({
      id: 'openshift.pods',
      content: 'Pods',
      title: 'Pods',
      isValid: function(workspace) { return true; },
      href: function() { return '#/openshift/pods'; },
      isActive: function(workspace) { return workspace.isLinkActive('openshift/pods'); }
    });

  }]);

// load our plugin
hawtioPluginLoader.addModule('openshiftConsole');

// load third-party modules also at app bootstrap;
hawtioPluginLoader.addModule('ngCookies');
hawtioPluginLoader.addModule('ngTouch');
// doesn't load correctly
//hawtioPluginLoader.addModule('ngAnimate');
//hawtioPluginLoader.addModule('ngSanitize');


