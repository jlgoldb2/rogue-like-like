// Generated by CoffeeScript 1.7.1
var rogueLikeLike;

rogueLikeLike = angular.module('rogueLikeLike', []);

// Generated by CoffeeScript 1.7.1
Crafty.c("Grid", {
  init: function() {
    this.attr({
      w: Game.grid.tile.width,
      h: Game.grid.tile.height
    });
  },
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return {
        x: this.x / Game.grid.tile.width,
        y: this.y / Game.grid.tile.height
      };
    } else {
      this.attr({
        x: x * Game.grid.tile.width,
        y: y * Game.grid.tile.height
      });
      return this;
    }
  }
});

Crafty.c("Actor", {
  init: function() {
    this.requires("2D, Canvas, Grid");
  }
});

Crafty.c("Tree", {
  init: function() {
    this.requires("Actor, Color, Solid").color("rgb(20, 10, 40)");
  }
});

Crafty.c("Bush", {
  init: function() {
    this.requires("Actor, Color, Solid").color("rgb(20, 185, 40)");
  }
});

Crafty.c("Agent", {
  init: function() {
    this.requires("Actor, Fourway, Color, Collision").fourway(4).stopOnSolids().color("rgb(20, 75, 40)");
  },
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
    return this;
  },
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      return this.y -= this._movement.y;
    }
  }
});

// Generated by CoffeeScript 1.7.1
var Game;

Game = {
  edgeColor: 'rgb(20, 125, 40)',
  tileColor: 'rgb(20, 185, 40)',
  grid: {
    width: 64,
    height: 64,
    tile: {
      width: 8,
      height: 8
    }
  },
  start: function() {
    Crafty.init(512, 512);
    Crafty.background('green');
    Game.placeAgent();
    return Game.generateTiles();
  },
  newTile: function(x, y) {
    return {
      y: Game.grid.tile.height * y,
      x: Game.grid.tile.width * x,
      w: Game.grid.tile.width,
      h: Game.grid.tile.height
    };
  },
  generateTiles: function() {
    var x, y, _i, _ref, _results;
    _results = [];
    for (x = _i = 0, _ref = Game.grid.width; 0 <= _ref ? _i < _ref : _i > _ref; x = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (y = _j = 0, _ref1 = Game.grid.height; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          if (Game.atEdge(x, y)) {
            _results1.push(Game.placeEdge(x, y));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      })());
    }
    return _results;
  },
  width: function() {
    return this.grid.width * this.grid.tile.width;
  },
  height: function() {
    return this.grid.height * this.grid.tile.height;
  },
  atEdge: function(x, y) {
    return x === 0 || y === 0 || x === Game.grid.width - 1 || y === Game.grid.height - 1;
  },
  placeAgent: function(x, y) {
    x = x || 5;
    y = y || 5;
    console.log("x, y of agent", x, y);
    return Crafty.e('Agent').at(x, y);
  },
  placeEdge: function(x, y) {
    return Crafty.e('Tree').at(x, y);
  },
  placeBush: function(x, y) {
    if (Math.random() < 0.06) {
      return Crafty.e('Bush').at(x, y);
    }
  },
  placeTile: function(x, y) {
    return Crafty.e('2D, Canvas, Color').attr(Game.newTile(x, y)).color(Game.tileColor);
  }
};

window.addEventListener('load', Game.start);


/*

class Tile
  constructor: (@x, @y)->
    @width = 8
    @height = 8
    @contains = []

class World
  constructor: (@xLimit, @yLimit)->
    @tiles = []


        @tiles.push new Tile x, y

  sprites:->
    grass1: [0,0]
    grass2: [1,0]
    grass3: [2,0]
    grass4: [3,0]
    flower: [0,1]
    bush1:  [0,2]
    bush2:  [1,2]
    player: [0,3]

  generateWorld:->

     *generate the grass along the x-axis
    i = 0
    while i < 25
       *generate the grass along the y-axis
      j = 0
      while j < 20

  generateGrass:(i, j)->
        grassType = Crafty.randRange(1, 4)
        Crafty.e("2D, Canvas, grass" + grassType).attr
          x: i * 16
          y: j * 16


         *1/50 chance of drawing a flower and only within the bushes
        if i > 0 and i < 24 and j > 0 and j < 19 and Crafty.randRange(0, 50) > 49
          Crafty.e("2D, DOM, flower, Animate").attr(
            x: i * 16
            y: j * 16
          ).animate("wind", 0, 1, 3).bind "enterframe", ->
            @animate "wind", 80  unless @isPlaying()
            return

        j++
      i++

     *create the bushes along the x-axis which will form the boundaries
    i = 0

    while i < 25
      Crafty.e("2D, Canvas, wall_top, bush" + Crafty.randRange(1, 2)).attr
        x: i * 16
        y: 0
        z: 2

      Crafty.e("2D, DOM, wall_bottom, bush" + Crafty.randRange(1, 2)).attr
        x: i * 16
        y: 304
        z: 2

      i++

     *create the bushes along the y-axis
     *we need to start one more and one less to not overlap the previous bushes
    i = 1

    while i < 19
      Crafty.e("2D, DOM, wall_left, bush" + Crafty.randRange(1, 2)).attr
        x: 0
        y: i * 16
        z: 2

      Crafty.e("2D, Canvas, wall_right, bush" + Crafty.randRange(1, 2)).attr
        x: 384
        y: i * 16
        z: 2

      i++
    return


window.onload = ->

   *start crafty


   *turn the sprite map into usable components

   *method to randomy generate the map
  world = new World 25, 20
  Crafty.init 400, 320
  Crafty.canvas()
  Crafty.scene "loading", ->

   *Crafty.sprite 16, "sprite.png",

   *the loading screen that will display while our assets load
     *load takes an array of assets and a callback when complete
     *Crafty.load ["sprite.png"], ->
       *Crafty.scene "main" #when everything is loaded, run the main scene
       *return


     *black background with some loading text
    Crafty.background "#000"
    Crafty.e("2D, DOM, Text").attr(
      w: 100
      h: 20
      x: 150
      y: 120
    ).text("Loading").css "text-align": "center"
    return


   *automatically play the loading scene
  Crafty.scene "loading"
  Crafty.scene "main", ->
    generateWorld()
    Crafty.c "CustomControls",
      __move:
        left: false
        right: false
        up: false
        down: false

      _speed: 3
      CustomControls: (speed) ->
        @_speed = speed  if speed
        move = @__move
        @bind "enterframe", ->

           *move the player in a direction depending on the booleans
           *only move the player in one direction at a time (up/down/left/right)
          if @isDown("RIGHT_ARROW")
            @x += @_speed
          else if @isDown("LEFT_ARROW")
            @x -= @_speed
          else if @isDown("UP_ARROW")
            @y -= @_speed
          else @y += @_speed  if @isDown("DOWN_ARROW")
          return

        this


     *create our player entity with some premade components
    player = Crafty.e("2D, Canvas, player, Controls, CustomControls, Animate, Collision").attr(
      x: 160
      y: 144
      z: 1
    ).CustomControls(1).animate("walk_left", 6, 3, 8).animate("walk_right", 9, 3, 11).animate("walk_up", 3, 3, 5).animate("walk_down", 0, 3, 2).bind("enterframe", (e) ->
      if @isDown("LEFT_ARROW")
        @stop().animate "walk_left", 10  unless @isPlaying("walk_left")
      else if @isDown("RIGHT_ARROW")
        @stop().animate "walk_right", 10  unless @isPlaying("walk_right")
      else if @isDown("UP_ARROW")
        @stop().animate "walk_up", 10  unless @isPlaying("walk_up")
      else @stop().animate "walk_down", 10  unless @isPlaying("walk_down")  if @isDown("DOWN_ARROW")
      return
    ).bind("keyup", (e) ->
      @stop()
      return
    ).collision().onHit("wall_left", ->
      @x += @_speed
      @stop()
      return
    ).onHit("wall_right", ->
      @x -= @_speed
      @stop()
      return
    ).onHit("wall_bottom", ->
      @y -= @_speed
      @stop()
      return
    ).onHit("wall_top", ->
      @y += @_speed
      @stop()
      return
    )
    return

  return
 */

// Generated by CoffeeScript 1.7.1
var h, mouseover, svg, translate, w, x, y, z;

translate = function(d) {
  return "translate(" + (d % x) * z + "," + Math.floor(d / x) * z + ")";
};

mouseover = function(d) {
  this.parentNode.appendChild(this);
  console.log("d", d, "this", this);
  d3.select(this).transition().duration(500).style("fill-opacity", 0).transition().delay(1000).style("fill-opacity", 100);
};

w = 512;

h = 512;

z = 8;

x = w / z;

y = h / z;

svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

svg.selectAll("rect").data(d3.range(x * y)).enter().append("rect").attr("transform", translate).attr("width", z).attr("height", z).style("fill", function(d) {
  return d3.rgb(55, 55, 55);
}).on("mouseover", mouseover);

// Generated by CoffeeScript 1.7.1
(function(ng, app) {
  'use strict';
  return app.factory('MessageFactory', function($log) {
    var MessageFactory;
    MessageFactory = (function() {
      MessageFactory.prototype.add = function(msg) {
        this.scope.$apply((function(_this) {
          return function() {
            _this.messages.push(msg);
          };
        })(this));
      };

      MessageFactory.prototype.setupWebsocketMethods = function() {
        this.ws.onopen = (function(_this) {
          return function() {
            $log.info('onopen called', 'CONNECT');
            _this.add('CONNECT');
          };
        })(this);
        this.ws.onclose = (function(_this) {
          return function() {
            $log.info('onclose called', 'DISCONNECT');
            _this.add('DISCONNECT');
          };
        })(this);
        this.ws.onmessage = (function(_this) {
          return function(event) {
            $log.info('onmessage called', 'MESSAGE: ' + event.data);
            _this.add('MESSAGE: ' + event.data);
          };
        })(this);
        this.ws.onerror = function(err) {
          $log.info('WEBSOCKET ERROR', err);
        };
      };

      function MessageFactory(scope) {
        this.scope = scope;
        this.messages = [];
        this.ws = new WebSocket('ws://localhost:8080/');
        this.setupWebsocketMethods();
        $log.info('MessageFactory constructed');
        return;
      }

      return MessageFactory;

    })();
    return MessageFactory;
  });
})(angular, rogueLikeLike);

// Generated by CoffeeScript 1.7.1
(function(ng, app) {
  'use strict';
  return app.controller('MainController', function($scope, boardConfig) {
    $scope.board = boardConfig;
  });
})(angular, rogueLikeLike);

// Generated by CoffeeScript 1.7.1
(function(ng, app) {
  'use strict';
  return app.controller('MessagesController', function($scope, $log, MessageFactory) {
    $scope.view = new MessageFactory($scope);
  });
})(angular, rogueLikeLike);
