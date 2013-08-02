function Node(x, y, backgroundColor) {
	this.x = x;
  this.y = y;
  this.backgroundColor = backgroundColor || null;
  this.blocked = false;
}

function GridWorld(canvas, width, height, options) {

  options = options || {};

	this.canvas  = canvas;
  this.ctx     = canvas.getContext('2d');
	this.width   = Math.floor(width);
	this.height  = Math.floor(height);

  this.sx = options.startX || 0;
  this.sy = options.startY || 0;

  this.cellSize = options.cellSize || 32;
  this.cellSpacing = options.cellSpacing || 1;
  this.drawBorder = !!options.drawBorder;
  this.borderColor = options.borderColor || 'black';
  this.backgroundColor = options.backgroundColor || 'white';

  this.nodes = [];
  for (var j = 0; j < this.height; ++j) {
    for (var i = 0; i < this.width; ++i) {
      this.nodes.push(new Node(i, j, null));
    }
  }

  //
  // Event handling
  // TODO: support dragging

  var self = this;

  this.onclick = options.onclick;

  function p2n(x, y) {
    console.log(x, y);
  }

  canvas.addEventListener('click', function(evt) {
    
    if (!self.onclick)
      return;
    
    var node = p2n(evt.offsetX, evt.offsetY);
    
    if (node)
      self.onclick(node);
  
  });

}

GridWorld.prototype = {
	draw: function() {

    var csz   = this.cellSize,
        csp   = this.cellSpacing
        ctx   = this.ctx,
        w     = this.width,
        h     = this.height,
        ix    = 0;

    var badj  = this.drawBorder ? this.cellSpacing : -this.cellSpacing,
        cadj  = this.drawBorder ? this.cellSpacing : 0;

    ctx.fillStyle = this.borderColor;
    ctx.fillRect(this.sx,
                 this.sy,
                 ((csz + csp) * this.width) + badj,
                 ((csz + csp) * this.height) + badj);

    var cy = this.sy + cadj;
    for (var j = 0; j < this.height; ++j) {
      var cx = this.sx + cadj;
      for (var i = 0; i < this.width; ++i) {
        var n = this.nodes[ix++];
        ctx.fillStyle = n.backgroundColor || this.backgroundColor;
        ctx.fillRect(cx, cy, csz, csz);
        cx += csz + csp;
      }
      cy += csz + csp;
    }

	},

  setBackgroundColor: function(x, y, color) {
    this.nodes[(y * this.width) + x].backgroundColor = color || null;
  },

  setBlocked: function(x, y, blocked) {
    this.nodes[(y * this.width) + x].blocked = !!blocked;
  },

  setAttribute: function(x, y, key, value) {
    this.nodes[(y * this.width) + x][key] = value;
  },

  eachNeighbour: function(x, y, callback) {
    
    var w   = this.width,
        h   = this.height,
        ns  = this.nodes,
        ix  = (y * w) + x;

    if (x > 0   && !ns[ix-1].blocked) callback(x-1, y);
    if (x < w-1 && !ns[ix+1].blocked) callback(x+1, y);
    if (y > 0   && !ns[ix-w].blocked) callback(x, y-1);
    if (y < h-1 && !ns[ix+w].blocked) callback(x, y+1);

  },

  eachNeighbourNode: function(node, callback) {

    var x   = node.x,
        y   = node.y,
        w   = this.width,
        h   = this.height,
        ns  = this.nodes,
        ix  = (y * w) + h;

    if (x > 0   && !ns[ix-1].blocked) callback(ns[ix-1]);
    if (x < w-1 && !ns[ix+1].blocked) callback(ns[ix+1]);
    if (y > 0   && !ns[ix-w].blocked) callback(ns[ix-w]);
    if (y < h-1 && !ns[ix+w].blocked) callback(ns[ix+w]);
  
  },

  eachNode: function(callback) {
    this.nodes.forEach(callback);
  }

};

module.exports.GridWorld = GridWorld;