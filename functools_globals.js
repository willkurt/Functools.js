/*
  Functools uses a single global object to store all variables to reduce footprint
  in the global space.  This file just makes it easier to mess around

  also where appropriate I've also mapped the lisp equivailant
  if you plan do use functools.js for everyday programming
  use this file to map to more convenient globals
*/

var first = Functools.first;
var car = Functools.first;
var rest = Functools.rest;
var cdr = Functools.rest;
var build = Functools.build;
var cons = Functools.build;
var empty = Functools.empty;
var map = Functools.map;
var foldl = Functools.foldl;
var fold_left = Functools.fold_left;
var reduce = Functools.foldl;
var foldr = Functools.foldr;
var filter = Functools.filter;
var flip = Functools.flip;
var reverse = Functools.reverse;
var compose = Functools.compose;
var last = Functools.last;
var curry = Functools.curry;
var flength = Functools.length;
var isList = Functools.isList;
var flatten = Functools.flatten;