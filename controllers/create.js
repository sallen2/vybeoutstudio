
// var express = require("express");
// var gridstack = require("gridstack");

$( document ).ready(function() {
    $(".dropdown-menu").hide();});


    $(function() {
        var options = {
            float: true,
            width: 12,
            height: 4,
            animate: true,
            alwaysShowResizeHandle: true,
            cellHeight: 110,
            verticalMargin: 5,
            horizontalMargin: 5,
            placeholderClass: 'grid-stack-placeholder',
            acceptWidgets: '.grid-stack-item'
        };


    $('.grid-stack').gridstack(_.defaults(options));

    var items = [{

    }];
    var i =0;
    $("#plusbtn").on("click", function() {
        console.log(i);
        items.push({x: i, y: 0, width: 2, height: 1});
        items.shift();

    $('.grid-stack').append(function addinst() {
        var grid = $(this).data('gridstack');
        _.each(items, function(node) {
            grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
                node.x, node.y, node.width, node.height);
        }, this);
    });
        i++;
        i++;
        if (i===10){
            i=0;
        }
        $('.dropdown-menu').show();
    });

});

