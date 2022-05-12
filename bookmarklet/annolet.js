
var json_data;          

getJsondata();

function getJsondata()
{
   disableAllLinks() // disables all the links in a page
   var url = "https://gl.githack.com/MSSoumya/serena-demo/-/raw/main/bookmarklet/config.json"; 
   $.getJSON(url, function() {
       console.log("Request to config file success..!");
   })
   .done(function(data, jqxhr, textStatus) {
       json_data = data;
       console.log("Retrieved the config data successfully..!");
       annoletContainer();
       addClickevents();
    })
   .fail(function(jqxhr, textStatus, error) {
       var err = textStatus + ", " + error;
       console.log("Request to config file failed: " + ", " + err);
    })
   .always(function() {
       console.log("Request to config_file complete");
    });
}

function annoletContainer(){
   //appending a div(annolet container) to body element of a webpage.
   var body = document.getElementsByTagName("body")[0];
   container = document.createElement("div");
   container.id = "annolet-container";
   container.className = "anno";
   body.appendChild(container);

   //appending a CSS stylesheet into head element of a webpage, which is used to stylize the annolet container.
   var linktag = document.createElement("link");
   linktag.rel = "stylesheet";
   linktag.type = "text/css";
   linktag.href = json_data.css["annolet"]; 
   document.getElementsByTagName('head')[0].appendChild(linktag);

   //injecting html code
   container.innerHTML = "<h4 id='annolet-header' class='anno'>SeRena</h4>"+
   "<ul id='annolet-tools-menu' class='anno'>"+
        "<li class='annolet-menu-item anno' title='Select the choices from the dropdown, select the currency on page and then click on the button to translate the selected currency'>"+
            "<button id='change-currency' class='annolet-menu-sub-item anno' >Convert Currency</button>"+"<br>"+
            "<select class='select-tools-menu anno' id='select-from-currency'>"+
                "<option class='anno' value='USD' >USD</option>"+
                "<option class='anno' value='INR' >INR</option>"+
                "<option class='anno' value='EUR' >EUR</option>"+
            "</select>"+
            "<select class='select-tools-menu anno' id='select-to-currency'>"+
                "<option class='anno' value='INR' >INR</option>"+
                "<option class='anno' value='USD' >USD</option>"+
                "<option class='anno' value='EUR' >EUR</option>"+
            "</select>"+
        "</li>"+
        "<li class='annolet-menu-item anno' title='Select the choices from the dropdown, select the units on page and then click on the button to translate the selected unit'>"+
            "<button id='change-measurement' class='annolet-menu-sub-item anno' >Convert Measurements</button>"+"<br>"+
            "<select class='select-tools-menu anno' id='select-from-measure'>"+
                "<option class='anno' value='km'>kilometers</option>"+
                "<option class='anno' value='mi'>Miles</option>"+
                "<option class='anno' value='ft'>foot</option>"+
            "</select>"+
            "<select class='select-tools-menu anno' id='select-to-measure'>"+
                "<option class='anno' value='mi'>Miles</option>"+
                "<option class='anno' value='km'>kilometers</option>"+
                "<option class='anno' value='ft'>foot</option>"+
            "</select>"+
        "</li>"+
        "<li class='annolet-menu-item anno' title='Select the choice of format from the dropdown, select the num on page and then click on a button to format the selected num'>"+
            "<button id='change-num-sys' class='annolet-menu-sub-item anno' >Number Format</button>"+"<br>"+
            "<select class='select-tools-menu anno' id='select-num-sys'>"+
                "<option class='anno' value='en-IN' >Indian</option>"+
                "<option class='anno' value='en-US' >US</option>"+
                "<option class='anno' value='en-GB'>British</option>"+
                "<option class='anno' value='ko-KR'>Korean</option>"+
                "<option class='anno' value='ar-EG'>Arabic</option>"+
            "</select>"+
        "</li>"+
   "</ul>";

    setTimeout(function() {
        alert("Page is ready to Renarrate");
    }, 1000);    
}

// this functionality runs on loading the bookmarklet
function disableAllLinks(){
   var anchors = document.getElementsByTagName("a");
   for( var i = 0, max = anchors.length; i < max; i++ ) {
       anchors[i].onclick = function() {return(false);};
   }
}

// this functionality runs on loading the bookmarklet
function disableCss(){
   // loops through all the external stylesheets and disables it
   var style_sheets = document.styleSheets;
   for( var i = 0, max = style_sheets.length; i < max; i++ ) {
      if(style_sheets[i].href === json_data.css["annolet"] ) {
         style_sheets[i].disabled = false;
      }
      else {
         style_sheets[i].disabled = true;
      }
   }
    
   // loops through all the body elems and disables the inline css
   var body_elems = document.body.getElementsByTagName("*");
   for( var i = 0, max = body_elems.length; i < max; i++ ) {
      var style_attr = $(body_elems[i]).attr("style");
      if(style_attr) {
         $(body_elems[i].tagName).removeAttr("style");
      }
   }

   // loops through all the head elems and disables the internal css
   var head_elems = document.head.getElementsByTagName("*");
   for( var i = 0, max = head_elems.length; i < max; i++ ) {
       if(head_elems[i].tagName === "STYLE") {
          $(head_elems[i].tagName).remove();
       }
   }
}

// Function for the phonetics button
function phoneticsTrans(){
   var current = getSelection();
   if(current !== "") {
      var url = json_data.api["phonetics-trans"];
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(JSON.stringify( {"sentence" : current.toString()} ));
      xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
           var res = this.responseText;
           console.log(res);
           if(res === current.toString()) {
             alert("Phonetics for the selected word is not available");
           }
           else {
             replaceText(res);
           }
        }
      }
   }
   else if(current === "") {
      alert("Select the word and click on 'Phonetics' button");
   }
}

// Function for the button Convert Currency
function currencyTrans() {
   var from_cur = document.getElementById('select-from-currency').value;
   var to_cur = document.getElementById('select-to-currency').value;
   var current = getSelectedText();
   var sel_text = current.replace(/\,/g,"");
   if(current !== "") {
      if(isNaN(sel_text) === false) {
         var url = json_data.api["currency-conv"];
         var currency = parseFloat(sel_text);
         var xhr = new XMLHttpRequest();
         xhr.open("POST", url, true);
         xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
         xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
         xhr.send(JSON.stringify( { "currency_amount" : currency, "from_cur" : from_cur, "to_cur" : to_cur } ));
         xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
               var res = this.responseText; 
               replaceText(res);
            }
         }
      }
      else if(isNaN(sel_text) === true) {
         alert("select the currency");
      }
    }
    else if(current === "") {
       alert("Select the currency and click on 'Convert Currency' button");
    }
}

// Function for the button Convert measurements
function convertUnits(){
   var from_unit = document.getElementById('select-from-measure').value;
   var to_unit = document.getElementById('select-to-measure').value;
   var current = getSelectedText();
   var sel_text = current.replace(/\,/g,"");
   if(current !== "") {
      if(isNaN(sel_text) == false) {
         // var url = "//10.4.12.35:5000/measurement-conversion";
         var url = json_data.api["unit-conversion"]
         var units = parseFloat(sel_text);
         var xhr = new XMLHttpRequest();
         xhr.open("POST", url, true);
         xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
         xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
         xhr.send(JSON.stringify({ "measurement_num": units, "from_measure": from_unit, "to_measure": to_unit }));
         xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                var res = this.responseText;
                replaceText(res);                    
            }
         }
      }
      else if(isNaN(sel_text) === true) {
         alert("select units");
      }
   }
   else if(current === "") {
      alert("Select units and click on 'Convert Measurements' button");
   }
}


// Function to replace the highlighted text based on the operation performed by the user.
function replaceText(replacementText) {
   var sel, range;
   if (window.getSelection) {
       sel = window.getSelection();
       if (sel.rangeCount) {
           range = sel.getRangeAt(0);
           range.deleteContents();
           range.insertNode(document.createTextNode(replacementText));
       }
   } else if (document.selection && document.selection.createRange) {
       range = document.selection.createRange();
       range.text = replacementText;
   }
   highlightContent(window.getSelection());
}

function getSelectedText(){ 
   if(window.getSelection){
      return window.getSelection().toString(); 
   } 
   else if(document.getSelection){
      return document.getSelection(); 
   } 
   else if(document.selection){
      return document.selection.createRange().text; 
   }
   return ''; 
}

function highlightContent(sel_text) {      
   var span = document.createElement("span");
   span.textContent = sel_text;
   span.style.backgroundColor = "yellow";
   span.id = "highlighted";
   span.className = "anno";
   var range = sel_text.getRangeAt(0);
   range.deleteContents();
   range.insertNode(span);
}

function addClickevents(){
   document.getElementById('disable-css').addEventListener('click', function() {
      disableCss()
   }, false);
   document.getElementById('phonetics-btn').addEventListener('click', function(event) {
      phoneticsTrans()
   }, false);
   document.getElementById('change-currency').addEventListener('click', function() {
      currencyTrans()
   }, false);
   document.getElementById('change-measurement').addEventListener('click', function() {
      convertUnits()
   }, false);
}