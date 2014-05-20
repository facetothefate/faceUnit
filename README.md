faceUnit
========

faceUnit is A web based JavaScript unit test tool, the frist version came out in 3 days.
*Auther: Zhifei Fang
*Email: facetothefate@gmail.com

#Get start
We start this a simple "Hello world!"<br>
Input following script, and then click `Run` button.

```javascript
console.i("Hello world!");
```
You can also use :

```javascript
console.log("Hello world!");
```

`console.i()` can output an information mssage at the console pannel.<br>
You can also use `console.w()` to output a warning mssage.<br>
You can use `console.e()` to output an error mssage.<br>
Too many lines in console pannel ?<br>
You can use `console.cls()` to clean up the console.
These functions all support chain calling.

```javascript
console.cls().i("This is an information").w("This is an warning").e("This is an error");
```

#Use assertion

## Run one testcase
An example to test a function

```javascript
function test(a,b){
  return a+b;
} 
assertion.equal(test,"[1,2]",3);
```
`assertion.equal(__function,__testcase,__result)`<br>
*`__function` is the function you want to test
*`__testcase` is the a JSON string. It should contaion your testcase. It should always be an Array.
*`__result` is the expected result. 

If the test passed, you will find the passed information output in console.

##Use testcase list on the left.
You can add many different testcases use the testcast list tool on the left. The testcase should always be a JSON string.
We can modify the example above a little to use the test cast list

```javascript
function test(a,b){
  return a+b;
} 
assertion.useTestCasesList(test);
```
