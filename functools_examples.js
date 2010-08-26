/* this code is just for the examples */

/*test stuff*/
test1 = [1,2,3,4,5,6]

var isEven = function(x){return  x % 2 === 0};
var subtract = function(a,b){return a - b};

/*
 from http://www.joelonsoftware.com/items/2006/08/01.html 

    Joel Spolsky's very imperative example of map and reduce, not ideal
    for fp

*/

function spolsky_map(fn, a)
    {
        for (i = 0; i < a.length; i++)
        {
            a[i] = fn(a[i]);
        }
    };
    
function spolsky_reduce(fn, a, init)
    {
        var s = init;
        for (i = 0; i < a.length; i++)
            s = fn( s, a[i] );
        return s;
    };



/*playing around*/
var linear_combination = function(a,b,x,y){
    return(
	(a*x)+(b*x)
    );
};




/*how lets and wheres work*/

var add_doubles = function(a,b){
    return(function(double_a,double_b){
	return(double_a+double_b)
    })(a*2,
       b*2)
    };



var add_three = function(a,b,c){
    return a+b+c;
};



var makeAdder = function(val){
    return(
	function(x){
	    return val+x;
	    }
    );
};

var add = function(x,y){
    return x+y;
};

var sum = function (xs) {
    return foldl(add,0,xs);
};

var square = function(x){
    return x*x;
};

var mean = function (xs){
    return(sum(xs)/flength(xs));
};

var deviations = function (xs) {
    var m = mean(xs);//we can remove this if we wanted
    return  map(function(x){return x-m;},xs);
};

var squareDeviations = function(xs){
    return  map(square,deviations(xs));
};

var sumSqDeviations = compose(sum,squareDeviations);

var sd = function(xs){
    return  Math.sqrt( (sumSqDeviations(xs)/(flength(xs)-1)));
};

var list3 = function(a,b,c){
    return [a,b,c];
};