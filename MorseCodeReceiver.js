/*
 * Morse Code receiver app information:
 *
 * 
 * Function analyseRed():
 *      checks the number of consecutive ON screens and determines 
 *      which symbol to output to the string "messageMorse". 
 *      An if condition decides which symbol to use
 *
 *
 * Function analyseBlue(): 
 *      checks the number of consecutive OFF screens and determines 
 *      which symbol to output to the string "messageMorse". 
 *      An if condition decides which symbol to use
 *
 *
 * Function translate() : function holds our javascript lookup table that is called upon 
 *      when translating the morse code signals held inside the string literal "messageMorse"
 *
 *
 * Function messageFinished(): stops the capturing process
 *      You can call this function to let the app know that 
 *      the end-of-transmission signal has been received.
 *
 *
 * Function restartButtonClicked(): clears the message field by emptying the string literal "realMessage"
 *        and also clears any variables that represent state 
 *        thereby preparing the app to begin reading a new message
 *
 *
 * -------------------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *	 This will be a textarea element where you can display
 *	 the recieved message for the user.
 * 
 * --------------------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *	 This is a button element.  When clicked this should 
 *	 cause your app to reset its state and begin recieving
 *	 a new message.
 *
 *
 * Purpose: This file is designed to allow easy change as well as viewing
 * of the morse code receiver application code
 * Team: 55
 * Authors: Toby Sherr, Paola Pousa, Harry Nicholls 
 * Last modified 10 April 2016
 */



/*
 * This function is called once per unit of time with camera image data.
 * 
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *		 Each pixel is representing by four consecutive integer values for 
 *		 the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *		 instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is 
 *		 an 'on' (red) signal.
 */
var messageFieldRef = document.getElementById("messageField");
var countRed=0;
var countBlue=0
var j=0;
var messageOnOff=[];
var messageMorse="";
var realMessage="";
var morseEnconding=[];
messageOnOff[0]==false;

function decodeCameraImage(data)
{
    document.getElementById("restartButton").onclick = restartButtonClicked;

    var red,blue;
    red=blue=0;
    for (var i=0; i<data.length-2; i=i+4)
    {
        if(data[i]>data[i+2])
        {
            red++;
        }
        if(data[i]<data[i+2])
        { 
            blue++;
        }
    }

    var beforeState=messageOnOff[j];
	
    if(red>blue)
    {	
        j++;
        messageOnOff[j]=true;
        var appState = messageOnOff[j];
        
        //using an if condition to compare the states of consecutive screens, so when the state changes you can tell how many units of times the previous state lasted for
        
        if(appState!==beforeState) 
        {
	       analyseBlue();  //it means that a sequence of blue screens was detected before this red screen, and it is necessary to analyse to recognize the character
        }
	
        countRed++; //a red screen was detected so countRed = countRed+1
        return true;  
        
    }
    
    else            
    {	
	   j++;
	   messageOnOff[j]=false;
	   var appState = messageOnOff[j];
       
        if(appState!=beforeState)
	       {
	       analyseRed();  //it means that a sequence of red screens was detected before this blue screen, and it is necessary to analyse to recognize the character
           }
        
	   countBlue++;    //a blue screen was detected so we countBlue = countBlue+1
       return false;
    }	
  
    function analyseRed()
    {
	   if(countRed >= 3)
       {
            messageMorse += "_";	
       }		
	
       else 
           if(countRed >= 1 && countRed <= 2)
            {	
                messageMorse += ".";	           
            }
        
    countRed=0; //reset the countRed for the variable to be able to count the number os red screens and recognize the Morse character again
    }
   
    function analyseBlue()
    {
		if(countBlue >= 7)
        {
            messageMorse+="| |";	//is implicit that a Inter-word space have Inter-character spaces ("|") around it
            translate();
        }
        
        else 
            if(countBlue >=3 && countBlue <= 6)
            {
				messageMorse+="|";	//to define a Inter-character space, we used "|"
				translate();
            }
        
    countBlue=0; //reset the countBlue for the variable to be able to count the number os blue screens and recognize the Morse space again
    }
				    
	function translate()
	{						
        var signal = 
        {
           "":"",	
           "._":    "A",
           "_...":  "B",
           "_._.":  "C",
           "_..":   "D",
           ".":     "E",
           ".._.":  "F",
           "__.":   "G",
           "....":  "H",
           "..":    "I",
           ".___":  "J",
           "_._":   "K",
           "._..":  "L",
           "__":    "M",
           "_.":    "N",
           "___":   "O",
           ".__.":  "P",    
           "__._":  "Q",
           "._.":   "R",
           "...":   "S",
           "_":     "T",
           ".._":   "U",
           "..._":  "V",
           ".__":   "W",
           "_.._":  "X",
           "_.__":  "Y",
           "__..":  "Z",
           "_____": "0",
           ".____": "1",
           "..___": "2",
           "...__": "3",
           "...._": "4",
           ".....": "5",
           "_....": "6",
           "__...": "7",
           "___..": "8",
           "____.": "9",
           "_.__.": "(",
           "_.__._":")",
           "._.._.":"\"",
           "..._.._":"$",
           ".____.":"\\",
           "_.._.": "/",
           "._._.": "+",
           "___...":":",
           "._._._":".",
           "__..__":",",
           "..__..":"?",
           "_...._":"-",
           ".__._.":"@",
           "_..._": "=",
           "..__._":"_",  
           "_._.__":"!",
           "._._": "\n",
           "..._._":"endTrans",
            " ":" ",    //if an Inter-word space was detected, it will be translated into a Inter-word space as well
        }		
			
        
        morseEnconding= messageMorse.split("|"); // an array called morseEnconding is created, and each element of the array is defined spliting the Inter-character space defined by "|" and the Inter-word space defined by "| |" of the string messageMorse
			
		
		for(var p=0; p<morseEnconding.length; p++)
		{     
            if(signal[morseEnconding[p]]==="endTrans")
            {
                messageFinished();
            }
		    
            else 
            {
                realMessage += signal[morseEnconding[p]]; //Translating the Morse code using our signal lookup table and adding to realMessage
            }
		}
        messageFieldRef.innerHTML = realMessage;
        
		messageMorse="";
		morseEnconding=[];
        
	}

    function restartButtonClicked()
    {
        realMessage="";
        messageMorse=""
        countRed=0;
        countBlue=0
        j=0;
        messageOnOff=[];
        morseEnconding=[];
        messageOnOff[0]==false;

    }
		
}
