/*
  Functools uses a single global object to store all variables to reduce footprint
  in the global space.  This file just makes it easier to mess around

  also where appropriate I've also mapped the lisp equivailant
  if you plan do use functools.js for everyday programming
  use this file to map to more convenient globals
*/

var first = FUNCTOOLS.first;
var car = FUNCTOOLS.first;
var rest = FUNCTOOLS.rest;
var cdr = FUNCTOOLS.rest;
var build = FUNCTOOLS.build;
var cons = FUNCTOOLS.build;
var empty = FUNCTOOLS.empty;
var map = FUNCTOOLS.map;
var foldl = FUNCTOOLS.foldl;
var fold_left = FUNCTOOLS.fold_left;
var reduce = FUNCTOOLS.foldl;
var foldr = FUNCTOOLS.foldr;
var filter = FUNCTOOLS.filter;
var flip = FUNCTOOLS.flip;
var reverse = FUNCTOOLS.reverse;
var compose = FUNCTOOLS.compose;
var last = FUNCTOOLS.last