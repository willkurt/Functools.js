/* this code is just for the examples */

/*test stuff*/
test1 = [1,2,3,4,5,6]

var isEven = function(x){return  x % 2 === 0};


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
    }
    
function spolsky_reduce(fn, a, init)
    {
        var s = init;
        for (i = 0; i < a.length; i++)
            s = fn( s, a[i] );
        return s;
    }