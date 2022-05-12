var annolet_template =
    "<h4 id='annolet-header' class='anno'>Renarration</h4>"+
    "<ul id='annolet-tools-menu' class='anno'>"+
       "<li id='disable_list' class='annolet-menu-item anno'>"+
           "<button id='disable-css' class='annolet-menu-sub-item anno' title='Click on the button to view the page without css'>No CSS</button>"+
       "</li>"+
       "<li id='activezapper_list' class='annolet-menu-item anno'  title='Click on the button first and then point out the elements to remove the clutter'>"+
           "<button id='activate-zapper' class='annolet-menu-sub-item anno' >Activate Zapper</button>"+
       "</li>"+
       "<li id='deactivezapper_list' class='annolet-menu-item anno'>"+
           "<button id='deactivate-zapper' class='annolet-menu-sub-item anno' title='Click on the button to deactivate the zapper'>Deactivate Zapper</button>"+
       "</li>"+
       "<li id='modify_list' class='annolet-menu-item anno'  title='Click on the button first and then modify the content on a page' >"+
           "<button id='modify-content' class='annolet-menu-sub-item anno' >Modify Content</button>"+
       "</li>"+
       "<li id='highlighter_list' class='annolet-menu-item anno'  title='Select the text first and then click on the button to highlight the text' >"+
           "<button id='highlighter-btn' class='annolet-menu-sub-item anno' >Highlighter</button>"+
       "</li>"+
       "<li id='phonetics_list' class='annolet-menu-item anno'  title='Select the word to get translated and then click on the button'>"+
           "<button id='phonetics-btn' class='annolet-menu-sub-item anno' >Phonetics</button>"+
       "</li>"+
       "<li class='annolet-menu-item anno' title='Select the choice from the dropdown, select the text and then click on the button to get the translation for the selected text'>"+
           "<button id='trans-text' class='annolet-menu-sub-item anno' >Translate Text</button>"+"<br>"+
           "<select class='select-tools-menu anno' id='select-from-lang'>"+
               "<option value='en' class='anno'>English</option>"+
               "<option value='hi' class='anno'>Hindi</option>"+
               "<option value='te' class='anno'>Telugu</option>"+
               "<option value='ta' class='anno'>Tamil</option>"+
               "<option value='ml' class='anno'>Malayalam</option>"+
               "<option value='ja' class='anno'>Japanese</option>"+
               "<option value='zh' class='anno'>Chinese</option>"+
           "</select>"+
           "<select class='select-tools-menu anno' id='select-to-lang'>"+
               "<option value='zh' class='anno'>Chinese</option>"+
               "<option value='ja' class='anno'>Japanese</option>"+
               "<option value='ml' class='anno'>Malayalam</option>"+
               "<option value='ta' class='anno'>Tamil</option>"+
               "<option value='te' class='anno'>Telugu</option>"+
               "<option value='hi' class='anno'>Hindi</option>"+
               "<option value='en' class='anno'>English</option>"+
           "</select>"+
        "</li>"+
        "<li class='annolet-menu-item anno' title='Select the theme and then click on button'>"+
            "<button id='change-theme' class='annolet-menu-sub-item anno'>Switch CSS</button>"+"<br>"+
            "<select class='select-tools-menu anno' id='select-theme'>"+
                "<option value='switch1' class='anno'>Theme1</option>"+
                "<option value='switch2' class='anno'>Theme2</option>"+
            "</select>"+
        "</li>"+
        "<li class='annolet-menu-item anno' title='Click on the button to view the links/images/text on a page by selecting the option from the dropdown'>"+
            "<button id='change-content' class='annolet-menu-sub-item anno'>Page Stripper</button>"+"<br>"+
            "<select class='select-tools-menu anno' id='select-content'>"+
                "<option class='anno' value='show-links' >Show Links</option>"+
                "<option class='anno' value='show-images' >Show Images</option>"+
                "<option class='anno' value='show-text'>Show Text</option>"+
            "</select>"+
        "</li>"+
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
        "<li class='annolet-menu-item anno' title='Select the choice of format from the dropdown, select the date on page and then click on a button to format the selected date'>"+
            "<button id='change-date-format' class='annolet-menu-sub-item anno' >Date Format</button>"+"<br>"+
            "<select class='select-tools-menu anno' id='select-date-format'>"+
                "<option class='anno' value='en-IN' >Indian</option>"+
                "<option class='anno' value='en-US' >US</option>"+
                "<option class='anno' value='en-GB'>British</option>"+
                "<option class='anno' value='ko-KR'>Korean</option>"+
                "<option class='anno' value='ar-EG'>Arabic</option>"+
            "</select>"+
        "</li>"+
        "<li class='annolet-menu-item anno' title='Select the choice of visibility from dropdown and then click on the button to increase/decrease the font of a page'>"+
            "<button id='change-font' class='annolet-menu-sub-item anno' >Visibility</button>"+"<br>"+
            "<select class='select-tools-menu anno' id='select-font'>"+
                "<option class='anno' value='increase-font' >Increase Font</option>"+
                "<option class='anno' value='decrease-font' >Decrease Font</option>"+
            "</select>"+
        "</li>"+
   "</ul>";
