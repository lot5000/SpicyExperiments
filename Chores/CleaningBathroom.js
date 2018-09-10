sendMessage("CleaningBathroom.js"); //debug message
setVar("CleaningTimeTemp", 0);
sendMessage("CleaningTimeTemp = " + getVar("CleaningTimeTemp", 0)); //debug message

setTempVar("BathroomVacuumFloorTemp", true);
setTempVar("BathroomWipeTemp", true);
setTempVar("BathroomWashFloorTemp", true);

// *** Kinky cleaning ***
//run("Chores/KinkyCleaning.js");

prepareCleaningBathroom();
startCleaningBathroom();
endCleaningBathroom();

function prepareCleaningBathroom(){

sendMessage("prepareCleaningBathroom function"); //debug message

if (getVar("BathroomAverageSet", false)){
    BathroomAverageSet();
}

sendMessage("Let's take a look at your bathroom:");
lockImages();
showPicture("Images/Spicy/Home/*.jpg");
let answer = getInput("Analyse your Mistress' home plan, find the bathroom and report when done");
unlockImages();
sendMessage("Ok then...");
areYouReady();
}

function startCleaningBathroom(){
// *** Start cleaning ***
//sendMessage("Okay then");
  sendMessage("You can go ahead and start with the cleaning.. ");
//sendMessage("Report when you're done cleaning ");


bathroomVacuum()
bathroomWipe();
bathroomWash()

//setTimer();

}

function bathroomVacuum(){
    setTempVar("BathroomVacuumFloorTemp", true);
    /*sendMessage(random("It's time to vacuum!","Time for you to vacuum the floor",
                                        "Lets have you do some vacuuming!","Time to clean clean clean %GNMGrin%",
                                        "Work work work all day - clean all night %GNMLol%"));
    sendMessage(random("You need to vacuum the floor","You have to vacuum the floor",
                                        "You gotta go ahead and vacuum the floor"));*/

    sendMessage("Soon you will " + random("mop the floors","lick the floors","wash the floors"));
    sendMessage("But " + random("first","before that","before we get to that","just before"));
    sendMessage(random("They need to be vacuumed","You have to vacuum them first","You gotta go ahead and vacuum them.."));
    sendMessage(random("Fetch","Find and get","Retrieve") + " your vacuum cleaner");
    sleep(10);
    areYouReady();
    setTimer();
}

function bathroomWipe(){
    setTempVar("BathroomWipeTemp", true);

    sendMessage(random("It's time to clean the toilet and whatelse",
                       "Time for you to clean the toilet and whatelse",
                       "Lets have you do some toiletscrubbing and whatelse"));
    sendMessage(random("Fetch","Find and get","Retrieve") + " whatever you need to scrub the toilet and whatever needs to be cleaned");

    sleep(10);
    areYouReady();
    setTimer();
}


function bathroomWash(){
    setTempVar("BathroomWashFloorTemp", true);

    sendMessage(random("It's time to mop the floors!","Time for you to mop the floors",
                        "Lets have you do some floor mopping!","Time to mop mop mop %GNMGrin%",
                        "Work work work all day - mop all night %GNMLol%"));

    sendMessage(random("Fetch","Find and get","Retrieve") + " whatever you need to mop the floor");
    sleep(10);
    areYouReady();
    setTimer();

}




function areYouReady(){

    playAudio("Audio/Spicy/QuestionAndShortWords/Ready/*.mp3");

    let answer = getInput(random("ready?","are you ready?","are you ready bitch?",
                                "are you ready %SlaveName%?",
                                "Are you ready %GNMSlut%?", "Are you ready slave?"));
    if (answer.isLike("yes"))
    {
        sendMessage("%GNMGood%");
    }
    else if (answer.isLike("no"))
    {
        sendMessage("Hurry..");
        sleep(10);
        areYouReady();
        return;
    }
    else {
    sendMessage(" %GNMYesOrNo%");
    areYouReady();
    return;
    }
}

// With GodDragon additions to make it work
function setTimer(){
    //sendMessage('Starting timer');
    let StopWatch = Java.type("org.apache.commons.lang3.time.StopWatch");
    let watch = new StopWatch();

    watch.start(); //instead of @CountVar[CleaningTimeTemp]
    sendMessage('I am starting watch at ' + parseInt(watch.getTime()/1000, 10) + ' seconds'); //debug message

    let gamesOffered = randomInteger(0, 1);
    // let gamesOffered = 1;
    switch(gamesOffered) {
    		case 0:
                //sendMessage("Launching BellGame1() - go to corner"); //debug message
                //sleep(randomInteger(400, 800));
                sleep(3);
                watch.suspend(); //stops timer before launching the game
                sendMessage('Pausing your cleaning time for my short game at ' + parseInt(watch.getTime()/1000, 10)
                + ' seconds'); //debug message
                cornerExercise(); //was BellGame1 -> corner()
                sendMessage('Resuming your cleaning time with currently ' + parseInt(watch.getTime()/1000, 10) +
                'seconds'); //debug message
                watch.resume(); //continues to count cleaning time
                sleep(3);
                break;
            case 1:
                sendMessage("Launching BellGame2() - typing exercise"); //debug message
                //sleep(randomInteger(20, 120));
                watch.suspend(); //stops timer before launching the game
                sendMessage('Pausing your cleaning time for my short game at ' + parseInt(watch.getTime()/1000, 10) +
                'seconds'); //debug message
                typingExercise(); // was BellGame2 -> typing
                sendMessage('Resuming your cleaning time with currently ' + parseInt(watch.getTime()/1000, 10) + ' seconds'); //debug message
                watch.resume(); //continues to count cleaning time
                break;
            default:
                sendMessage("Something went wrong, no game today");//debug message
                break;
    }

    reportDone();
    watch.stop(); //stops timer before calculating final result and giving rewards
    let secondsPassed = parseInt(watch.getTime()/1000, 10)
    sendMessage('This cleaning took you: ' + secondsPassed + ' seconds'); //debug message
    setVar("CleaningTimeTemp", getVar("CleaningTimeTemp", 0) + secondsPassed);
    sendMessage("CleaningTimeTemp = " + getVar("CleaningTimeTemp", 0)); //debug message
}

function reportDone() {

 let answer = sendInput("Report to me when you are done...");
        while(true) {
            if(answer.isLike("done", "yes", "ready", "report")) {
                sendMessage("So you're done.. ");
                break;
            } else {
                sendMessage("If you aren't done yet don't bother me");
                answer.loop();
            }
        }
}


// CHECKS how fast slow you have performed in comparison with averages
function Vacuum(){
    setVar("CleaningTimeTemp",50);

    setVar("BathroomFast",39);
    setVar("BathroomScopeLow", 40);
    setVar("BathroomScopeHigh",60);
    setVar("BathroomSlow",61);

    if(getVar("CleaningTimeTemp") >= getVar("BathroomScopeLow") &&
        getVar("CleaningTimeTemp") <= getVar("BathroomScopeHigh")) {
        EndPerfect();
    }
    if(getVar("CleaningTimeTemp") <= getVar("BathroomFast")) {
        EndFast();
    }
    if(getVar("CleaningTimeTemp") >= getVar("BathroomSlow")) {
        EndSlow();
    }
    if(getVar("CleaningTimeTemp") <= getVar("BathroomScopeLow")) {
        EndSlower();
    }
    if(getVar("CleaningTimeTemp") >= getVar("BathroomScopeHigh")) {
        EndFaster();
    }

    return;
}
function Wipe(){

    /*
    @If[CleaningTimeTemp]>=[BathroomWipeScopeLow]AND[CleaningTimeTemp]<=[BathroomWipeScopeHigh]Then(EndPerfect)
    @If[CleaningTimeTemp]<=[BathroomWipeFast]Then(EndFast)
    @If[CleaningTimeTemp]>=[BathroomWipeSlow]Then(EndSlow)
    @If[CleaningTimeTemp]<=[BathroomWipeScopeLow]Then(EndSlower)
    @If[CleaningTimeTemp]>=[BathroomWipeScopeHigh]Then(EndFaster)
    */

    setVar("CleaningTimeTemp",50);

    setVar("BathroomWipeFast",39);
    setVar("BathroomWipeScopeLow", 40);
    setVar("BathroomWipeScopeHigh",60);
    setVar("BathroomWipeSlow",61);

    if(getVar("CleaningTimeTemp") >= getVar("BathroomWipeScopeLow") &&
        getVar("CleaningTimeTemp") <= getVar("BathroomWipeScopeHigh")){
        EndPerfect();
    }
    if(getVar("CleaningTimeTemp") <= getVar("BathroomWipeFast")) {
        EndFast();
    }
    if(getVar("CleaningTimeTemp") >= getVar("BathroomWipeSlow")) {
        EndSlow();
    }
    if(getVar("CleaningTimeTemp") <= getVar("BathroomWipeScopeLow")) {
        EndSlower();
    }
    if(getVar("CleaningTimeTemp") >= getVar("BathroomWipeScopeHigh")) {
        EndFaster();
    }

    return;
}
function Wash(){
        /*
        @If[CleaningTimeTemp]>=[BathroomWashScopeLow]AND[CleaningTimeTemp]<=[BathroomWashScopeHigh]Then(EndPerfect)
        @If[CleaningTimeTemp]<=[BathroomWashFast]Then(EndFast)
        @If[CleaningTimeTemp]>=[BathroomWashSlow]Then(EndSlow)
        @If[CleaningTimeTemp]<=[BathroomWashScopeLow]Then(EndSlower)
        @If[CleaningTimeTemp]>=[BathroomWashScopeHigh]Then(EndFaster)
        */

        setVar("CleaningTimeTemp",50);

        setVar("BathroomWashFast",39);
        setVar("BathroomWashScopeLow", 40);
        setVar("BathroomWashScopeHigh",60);
        setVar("BathroomWashSlow",61);

        if(getVar("CleaningTimeTemp") >= getVar("BathroomWashScopeLow") &&
            getVar("CleaningTimeTemp") <= getVar("BathroomWashScopeHigh")) {
            EndPerfect();
        }
        if(getVar("CleaningTimeTemp") <= getVar("BathroomWashFast")) {
            EndFast();
        }
        if(getVar("CleaningTimeTemp") >= getVar("BathroomWashSlow")) {
            EndSlow();
        }
        if(getVar("CleaningTimeTemp") <= getVar("BathroomWashScopeLow")) {
            EndSlower();
        }
        if(getVar("CleaningTimeTemp") >= getVar("BathroomWashScopeHigh")) {
            EndFaster();
        }

        return;
}

// RESULTS - depending on timing, chooses the results, result gives messages/actions and calls FlagTest function

function Satisfied(){
    sendMessage("Good job today %SlaveName%");
    FlagTest();
    return;
}

function EndFast(){
    sendMessage(random("Too fast!","That was waay too fast %SlaveName% !!","Impossible","You can't possible be this fast!"));
    sendMessage(random("That can't go unpunished","I have to punish you for this","I'm gonna have to punish you.."));
    sendMessage("I have assigned you punishment points");
    setVar("GNMPPoints", getVar("GNMPPoints", 0) + 200);
    FlagTest();
    return;
}

function EndSlow(){
    sendMessage(random("You're late!","You're late %SlaveName%","You're late slut..","Late are we?","You know you're late right?"));
    sendMessage(random("I don't tolerate late!","You know I don't tolerate it when you're late","There is zero tolerance for being late and lazy!"));
    sendMessage("I have assigned you punishment points");
    setVar("GNMPPoints", getVar("GNMPPoints", 0) + 200);
    FlagTest();
    return;
}

function EndSlower(){
    sendMessage("You've been slower than usual..");
    if (getVar("CleaningWarning", false)){
        CleaningWarning();
        return;
    }
    sendMessage("Anything I should know?");

    /*[lazy,laziness]sendMessage(random("Inexcusable!","You know that laziness can't be tolerated!");
    [tired,need rest,sleep]sendMessage(random("Inexcusable","I don't care if you're tired!");
    [toys,you made me,you told me]sendMessage(random("Excuses! really!?","Wauv you're gonna blame me..");
    else if (answer.isLike("thorough") || answer.isLike("better cleaning"))
    {
        sendMessage("I see but you should always be thorough!");
    }
    else if (answer.isLike("dirty") || answer.isLike("dirtier") || answer.isLike("dusty"))
    {
        sendMessage("Your %Home% should always be tidy!");
    */

   /* else{
    sendMessage("I'm giving you a warning %SlaveName%");
    }*/
    /*setVar("CleaningWarning", true);
    FlagTest();
    return;

    //OR if answer is not accepted
    sendMessage(random("I'm gonna have to punish you slave","I'm sorry but this can't go unpunished"));
    var exit = false;
    sendMessage("I have assigned you punishment points");
    setVar("GNMPPoints", getVar("GNMPPoints", 0) + 100);
    FlagTest();
    exit = true;*/
}

function EndFaster(){
    sendMessage("You've been faster than usual..");
    if (getVar("CleaningWarning", false)){
        CleaningWarning();
        return;
    }
    sendMessage("Anything I should know?");
    sendMessage("You can't haste thoroughness!");
    sendMessage("I expect that you're always thorough when cleaning");
    sendMessage(random("I'm gonna have to punish you slave","I'm sorry but this can't go unpunished"));
    sendMessage("I have assigned you punishment points");
    setVar("GNMPPoints", getVar("GNMPPoints", 0) + 100);
    FlagTest();
    return;
}

function EndPerfect(){
    sendMessage("%GNMGood% %SlaveName% %MeritChangePMedium%");
    sendMessage("Allow me to reward your " + random("splendid ","good ","excellent ","lovely ") + random ("behaviour ",
    "work ") + "%GNMGrin%");

   FlagTest();
   return;
}

function FlagTest(){
    if (getVar("BathroomWashFloorTemp", false)){
        setVar("ChoreComplete", getVar("ChoreComplete", 0) + 1);
        //SetDate(BathroomVacuum, 0 days)
        //SetDate(BathroomWash, 0 days)
        return;
    }
    if (getVar("BathroomVacuumFloorTemp", false)){
        setVar("ChoreComplete", getVar("ChoreComplete", 0) + 1);
        //SetDate(BathroomVacuum, 0 days)
        return;
    }
    if (getVar("BathroomWipeTemp", false)){
        setVar("ChoreComplete", getVar("ChoreComplete", 0) + 1);
        //SetDate(BathroomVacuum, 0 days)
        //SetDate(BathroomWipe, 0 days)
        return;
    }
    setVar("ChoreComplete", getVar("ChoreComplete", 0) + 1);
    //SetDate(BathroomVacuum, 0 days)
    return;
}

// AVERAGES AND VARIABLES

function BathroomAverageSet(){

/*
    BathroomAverage = (Bathroom1Average+Bathroom2Average+Bathroom3Average+Bathroom4Average+Bathroom5Average)/5
 	BathroomSlow = BathroomAverage * 2
 	BathroomFast = BathroomAverage / 2
	BathroomScopeLow = BathroomAverage / 4 * 3
	BathroomScopeHigh = BathroomAverage / 4 * 5

	BathroomWipeTime = BathroomAverage / 4 * 5
  	BathroomWipeSlow = BathroomWipeTime * 2
  	BathroomWipeFast = BathroomWipeTime / 2
    BathroomWipeScopeLow = BathroomWipeTime / 4 * 3
    BathroomWipeScopeHigh = BathroomWipeTime / 4 * 5

	BathroomWashTime = BathroomAverage / 4 * 5
  	BathroomWashSlow = BathroomWashTime * 2
  	BathroomWashFast = BathroomWashTime / 2
    BathroomWashScopeLow = BathroomWashTime / 4 * 3
    BathroomWashScopeHigh = BathroomWashTime / 4 * 5
*/

    setVar("Bathroom1Average", 0);
    setVar("Bathroom2Average", 0);
    setVar("Bathroom3Average", 0);
    setVar("Bathroom4Average", 0);
    setVar("Bathroom5Average", 0);

    setVar("BathroomAverageSet", true);

    setVar("BathroomAverage", 0);

    setVar("BathroomSlow", 0);
    setVar("BathroomFast", 0);
    setVar("BathroomScopeLow", 0);
    setVar("BathroomScopeHigh", 0);
    setVar("BathroomWipeTime", 0);
    setVar("BathroomWipeSlow", 0);
    setVar("BathroomWipeFast", 0);
    setVar("BathroomWipeScopeLow", 0);
    setVar("BathroomWipeScopeHigh", 0);
    setVar("BathroomWashTime", 0);
    setVar("BathroomWashSlow", 0);
    setVar("BathroomWashFast", 0);
    setVar("BathroomWashScopeLow", 0);
    setVar("BathroomWashScopeHigh", 0);

/*(BathroomAverageSet)
  @Flag(BathroomVacuumFloorTemp) @Goto(Vacuum)
  @Flag(BathroomWipeTemp) @Goto(Wipe)
  @Flag(BathroomWashFloorTemp) @Goto(Wash)
  @Goto(Vacuum)
*/

    /* TODO: error on these lines, probably not correctly defined if _
    If(getVar("BathroomVacuumFloorTemp",true)){Vacuum();}
    If(getVar("BathroomWipeFloorTemp",true)){Wipe();}
    If(getVar("BathroomWashFloorTemp",true)){Wash();}*/

    return;
}

// GAMES

function cornerExercise(){
    sendMessage("Go to the corner %SlaveName%");
    playAudio("Audio/Spicy/SpecialSounds/Bell.mp3");
    sleep(randomInteger(20, 60));
    sendMessage("Return to work %SlaveName%");
    playAudio("Audio/Spicy/SpecialSounds/Bell.mp3");
    return;
}

function typingExercise(){
    sendMessage("Some typing exercise %SlaveName%");
    playAudio("Audio/Spicy/SpecialSounds/Bell.mp3");
    let answer1 = getInput(random("I have to clean properly","I'm a cleaning slut",
                              "I have to clean with a smile","Cleaning makes me happy","You can never clean enough",
                              "I wish I could clean all day","I really love cleaning"));
    if (answer1.isLike("i have to clean properly")){
       sendMessage("I knew that %grin%... ");
    }
    else if (answer1.isLike("i'm a cleaning slut")){
        sendMessage("I knew that %grin%... ");
    }
    else if (answer1.isLike("i have to clean with a smile")){
            sendMessage("I knew that %grin%... ");
    }
    else if (answer1.isLike("cleaning makes me happy")){
        sendMessage("I knew that %grin%... ");
    }
    else if (answer1.isLike("you can never clean enough")){
            sendMessage("I knew that %grin%... ");
    }
    else if (answer1.isLike("i wish i could clean all day")){
            sendMessage("I knew that %grin%... ");
    }
    else if (answer1.isLike("i really love cleaning")){
        sendMessage("I knew that %grin%... ");
    }
    else{
        sendMessage("Wrong.. Try again..");
        answer1.loop();
        return;
    }

    //REPEAT 4 times more

    let answer2 = getInput(random("I have to clean properly","I'm a cleaning slut",
                                  "I have to clean with a smile","Cleaning makes me happy","You can never clean enough",
                                  "I wish I could clean all day","I really love cleaning"));
        if (answer2.isLike("i have to clean properly")){
           sendMessage("I knew that %grin%... ");
        }
        else if (answer2.isLike("i'm a cleaning slut")){
            sendMessage("I knew that %grin%... ");
        }
        else if (answer2.isLike("i have to clean with a smile")){
                sendMessage("I knew that %grin%... ");
        }
        else if (answer2.isLike("cleaning makes me happy")){
            sendMessage("I knew that %grin%... ");
        }
        else if (answer2.isLike("you can never clean enough")){
                sendMessage("I knew that %grin%... ");
        }
        else if (answer2.isLike("i wish i could clean all day")){
                sendMessage("I knew that %grin%... ");
        }
        else if (answer2.isLike("i really love cleaning")){
            sendMessage("I knew that %grin%... ");
        }
        else{
            sendMessage("Wrong.. Try again..");
            answer2.loop();
            return;
        }

    let answer3 = getInput(random("I have to clean properly","I'm a cleaning slut",
                                      "I have to clean with a smile","Cleaning makes me happy","You can never clean enough",
                                      "I wish I could clean all day","I really love cleaning"));
            if (answer3.isLike("i have to clean properly")){
               sendMessage("I knew that %grin%... ");
            }
            else if (answer3.isLike("i'm a cleaning slut")){
                sendMessage("I knew that %grin%... ");
            }
            else if (answer3.isLike("i have to clean with a smile")){
                    sendMessage("I knew that %grin%... ");
            }
            else if (answer3.isLike("cleaning makes me happy")){
                sendMessage("I knew that %grin%... ");
            }
            else if (answer3.isLike("you can never clean enough")){
                    sendMessage("I knew that %grin%... ");
            }
            else if (answer3.isLike("i wish i could clean all day")){
                    sendMessage("I knew that %grin%... ");
            }
            else if (answer3.isLike("i really love cleaning")){
                sendMessage("I knew that %grin%... ");
            }
            else{
                sendMessage("Wrong.. Try again..");
                answer3.loop();
                return;
            }

            let answer4 = getInput(random("I have to clean properly","I'm a cleaning slut",
                                          "I have to clean with a smile","Cleaning makes me happy","You can never clean enough",
                                          "I wish I could clean all day","I really love cleaning"));
                if (answer4.isLike("i have to clean properly")){
                   sendMessage("I knew that %grin%... ");
                }
                else if (answer4.isLike("i'm a cleaning slut")){
                    sendMessage("I knew that %grin%... ");
                }
                else if (answer4.isLike("i have to clean with a smile")){
                        sendMessage("I knew that %grin%... ");
                }
                else if (answer4.isLike("cleaning makes me happy")){
                    sendMessage("I knew that %grin%... ");
                }
                else if (answer4.isLike("you can never clean enough")){
                        sendMessage("I knew that %grin%... ");
                }
                else if (answer4.isLike("i wish i could clean all day")){
                        sendMessage("I knew that %grin%... ");
                }
                else if (answer4.isLike("i really love cleaning")){
                    sendMessage("I knew that %grin%... ");
                }
                else{
                    sendMessage("Wrong.. Try again..");
                    answer4.loop();
                    return;
                }

                let answer5 = getInput(random("I have to clean properly","I'm a cleaning slut",
                                              "I have to clean with a smile","Cleaning makes me happy","You can never clean enough",
                                              "I wish I could clean all day","I really love cleaning"));
                    if (answer5.isLike("i have to clean properly")){
                       sendMessage("I knew that %grin%... ");
                    }
                    else if (answer5.isLike("i'm a cleaning slut")){
                        sendMessage("I knew that %grin%... ");
                    }
                    else if (answer5.isLike("i have to clean with a smile")){
                            sendMessage("I knew that %grin%... ");
                    }
                    else if (answer5.isLike("cleaning makes me happy")){
                        sendMessage("I knew that %grin%... ");
                    }
                    else if (answer5.isLike("you can never clean enough")){
                            sendMessage("I knew that %grin%... ");
                    }
                    else if (answer5.isLike("i wish i could clean all day")){
                            sendMessage("I knew that %grin%... ");
                    }
                    else if (answer5.isLike("i really love cleaning")){
                        sendMessage("I knew that %grin%... ");
                    }
                    else{
                        sendMessage("Wrong.. Try again..");
                        answer5.loop();
                        return;
                    }
    sendMessage("Get back to cleaning...");


}

/* Old version before GodDragon help */
/*
function oldSetTimer(){

    setVar("CleaningTimeTemp", 0);
    sendMessage("CleaningTimeTemp is set: " + getVar("CleaningTimeTemp"));
    let startDate = startTimer(); //@CountVar[CleaningTimeTemp]
    sendMessage("startDate is set: " + startDate);

    let gamesOffered = randomInteger(0, 1);
    switch(gamesOffered) {
        		case 0:
                    sendMessage("Launching BellGame1() - go to corner");
                    //sleep(randomInteger(20, 120));
                    stopTimer(startDate); //stops timer before launching the game
                    Corner();
                    startDate = startTimer(); //continues to count cleaning time after the game
                    break;
                case 1:
                    sendMessage("Launching BellGame2() - typing exercise");
                    //sleep(randomInteger(20, 120));
                    stopTimer(startDate); //stops timer before launching the game
                    typingExercise();
                    break;

        }

    reportDone();
    stopTimer(startDate); //stops timer before calculating final result and giving rewards

}

function oldstartTimer() {
    sendMessage("startTimer function called");
    return new Date();
}

function oldstopTimer(startDate) {
    sendMessage("stopTimer function called");
    //Converts possible double to int
    let secondsPassed = parseInt((new Date().getTime() - startDate.getTime())/1000, 10);
    sendMessage("secondsPassed " + secondsPassed);
    setVar("CleaningTimeTemp", getVar("CleaningTimeTemp", 0) + secondsPassed);
    sendMessage("CleaningTimeTemp" + CleaningTimeTemp);
}

function BellGame1(){
    //sleep(randomInteger(20, 120));
    stopTimer(startDate); //stops timer before launching the game
    Corner();
    startDate = startTimer(); //continues to count cleaning time after the game
    return;
}

function BellGame2(){
    //sleep(randomInteger(20, 120));
    stopTimer(startDate); //stops timer before launching the game
    typingExercise();
    startDate = startTimer(); //continues to count cleaning time after the game
    return;
}
*/


