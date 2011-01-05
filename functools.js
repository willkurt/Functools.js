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




var Functools = {};

/*
  primatives:
  ultimatley should include all the useful primiatives for scheme-
  car, cdr, cons, nil?, pair?, atom?, and maybe a cond equivalant

*/

//car
Functools.first = function (xs) {
    return xs[0];
};


//cdr
Functools.rest = function (xs) {
    return xs.slice(1);
};

//cons
Functools.build = function (x,xs) {
    return [x].concat(xs);
};

//nil?
Functools.empty = function (xs) {
    return xs.length === 0;
};


Functools.isList = function (xs) {
    return (xs instanceof Array);
};

/* Higher-order functions
   should include: map, foldl, foldr, filter, curry

*/

Functools.map = function (func,xs) {
    return (
	Functools.empty(xs) ? [] :
	Functools.build(func(Functools.first(xs)),
			Functools.map(func,Functools.rest(xs))));
	
};


Functools.filter = function (test,xs) {
    return (
	Functools.empty(xs) ? []:
	    test(Functools.first(xs)) ? Functools.build(Functools.first(xs),Functools.filter(test,Functools.rest(xs))) :
		Functools.filter(test,Functools.rest(xs)));	
};


/*
Functools.foldl is much more representative of how Haskell and my other fp languages
implement fold left.  Also in the discussion here: http://lists.racket-lang.org/users/archive/2010-August/041037.html  Matthias Felleisen (co-author of Little/Seasoned Schemer) backs up this version, so I'm going to stick with it ;)
*/
Functools.foldl = function (step, init, xs) {
    return(
	Functools.empty(xs) ? init:
	    Functools.foldl(step, step(init, Functools.first(xs)),Functools.rest(xs))
    );
};



/*
NOTE: fold left is not consistently definied between all functional languages
Haskell defines it quite differently (and it behaves different) than the one below.

Functools.fold_left is based on the Racket implementation of foldl
see discussion here for more info: http://lists.racket-lang.org/users/archive/2010-August/041037.html

*/
Functools.fold_left = function (step, init, xs) {
    return (
	Functools.empty(xs) ? init:
	    Functools.fold_left(step, step(Functools.first(xs),init),Functools.rest(xs))
    );
};


/*thankfully foldr is less complicated ;) */
Functools.foldr = function (step, init, xs) { 
    return (
	Functools.empty(xs) ? init:
	    step(Functools.first(xs),Functools.foldr(step, init, Functools.rest(xs)))
    );
};

/*
  Functools.flip reverses the order of arguments for a binary function
  this is not a traiditional function but it's actually quite useful when combined 
  with functions like foldl.  It shows the power of first class functions, lambdas, and closures.
*/
Functools.flip = function (func) {
    return function(b,a){
	return func(a,b);
    };
};

/*compose is simple but powerful and useful*/
Functools.compose = function (g,f) {
    return function(x){
	return g(f(x));
    };
};

/*this version will curry any number of arguments
also it's purely functional, well maybe not the array.prototype etc, and the lenght call
*/

Functools.curry = function(){
    return((function(arg_array,func,arg1){
	return(
	    arg_array.length === 2 ? Functools.curry_one(func,arg1) :
		Functools.curry.apply(Functools,Functools.build(
		    Functools.curry(func,arg1),
		    Functools.cddr(arg_array)))
		);
    })(/*where*/
	/*arg_array is*/Array.prototype.slice.call(arguments),
	/*func is*/arguments[0],
	/*arg1 is*/arguments[1]));
};

//curries just one argument
Functools.curry_one = function (f,a) {
    return(
	function(){
	    return(
		(function(args){
		    return f.apply(Functools, build(a,args));
		})(/*args =*/ Array.prototype.slice.call(arguments))
	    );
	}
    );
};

/*currying of one argument, original not purely functional version much more legable*/
Functools.curry1 = function (f,a) {
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



Functools.length = function (xs) {
    return (
	Functools.empty(xs) ? 0 :
	1 + Functools.length(Functools.rest(xs))
    );  
};

/* this version of reverse makes use of 2 of our other abstraction, foldl and flips*/

Functools.reverse = function (xs) {
    return Functools.foldl(Functools.flip(Functools.build),[],xs);
};



/* what is the last item in a list? well it's the first item of the reverse
   of the list
*/
Functools.last_compose = Functools.compose(Functools.first,Functools.reverse);

//this version is faster and more practical
Functools.last = function(xs){
    return(
	empty(Functools.rest(xs)) ? Functools.first(xs) :
	    Functools.last(Functools.rest(xs))
    );
};

Functools.allButLast = function(xs){
    return(
    empty(Functools.rest(xs)) ? [] :
	    Functools.build(Functools.first(xs),Functools.allButLast(Functools.rest(xs)))
    );
};
	   
Functools.cddr = Functools.compose(Functools.rest, Fpunctools.rest);
Functools.cadr = Functools.compose(Functools.first, Functools.rest);

