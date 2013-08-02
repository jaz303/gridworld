# gridworld

This is a small module that provides a representation and canvas renderer for 2D "gridworlds". Its intended use is for experimentation with game and AI algorithms such as pathfinding, line-of-sight, plus any number of grid-based board games.

Here's what it looks like:

![Gridworld](https://raw.github.com/jaz303/gridworld/master/screenshot.png)

## Installation

Browserify is recommended.

    $ npm install gridworld

## API

### Creating a world

    var GridWorld = require('gridworld').GridWorld;

#### new GridWorld(canvasEl, width, height, [options])

### Drawing the world

#### world.draw()

### Setting world attributes

#### world.setBackgroundColor(x, y, color)

#### world.setBlocked(x, y, blocked)

#### world.setAttribute(x, y, attr, value)

### Iterating

#### world.eachNeighbour(x, y, callback)

#### world.eachNeighbourNode(x, y, callback)

#### world.eachNode(callback)

### Event Handling

#### world.onclick = function(node) { /* ... */ }

## TODO

  * Add event handlers for dragging
  * Allow markers to be overlaid on cells