/*
  Functools uses a single global object to store all variables to reduce footprint
  in the global space.  This file just makes it easier to mess around

  also where appropriate I've also mapped the lisp equivailant
*/

var first = FUNCTOOLS.first;
var car = FUNCTOOLS.first;
var rest = FUNCTOOLS.rest;
var cdr = FUNCTOOLS.rest;
var build = FUNCTOOLS.build;
var cons = FUNCTOOLS.cons;
var empty = FUNCTOOLS.empty;
var map = FUNCTOOLS.map;
var foldl = FUNCTOOLS.foldl;
var filter = FUNCTOOLS.filter;

