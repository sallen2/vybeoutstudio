
// var express = require("express");
// var gridstack = require("gridstack");

$(function() {
    var options = {
        float: true,
        width: 4,
        height: 4,
        animate: true,
        alwaysShowResizeHandle: true,
        cellHeight: 110,
        verticalMargin: 18,
        horizontalMargin: 9,
        placeholderClass: 'grid-stack-placeholder',
        acceptWidgets: '.grid-stack-item'
    };

    $('.grid-stack').gridstack(_.defaults(options));

    var items = [{

    }];
    var i =0;
    $("#plusbtn").on("click", function() {
        console.log(i);
        items.push({x: i, y: 0, width: 1, height: 1});
        items.shift();

    $('.grid-stack').append(function addinst() {
        var grid = $(this).data('gridstack');
        _.each(items, function(node) {
            grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
                node.x, node.y, node.width, node.height);
        }, this);
    });
    i++;
        if (i===3){
            i=0;
        };
    });

});

