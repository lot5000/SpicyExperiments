DMessage("CleaningBathroom.js");

//const VARIABLE_CLEANING_TIME_TEMP = "CleaningTimeTemp";
const CleaningTimeTemp = "0";

// *** Are you ready? loop ***

areYouReady();


// *** Kinky cleaning ***

//run("Chores/KinkyCleaning.js");

//sendMessage("Okay then");
sendMessage("You can go ahead and start with the cleaning.. ");
//sendMessage("Report when you're done cleaning ");

//BathroomWash();
//BathroomVacuum();
//BathroomWipe();


setTimer();

if (getVar("BathroomAverageSet", false)){
    BathroomAverageSet();
    exit = true;
}

if (!exit) {
    if (getVar("Bathroom5AverageSet", false)){
        Bathroom5AverageSet();
        exit = true;
    }
    if (!exit) {
        if (getVar("Bathroom4AverageSet", false)){
            Bathroom4AverageSet();
            exit = true;
        }
        if (!exit) {
            if (getVar("Bathroom3AverageSet", false)){
                Bathroom3AverageSet();
                exit = true;
            }
            if (!exit) {
                if (getVar("Bathroom2AverageSet", false)){
                    Bathroom2AverageSet();
                    exit = true;
                }
                if (!exit) {
                    Bathroom1AverageSet();
                    exit = true;
                }
            }
        }
    }
}

/*var exit = false;
Bathroom1AverageSet();
exit = true;
var exit = false;
Bathroom5AverageSet();
exit = true;

var exit = false;
BathroomAverageSet();
exit = true;*/


function BathroomWash(){
    setTempVar("BathroomWashFloorTemp", true);
    sendMessage("Let's take a look at your bathroom:");
    lockImages();
    showPicture("Images/Spicy/Home/*.jpg");
    let answer = getInput("Analyse your Mistress' home plan, find the bathroom and report when done");
    unlockImages();
    sendMessage(random("It's time to mop the floors!","Time for you to mop the floors","Lets have you do some floor mopping!",
    "Time to mop mop mop %GNMGrin%","Work work work all day - mop all night %GNMLol%"));
    sendMessage("But " + random("first","before that","before we get to that","just before"));
    sendMessage(random("They need to be vacuumed","You have to vacuum them first","You gotta go ahead and vacuum them.."));
    sendMessage(random("Fetch","Find and get","Retrieve") + " your vacuum cleaner, and whatever you need to mop the floors.");
    sleep(10);
    areYouReady();
}

function BathroomWipe(){
    setTempVar("BathroomWipeTemp", true);
    sendMessage("Let's take a look at your bathroom:");
    lockImages();
    showPicture("Images/Spicy/Home/*.jpg");
    let answer = getInput("Analyse your Mistress' home plan, find the bathroom and report when done");
    unlockImages();
    sendMessage(random("It's time to clean the toilet and whatelse",
                                        "Time for you to clean the toilet and whatelse",
                                        "Lets have you do some toiletscrubbing and whatelse"));
    sendMessage(random("Fetch","Find and get","Retrieve") + " whatever you need to scrub the toilet and whatever needs to be cleaned");
    unlockImages();
    sleep(10);
    areYouReady();
}

function BathroomVacuum(){
    setTempVar("BathroomVacuumFloorTemp", true);
    sendMessage("Let's take a look at your bathroom:");
    lockImages();
    showPicture("Images/Spicy/Home/*.jpg");
    let answer = getInput("Analyse your Mistress' home plan, find the bathroom and report when done");
    unlockImages();
    sendMessage(random("It's time to vacuum!","Time for you to vacuum the floor",
                                        "Lets have you do some vacuuming!","Time to clean clean clean %GNMGrin%",
                                        "Work work work all day - clean all night %GNMLol%"));
    sendMessage(random("You need to vacuum the floor","You have to vacuum the floor",
                                        "You gotta go ahead and vacuum the floor"));
    sendMessage(random("Fetch","Find and get","Retrieve") + " your vacuum cleaner");
    unlockImages();
    sleep(10);
    areYouReady();
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

function setTimer(){

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
                /*default:
                    break;*/
        }

    reportDone();
    stopTimer(startDate); //stops timer before calculating final result and giving rewards

}

function startTimer() {
    sendMessage("startTimer function called");
    return new Date();
}

function stopTimer(startDate) {
    sendMessage("stopTimer function called");
    //Converts possible double to int
    let secondsPassed = parseInt((new Date().getTime() - startDate.getTime())/1000, 10);
    sendMessage("secondsPassed " + secondsPassed);
    setVar("CleaningTimeTemp", getVar("CleaningTimeTemp", 0) + secondsPassed);
    sendMessage("CleaningTimeTemp" + CleaningTimeTemp);
}

function reportDone() {

const answer = sendInput("Report to me when you are done...");
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

function Vacuum(){
    /*
    @If[CleaningTimeTemp]>=[BathroomScopeLow]AND[CleaningTimeTemp]<=[BathroomScopeHigh]Then(EndPerfect)
    EndPerfect();
    @If[CleaningTimeTemp]<=[BathroomFast]Then(EndFast)
    EndFast();
    @If[CleaningTimeTemp]>=[BathroomSlow]Then(EndSlow)
    EndSlow();
    @If[CleaningTimeTemp]<=[BathroomScopeLow]Then(EndSlower)
    EndSlower();
    @If[CleaningTimeTemp]>=[BathroomScopeHigh]Then(EndFaster)
    EndFaster();
    */

    Wipe();
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

    Wash();
    return;
}
function Wash(){
    /*@If[CleaningTimeTemp]>=[BathroomWashScopeLow]AND[CleaningTimeTemp]<=[BathroomWashScopeHigh]Then(EndPerfect)
    @If[CleaningTimeTemp]<=[BathroomWashFast]Then(EndFast)
    @If[CleaningTimeTemp]>=[BathroomWashSlow]Then(EndSlow)
    @If[CleaningTimeTemp]<=[BathroomWashScopeLow]Then(EndSlower)
    @If[CleaningTimeTemp]>=[BathroomWashScopeHigh]Then(EndFaster)*/

    Satisfied();
    return;
}

// RESULTS

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
    sendMessage("Allow me to reward your " + random("splendid","good","excellent","lovely") + random ("behaviour", "work") + "%GNMGrin%");

   FlagTest();
   return;
}

// AVERAGES AND VARIABLES

function Bathroom1AverageSet(){
    setVar("Bathroom1Average", 0);
    setVar("Bathroom2AverageSet", true);
    setVar("Bathroom1Average", getVar("Bathroom1Average", 0) + getVar("CleaningTimeTemp", 0));
    Satisfied();
    return;
}
function Bathroom2AverageSet(){
    setVar("Bathroom2Average", 0);
    setVar("Bathroom3AverageSet", true);
    setVar("Bathroom2Average", getVar("Bathroom2Average", 0) + getVar("CleaningTimeTemp", 0));
    Satisfied();
    return;
}
function Bathroom3AverageSet(){
    setVar("Bathroom3Average", 0);
    setVar("Bathroom4AverageSet", true);
    setVar("Bathroom3Average", getVar("Bathroom3Average", 0) + getVar("CleaningTimeTemp", 0));
    Satisfied();
    return;
}
function Bathroom4AverageSet(){
    setVar("Bathroom4Average", 0);
    setVar("Bathroom5AverageSet", true);
    setVar("Bathroom4Average", getVar("Bathroom4Average", 0) + getVar("CleaningTimeTemp", 0));
    Satisfied();
    return;
}
function Bathroom5AverageSet(){
    setVar("Bathroom5Average", 0);
    setVar("BathroomAverageSet", true);
    setVar("Bathroom5Average", getVar("Bathroom5Average", 0) + getVar("CleaningTimeTemp", 0));
    setVar("BathroomAverage", 0);
    setVar("BathroomAverage", getVar("BathroomAverage", 0) + getVar("Bathroom1Average", 0));
    setVar("BathroomAverage", getVar("BathroomAverage", 0) + getVar("Bathroom2Average", 0));
    setVar("BathroomAverage", getVar("BathroomAverage", 0) + getVar("Bathroom3Average", 0));
    setVar("BathroomAverage", getVar("BathroomAverage", 0) + getVar("Bathroom4Average", 0));
    setVar("BathroomAverage", getVar("BathroomAverage", 0) + getVar("Bathroom5Average", 0));
    setVar("BathroomAverage", getVar("BathroomAverage", 0) / 5);
    setVar("BathroomSlow", 0);
    setVar("BathroomSlow", getVar("BathroomSlow", 0) + getVar("BathroomAverage", 0));
    setVar("BathroomSlow", getVar("BathroomSlow", 0) * 2);
    setVar("BathroomFast", 0);
    setVar("BathroomFast", getVar("BathroomFast", 0) + getVar("BathroomAverage", 0));
    setVar("BathroomFast", getVar("BathroomFast", 0) / 2);
    setVar("BathroomScopeLow", 0);
    setVar("BathroomScopeLow", getVar("BathroomScopeLow", 0) + getVar("BathroomAverage", 0));
    setVar("BathroomScopeLow", getVar("BathroomScopeLow", 0) / 4);
    setVar("BathroomScopeLow", getVar("BathroomScopeLow", 0) * 3);
    setVar("BathroomScopeHigh", 0);
    setVar("BathroomScopeHigh", getVar("BathroomScopeHigh", 0) + getVar("BathroomAverage", 0));
    setVar("BathroomScopeHigh", getVar("BathroomScopeHigh", 0) / 4);
    setVar("BathroomScopeHigh", getVar("BathroomScopeHigh", 0) * 5);
    setVar("BathroomWipeTime", 0);
    setVar("BathroomWipeTime", getVar("BathroomWipeTime", 0) + getVar("BathroomAverage", 0));
    setVar("BathroomWipeTime", getVar("BathroomWipeTime", 0) / 4);
    setVar("BathroomWipeTime", getVar("BathroomWipeTime", 0) * 5);
    setVar("BathroomWipeSlow", 0);
    setVar("BathroomWipeSlow", getVar("BathroomWipeSlow", 0) + getVar("BathroomWipeTime", 0));
    setVar("BathroomWipeSlow", getVar("BathroomWipeSlow", 0) * 2);
    setVar("BathroomWipeFast", 0);
    setVar("BathroomWipeFast", getVar("BathroomWipeFast", 0) + getVar("BathroomWipeTime", 0));
    setVar("BathroomWipeFast", getVar("BathroomWipeFast", 0) / 2);
    setVar("BathroomWipeScopeLow", 0);
    setVar("BathroomWipeScopeLow", getVar("BathroomWipeScopeLow", 0) + getVar("BathroomWipeTime", 0));
    setVar("BathroomWipeScopeLow", getVar("BathroomWipeScopeLow", 0) / 4);
    setVar("BathroomWipeScopeLow", getVar("BathroomWipeScopeLow", 0) * 3);
    setVar("BathroomWipeScopeHigh", 0);
    setVar("BathroomWipeScopeHigh", getVar("BathroomWipeScopeHigh", 0) + getVar("BathroomWipeTime", 0));
    setVar("BathroomWipeScopeHigh", getVar("BathroomWipeScopeHigh", 0) / 4);
    setVar("BathroomWipeScopeHigh", getVar("BathroomWipeScopeHigh", 0) * 5);
    setVar("BathroomWashTime", 0);
    setVar("BathroomWashTime", getVar("BathroomWashTime", 0) + getVar("BathroomAverage", 0));
    setVar("BathroomWashTime", getVar("BathroomWashTime", 0) / 4);
    setVar("BathroomWipeTime", getVar("BathroomWipeTime", 0) * 5);
    setVar("BathroomWashSlow", 0);
    setVar("BathroomWashSlow", getVar("BathroomWashSlow", 0) + getVar("BathroomWashTime", 0));
    setVar("BathroomWashSlow", getVar("BathroomWashSlow", 0) * 2);
    setVar("BathroomWashFast", 0);
    setVar("BathroomWashFast", getVar("BathroomWashFast", 0) + getVar("BathroomWashTime", 0));
    setVar("BathroomWashFast", getVar("BathroomWashFast", 0) / 2);
    setVar("BathroomWashScopeLow", 0);
    setVar("BathroomWashScopeLow", getVar("BathroomWashScopeLow", 0) + getVar("BathroomWashTime", 0));
    setVar("BathroomWashScopeLow", getVar("BathroomWashScopeLow", 0) / 4);
    setVar("BathroomWashScopeLow", getVar("BathroomWashScopeLow", 0) * 3);
    setVar("BathroomWashScopeHigh", 0);
    setVar("BathroomWashScopeHigh", getVar("BathroomWashScopeHigh", 0) + getVar("BathroomWashTime", 0));
    setVar("BathroomWashScopeHigh", getVar("BathroomWashScopeHigh", 0) / 4);
    setVar("BathroomWashScopeHigh", getVar("BathroomWashScopeHigh", 0) * 5);
}
function BathroomAverageSet(){

/*(BathroomAverageSet)
  @Flag(BathroomVacuumFloorTemp) @Goto(Vacuum)
  @Flag(BathroomWipeTemp) @Goto(Wipe)
  @Flag(BathroomWashFloorTemp) @Goto(Wash)
  @Goto(Vacuum)
*/

    //@Flag(BathroomVacuumFloorTemp)
    Vacuum();
    return;

    //@Flag(BathroomWipeTemp)
    Wipe();
    return;

    //@Flag(BathroomWashFloorTemp)
    Wash();
    return;

}
function FlagTest(){
    if (getVar("BathroomWashFloorTemp", false)){
        BathroomWashFloorTemp();
        return;
    }
    if (getVar("BathroomVacuumFloorTemp", false)){
        BathroomVacuumFloorTemp();
        return;
    }
    if (getVar("BathroomWipeTemp", false)){
        BathroomWipeTemp();
        return;
    }
    BathroomVacuumFloorTemp();
    return;
}
function BathroomVacuumFloorTemp(){
    setVar("ChoreComplete", getVar("ChoreComplete", 0) + 1);
    //SetDate(BathroomVacuum, 0 days)
}
function BathroomWashFloorTemp(){
    setVar("ChoreComplete", getVar("ChoreComplete", 0) + 1);
    //SetDate(BathroomVacuum, 0 days)
    //SetDate(BathroomWash, 0 days)
}
function BathroomWipeTemp(){
    setVar("ChoreComplete", getVar("ChoreComplete", 0) + 1);
    //SetDate(BathroomVacuum, 0 days)
    //SetDate(BathroomWipe, 0 days)
}


// GAMES

function BellGame1(){
    /*//sleep(randomInteger(20, 120));
    stopTimer(startDate); //stops timer before launching the game
    Corner();
    startDate = startTimer(); //continues to count cleaning time after the game*/
    return;
}

function BellGame2(){
    /*//sleep(randomInteger(20, 120));
    stopTimer(startDate); //stops timer before launching the game
    typingExercise();
    startDate = startTimer(); //continues to count cleaning time after the game*/
    return;
}

function Corner(){
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
    sendMessage(random("I have to clean properly","I'm a cleaning slut",
    "I have to clean with a smile","Cleaning makes me happy","You can never clean enough",
    "I wish I could clean all day","I really love cleaning"));

    var answer = getInput("");
    if (answer.isLike("i have to clean properly")){
       sendMessage("I knew that %grin%... Get back to cleaning");
    }
    else if (answer.isLike("i'm a cleaning slut")){
        sendMessage("I knew that %grin%... Get back to cleaning");
    }
    else if (answer.isLike("i have to clean with a smile")){
            sendMessage("I knew that %grin%... Get back to cleaning");
    }
    else if (answer.isLike("cleaning makes me happy")){
        sendMessage("I knew that %grin%... Get back to cleaning");
    }
    else if (answer.isLike("you can never clean enough")){
            sendMessage("I knew that %grin%... Get back to cleaning");
    }
    else if (answer.isLike("i wish i could clean all day")){
            sendMessage("I knew that %grin%... Get back to cleaning");
    }
    else if (answer.isLike("i really love cleaning")){
        sendMessage("I knew that %grin%... Get back to cleaning");
    }
    else{
        sendMessage("Wrong.. Try again..");
        answer.loop();
        return;
    }
}