'use non-strict'

class Person2{
    a = 5;
    constructor(){
        this.a = 6;
    }

    fun1(){
        console.log(this);
        fun2();
        function fun2(){
            console.log(this)
        }
    }
}

console.log(Person2.prototype)

let person2 = new Person2();

person2.fun1()
const newFun = person2.fun1;
newFun.call(this);
newFun();
function a(){
    console.log(this)

    this.b = function(){
        console.log(this);
        const c = () => {
            console.log(this);
            
        }
        c();

    }
    this.b()
}

console.log(a.prototype)

a()