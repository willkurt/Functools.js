/* Functools.js
   basic functional programming tools for JavaScript

   The intention of this library is more pedagogical than practical,
   where possible all operations will be implemented in the most
   purely functional way possible.  So for example 'map' will be
   implemented with recursion and not iteration (as it often is).
*/


/* Functional programming in JavaScript templates

   This are templates to deal with the fact that we just don't have
   macros in javascript   standard function
*/
//NAMESPACE.general_function = function(){
//    return(
//	//function body goes here
//    );
//};


//NAMESPACE.where_function = function(){
//    return(
//	(function(arg1,arg2,arg3){
//	    //function body goes here
//	};) (/*where*/
//	    /*arg1 is*/ /*<arg1 code>*/,
//	    /*arg2 is*/ /*<arg2 code>*/,
//	    /*arg3 is*/ /*<arg3 code>*/);
//
//    );
//};




var FUNCTOOLS = {};

/*
  primatives:
  ultimatley should include all the useful primiatives for scheme-
  car, cdr, cons, nil?, pair?, atom?, and maybe a cond equivalant

*/

//car
FUNCTOOLS.first = function (xs) {
    return xs[0];
};


//cdr
FUNCTOOLS.rest = function (xs) {
    return xs.slice(1);
};

//cons
FUNCTOOLS.build = function (x,xs) {
    return [x].concat(xs);
};

//nil?
FUNCTOOLS.empty = function (xs) {
    return xs.length === 0;
};


FUNCTOOLS.isList = function (xs) {
    return (xs instanceof Array);
};

/* Higher-order functions
   should include: map, foldl, foldr, filter, curry

*/

FUNCTOOLS.map = function (func,xs) {
    return (
	FUNCTOOLS.empty(xs) ? [] :
	FUNCTOOLS.build(func(FUNCTOOLS.first(xs)),
			FUNCTOOLS.map(func,FUNCTOOLS.rest(xs))));
	
};


FUNCTOOLS.filter = function (test,xs) {
    return (
	FUNCTOOLS.empty(xs) ? []:
	    test(FUNCTOOLS.first(xs)) ? FUNCTOOLS.build(FUNCTOOLS.first(xs),FUNCTOOLS.filter(test,FUNCTOOLS.rest(xs))) :
		FUNCTOOLS.filter(test,FUNCTOOLS.rest(xs)));	
};


/*
FUNCTOOLS.foldl is much more representative of how Haskell and my other fp languages
implement fold left.  Also in the discussion here: http://lists.racket-lang.org/users/archive/2010-August/041037.html  Matthias Felleisen (co-author of Little/Seasoned Schemer) backs up this version, so I'm going to stick with it ;)
*/
FUNCTOOLS.foldl = function (step, init, xs) {
    return(
	FUNCTOOLS.empty(xs) ? init:
	    FUNCTOOLS.foldl(step, step(init, FUNCTOOLS.first(xs)),FUNCTOOLS.rest(xs))
    );
};



/*
NOTE: fold left is not consistently definied between all functional languages
Haskell defines it quite differently (and it behaves different) than the one below.

FUNCTOOLS.fold_left is based on the Racket implementation of foldl
see discussion here for more info: http://lists.racket-lang.org/users/archive/2010-August/041037.html

*/
FUNCTOOLS.fold_left = function (step, init, xs) {
    return (
	FUNCTOOLS.empty(xs) ? init:
	    FUNCTOOLS.fold_left(step, step(FUNCTOOLS.first(xs),init),FUNCTOOLS.rest(xs))
    );
};


/*thankfully foldr is less complicated ;) */
FUNCTOOLS.foldr = function (step, init, xs) { 
    return (
	FUNCTOOLS.empty(xs) ? init:
	    step(FUNCTOOLS.first(xs),FUNCTOOLS.foldr(step, init, FUNCTOOLS.rest(xs)))
    );
};

/*
  FUNCTOOLS.flip reverses the order of arguments for a binary function
  this is not a traiditional function but it's actually quite useful when combined 
  with functions like foldl.  It shows the power of first class functions, lambdas, and closures.
*/
FUNCTOOLS.flip = function (func) {
    return function(b,a){
	return func(a,b);
    };
};

/*compose is simple but powerful and useful*/
FUNCTOOLS.compose = function (g,f) {
    return function(x){
	return g(f(x));
    };
};

/*this version will curry any number of arguments
also it's purely functional, well maybe not the array.prototype etc, and the lenght call
*/

FUNCTOOLS.curry = function(){
    return((function(arg_array,func,arg1){
	return(
	    arg_array.length === 2 ? FUNCTOOLS.curry_one(func,arg1) :
		FUNCTOOLS.curry.apply(FUNCTOOLS,FUNCTOOLS.build(
		    FUNCTOOLS.curry(func,arg1),
		    FUNCTOOLS.cddr(arg_array)))
		);
    })(/*where*/
	/*arg_array is*/Array.prototype.slice.call(arguments),
	/*func is*/arguments[0],
	/*arg1 is*/arguments[1]));
};

//curries just one argument
FUNCTOOLS.curry_one = function (f,a) {
    return(
	function(){
	    return(
		(function(args){
		    return f.apply(FUNCTOOLS, build(a,args));
		})(/*args =*/ Array.prototype.slice.call(arguments))
	    );
	}
    );
};

/*currying of one argument, original not purely functional version much more legable*/
FUNCTOOLS.curry1 = function (f,a) {
    return(
	function(){
	    var args = Array.prototype.slice.call(arguments); 
	    args.unshift(a);
	    return f.apply(this, args);
	}
    );
};

/* some functions on lists
   for educational reasons when possible these have been composed
   with the most reasonable higher order functions
   zip, flatten, length, reverse, last

*/



FUNCTOOLS.length = function (xs) {
    return (
	FUNCTOOLS.empty(xs) ? 0 :
	1 + FUNCTOOLS.length(FUNCTOOLS.rest(xs))
    );  
};

/* this version of reverse makes use of 2 of our other abstraction, foldl and rargs*/

FUNCTOOLS.reverse = function (xs) {
    return FUNCTOOLS.foldl(FUNCTOOLS.rargs(FUNCTOOLS.build),[],xs);
};



/* what is the last item in a list? well it's the first item of the reverse
   of the list
*/
FUNCTOOLS.last_compose = FUNCTOOLS.compose(FUNCTOOLS.first,FUNCTOOLS.reverse);

//this version is faster and more practical
FUNCTOOLS.last = function(xs){
    return(
	empty(FUNCTOOLS.rest(xs)) ? FUNCTOOLS.first(xs) :
	    FUNCTOOLS.last(FUNCTOOLS.rest(xs))
    );
};

FUNCTOOLS.allButLast = function(xs){
    return(
    empty(FUNCTOOLS.rest(xs)) ? [] :
	    FUNCTOOLS.build(FUNCTOOLS.first(xs),FUNCTOOLS.allButLast(FUNCTOOLS.rest(xs)))
    );
};
	   
FUNCTOOLS.cddr = FUNCTOOLS.compose(FUNCTOOLS.rest, FUNCTOOLS.rest);