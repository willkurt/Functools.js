/* Functools.js
   basic functional programming tools for JavaScript

   The intention of this library is more pedagogical than practical,
   where possible all operations will be implemented in the most
   purely functional way possible.  So for example 'map' will be
   implemented with recursion and not iteration (as it often is).
*/


var FUNCTOOLS = {};

/*
  primatives:
  ultimatley should include all the useful primiatives for scheme-
  car, cdr, cons, nil?, pair?, atom?, and maybe a cond equivalant

*/

//car
FUNCTOOLS.first = function(xs){
    return xs[0];
};


//cdr
FUNCTOOLS.rest = function(xs){
    return xs.slice(1);
};

//cons
FUNCTOOLS.build = function(x,xs){
    return [x].concat(xs);
};

//nil?
FUNCTOOLS.empty = function(xs){
    return xs.length === 0;
};




/* Higher-order functions
   should include: map, foldl, foldr, filter, curry

*/

FUNCTOOLS.map = function(func,xs){
    return(
	FUNCTOOLS.empty(xs) ? [] :
	FUNCTOOLS.build(func(FUNCTOOLS.first(xs)),
			FUNCTOOLS.map(func,FUNCTOOLS.rest(xs))));
	
};


FUNCTOOLS.filter = function(test,xs){
    return(
	FUNCTOOLS.empty(xs) ? []:
	    test(FUNCTOOLS.first(xs)) ? FUNCTOOLS.build(FUNCTOOLS.first(xs),FUNCTOOLS.filter(test,FUNCTOOLS.rest(xs))) :
		FUNCTOOLS.filter(test,FUNCTOOLS.rest(xs)));	
};


FUNCTOOLS.foldl = function(step, init, xs){
    return(
	FUNCTOOLS.empty(xs) ? init:
	    FUNCTOOLS.foldl(step, step(FUNCTOOLS.first(xs),init),FUNCTOOLS.rest(xs))
    );
}

/* some functions on lists
   zip, flatten, length, reverse

*/


FUNCTOOLS.length = function(xs){
    return(
	FUNCTOOLS.empty(xs) ? 0 :
	1 + FUNCTOOLS.length(FUNCTOOLS.rest(xs)));  
};
