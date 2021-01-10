var a = {b :{ c: 'hello'}}
var b = {...a};

b.b.c = "world"//changes both the children property
console.log(b.b.c, a.b.c);

// in order to avoid this , we copy deeply using ->
var c = JSON.parse(JSON.stringify(a))

c.b.c = "vineet"
console.log(c.b.c, a.b.c)//dint change though
