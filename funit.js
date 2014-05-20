/************************************************/
/** FaceUnit | A unit test tool for javascript
/** facetothefate@gmail.com
/** @auther face
/** @version 0.9.0
/** @since 2014-1-1
/** @link 
/************************************************/
var version = "0.9.0";
/*****************************************/
// ready for code editor use ACE editor
/*****************************************/
var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

/*****************************************/
// console
/*****************************************/
var Console = function(){
    var consoleTag=document.getElementById("console");
    var autoBottom=true;
    this.setAutoBottom = function(sw){
        autoBottom=sw;
    }
    this.getConsole= function(){
        return consoleTag;
    }
    this.getDate=function(){
          var d,s;
          d = new Date();
          s = d.getFullYear() + "-";             //取年份
          s = s + (d.getMonth() + 1) + "-";//取月份
          s += d.getDate() + " ";         //取日期
          s += d.getHours() + ":";       //取小时
          s += d.getMinutes() + ":";    //取分
          s += d.getSeconds();         //取秒
          return(s);  
    }
    this.i=this.log=function(s){
        consoleTag.innerHTML+='['+this.getDate()+']:&nbsp<span class="i">'+s+'</span><br>';
        if(autoBottom) consoleTag.scrollTop = consoleTag.scrollHeight;
        return this;
    }
    this.print=function(s){
        consoleTag.innerHTML+='['+this.getDate()+']:&nbsp<span class="i">'+s+'</span>';
        consoleTag.scrollTop = consoleTag.scrollHeight;
        return this;
    }
    this.w=function(s){
        consoleTag.innerHTML+='['+this.getDate()+']:&nbsp<span class="w">Warning:'+s+'</span><br>';
        if(autoBottom) consoleTag.scrollTop = consoleTag.scrollHeight;
        return this;
    }
    this.e=function(s){
        consoleTag.innerHTML+='['+this.getDate()+']:&nbsp<span class="e">Error:'+s+'</span><br>';
        if(autoBottom) consoleTag.scrollTop = consoleTag.scrollHeight;
        return this;
    }
    this.s=function(s){
        consoleTag.innerHTML+='['+this.getDate()+']:&nbsp<span class="s">Success:'+s+'</span><br>';
        if(autoBottom) consoleTag.scrollTop = consoleTag.scrollHeight;
        return this;
    }
    this.cls=function(){
        consoleTag.innerHTML="";
        return this;
    }
}
var console=new Console();

/*****************************************/
// test cases
/*****************************************/
var TestCase = function(){
    var testCaseTag=document.getElementById('testCaseField');
    var windowFrame=document.createElement('div');
    this.getTestCaseTag=function(){
        return testCaseTag;
    }
    this.showAddWindow=function(){
        windowFrame.innerHTML='<a id="closeBtn" class="btn btn-small" href="javascript:void(0);" onclick="t.closeWindow()">X</a><table><tr><td>Test Case:</td><td><input class="input" id="testCaseValue" type="text"></td></tr><tr><td></td><td>Equals<!--<select class="input" id="testCaseAssert"><option class="option" value="Equals">Equals</option><option class="option" value="Bigger">Bigger than</option><option class="option" value="Smaller">Smaller than</option></select>--></td></tr><tr><td>Result:</td><td><input class="input" id="testCaseResult" type="text"></td></tr></table><div class="popupFunctionBar"><button onclick="t.add()" class="btn btn-small">Add</button><button onclick="t.closeWindow();" class="btn btn-small">close</button></div>';
        windowFrame.setAttribute("class","popup");
        document.body.appendChild(windowFrame);
    }
    this.closeWindow=function(){
        document.body.removeChild(windowFrame);
    }
    this.add=function(){
        var value=document.getElementById('testCaseValue').value;
        var assert="Equals"//document.getElementById('testCaseAssert').value;
        var result=document.getElementById('testCaseResult').value;
        var newTest=document.createElement('tr');
            newTest.innerHTML='<td></td><td><input class="input" type="text" value="'+value+'"></td><td><input type="hidden" value="'+assert+'">'+assert+'</td><td><input class="input" type="text" value="'+result+'"></td><td><button class="btn btn-small" onclick="t.remove(this)">X</button></td>';
        testCaseTag.appendChild(newTest);
    }
    this.remove=function(delButton){
        delButton.parentElement.parentElement.parentElement.removeChild(delButton.parentElement.parentElement);
    }
    this.getTestCaseList=function(){
        var list=new Array();
        for(var i=0;i<testCaseTag.children.length;i++){
            var item=JSON.parse('{"test":"'+testCaseTag.children[i].cells[1].children[0].value+'","result":"'+testCaseTag.children[i].cells[3].children[0].value+'"}');
            list.push(item);
        }
        return list;
    }
    this.makeProcessing=function(trNumber){
        testCaseTag.children[trNumber].cells[0].style.backgroundColor="yellow";
        testCaseTag.children[trNumber].cells[0].innerHTML="&rarr;";
    }
    this.makePassed=function(trNumber){
        testCaseTag.children[trNumber].cells[0].style.backgroundColor="green";
        testCaseTag.children[trNumber].cells[0].innerHTML="&radic;";
    }
    this.makeFaild=function(trNumber){
        testCaseTag.children[trNumber].cells[0].style.backgroundColor="red";
        testCaseTag.children[trNumber].cells[0].innerHTML="X";
    }
}
var t=new TestCase();

/*****************************************/
// EntryPoint use for running the script
/*****************************************/
var EntryPoint = function(){
    var runFunction;
    this.tryAsASingleFunction=function(){
        try{
            eval("var inputFuntion="+editor.getValue());
        }catch(e){
            
        }
    }
    this.runAll=function(){
        var input=editor.getValue();
        try{
            eval(input);
        }catch(e){
            console.e(e.message);
        }
    }
}
var entryPoint= new EntryPoint();

/*****************************************/
// Assertion
/*****************************************/
var Assertion = function(){
    var isFunction=function(fn) { 
        return !!fn && !fn.nodeName && fn.constructor != String 
        && fn.constructor != RegExp 
        && fn.constructor != Array 
        && /function/i.test( fn + "" ); 
    }
    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    //a more powerful typeof
    var is = function (obj,type) {
        return (type === "Null" && obj === null) ||
        (type === "Undefined" && obj === void 0 ) ||
        (type === "Number" && isFinite(obj)) ||
         Object.prototype.toString.call(obj).slice(8,-1) === type;
    }
    this.runFunction=function(fn,__cases,__result){
        if(!isFunction(fn)){
            console.e("Input is not a function");
        }
        try{
            var arguments=JSON.parse(__cases);
            var start = new Date().getTime();
            var result = fn.apply(this,arguments);
            var end =new Date().getTime();
            console.i("---------------------------------------------------------").i("Test "+__cases+" finised in "+(end-start)+"ms");
            return result;
        }
        catch(e){
            console.e("Parsing test cases error: "+e.message);        
        }
    }
    this.equal=function(fn,__cases,__result){
        var result=this.runFunction(fn,__cases,__result);
        try{
            __result=JSON.parse(__result);
        }catch(e){
            console.e("Parsing result error: "+e.message);        
        }
        //Different type, different equal
        if((is(result,"Number")||is(result,"String")||is(result,"Boolean"))&&result===__result||
           is(result,"Object")&&result.equal(__result)||
           is(result,"Array")&&result.toString===__result.toString||
           is(result,"Null")&&is(__result,"Null")||
           is(result,"Undefined")&&is(__result,"Undefined")
           
          ){
            console.s("Test "+__cases+" passed.");
            return true;
        }else{
            console.e("Test "+__cases+" faild. Expected: "+__result+" Output: "+result);
            return false;
        }
    }
    //is these assertions ever usefull ? Maybe added in the following versions;
    //this.bigger=function(fn,__cases,__result){}
    //this.smaller=function(fn,__cases,__result){}
    this.useTestCasesList=function(fn){
        var list=t.getTestCaseList();
        for(var i=0;i<list.length;i++){
            t.makeProcessing(i);
            var r=this.equal(fn,list[i].test,list[i].result);
            if(r) t.makePassed(i);
            else t.makeFaild(i);
        }
    }
}
var assertion=new Assertion();

//initialization something useful
var addButton=document.getElementById('testCaseAdd');
addButton.onclick=t.showAddWindow;
var runAllButton=document.getElementById('scriptRun');
runAllButton.onclick=entryPoint.runAll;
console.i('Face unit test tool @ Version '+ version).i('ready.');
