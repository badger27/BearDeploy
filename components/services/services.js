

'use strict';

    angular.module('services.menu', [])
        
        .factory('menuService', function() {
    var showMenu = false;

    return {
        showMenu: showMenu,
        state: function() {
            return showMenu;
        },
        toggle: function() {
            showMenu = !showMenu;
            return showMenu;
        },
        close: function() {
            showMenu = false;
            return showMenu;
        },
        open: function() {
            showMenu = true;
            return showMenu;
        }
    };
});
