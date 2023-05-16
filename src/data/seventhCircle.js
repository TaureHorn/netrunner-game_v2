import { Character, IRC } from "../functions/classes";
import { getUsername } from "../functions/getUsername";

import { edgerunnerPass, net } from "./network";

// profile pic imports
import shade from "../resources/pfp/shade.png";
import tbug from "../resources/pfp/tbug.png";
import bad from "../resources/pfp/bad.png";
import bugbear from "../resources/pfp/bugbear.png";
import luce from "../resources/pfp/luce.png";
import vortex from "../resources/pfp/vortex.png";
import spaceboy from "../resources/pfp/spaceboy.png";
import mystery from "../resources/pfp/mystery.png";
import kiwi from "../resources/pfp/kiwi.png";
import user from "../resources/pfp/user.png";

///////////////////////////////// IRC CHANNEL ////////////////////////////////////////////
//
export const irc = {
    seventhCircle: new IRC(
    "7th Circle",
    "~~~ Thank God MaxTac dont prowl cyberspace ~~~" 
    )
}

irc.seventhCircle.assignNetwork(net.seventhCircle);
//
///////////////////////////////// CHARACTERS ///////////////////////////////////////
//

const username = getUsername()

export const charsSeventhCircle = {
  aaaUser: new Character(
    username,
    username,
    "",
    "",
    "",
    "",
    "Hi! I'm " +
      username +
      ". I am a newbie netrunner. Also shade is a really cool and handsome dude",
    "online",
    user
  ),
  shade: new Character(
    "shade",
    "shade",
    "Yo " + username + "!",
    "steghide is a really useful tool",
    "i gave you everything you need, read the help section",
    "wtf choom.... i try to help you and this is the thanks I get!",
    "which scop-for-brains bought all my ice!?",
    "online",
    shade
  ),
  TBug: new Character(
    "TBug",
    "TBug",
    "Need something newbie?",
    "a good netrunner always knows what tools are available and what they do",
    "you'd better be just window shopping. dont fuck with the vdbs",
    "Sorry newbie. Wasn't me. Whoever left you that message was right to warn you. Shade is dangerously stupid.",
    "Kabuki's subnets all abuzz. Info?",
    "online",
    tbug
  ),
  bad: new Character(
    "bad",
    "b@d",
    "hey fresh meat... reggies new lackey yeah?",
    "learning this stuff takes time, patience and a whole lot of caution",
    "what!? vdbs? get to a ripper, i think you got a circ loose",
    "Dunno. Maybe ask T. Could be anyone tho. Shade has a malfunction in his brain",
    "maelstrom boys got nothin on me!",
    "online",
    bad
  ),
  bugbear: new Character(
    "bugbear",
    "8ug8ear",
    "Which back alley ice box did they dredge you from?",
    "Four things not to fuck with at your stage. Corps, Corpos, Cops and the Voodoo Boys",
    "wtf! CTRL ALT fucking DELETE yourself outta this situation.",
    "No idea choom. Sound advice. Steer clear of that poser",
    "Tyger Claws moving around Cherry Blossom. Keep well away, blastin' circs!",
    "online",
    bugbear
  ),
  luce: new Character(
    "luce",
    "luce",
    "sorry, don't know you...",
    "",
    "",
    "",
    "daydreaming... stargazing...",
    "online",
    luce
  ),
  vortex: new Character(
    "vortex",
    "VORTEX",
    "",
    "",
    "",
    "",
    "takin a dive. heading for thick ice. see you soon",
    "offline",
    vortex
  ),
  spaceboy: new Character(
    "spaceboy",
    "Spaceboy_66",
    "you seek the wise words of the loa?",
    "i am not in the business of arming the competition",
    "sa ou vle ak sot sa a",
    "",
    "Anyone else hear Lizzy Wizzy's new track!? Shit's outta-this-fuckin-world",
    "online",
    spaceboy
  ),
  tiNeptune: new Character(
    "tiNeptune",
    "tiNeptune",
    "",
    "",
    "enteresan",
    "",
    "",
    "offline",
    mystery
  ),
  kiwi: new Character(
    "kiwi",
    "K1W1",
    "heard you're playin netrunner for the day. you hit your first target yet?",
    "caution is the name of the game. one wrong move and you could end up with your brain flowing out your ears",
    "Yeah. Dont. Consider the idea that shade is actually tryna get you killed",
    "good. you found it. ssh into edgerunnerFTP. pass: " + edgerunnerPass,
    "I can hear the sounds of Tinnitus from all the way in Kabuki. Borgs are whacked",
    "online",
    kiwi
  ),
};

irc.seventhCircle.linkMember(charsSeventhCircle)

//
///////////////////////////////// CHANNEL MESSAGE HISTORY  ///////////////////////////////////////
//

// shorthand
const sev = irc.seventhCircle;

sev.appendMessage(net.seventhCircle._netLocName, " ~~ your system administrator has archived message history beyond this point")
sev.appendMessage(sev._members.TBug._alias, "Something is happening in Kabuki...")
sev.appendMessage(sev._members.TBug._alias, "Was in a server and got kicked out")
sev.appendMessage(sev._members.TBug._alias, "No warning, no sparks or fireworks. Now, the server wont even ping.")
sev.appendMessage(sev._members.TBug._alias, "Some local cams offline. Ones that are on backup gens, or seperate grids still working")
sev.appendMessage(sev._members.TBug._alias, "Main square not mega bright like normal")
sev.appendMessage(sev._members.TBug._alias, "Anyone know whats happening?")
sev.appendMessage(sev._members.shade._alias, "yeh, some things power cycled for me too")
sev.appendMessage(sev._members.shade._alias, "good thing i got backup gens")
sev.appendMessage(sev._members.shade._alias, "do nooooot wanna have to restart compiling fireshaft a third time :oooooo ")
sev.appendMessage(sev._members.bad._alias, "been warnings of brownouts across Watson lately. Some Militech horseshit or something")
sev.appendMessage(sev._members.bad._alias, "you'd think they'd throw us a bone, what with how hard Rhyne's been cozying up to their CEO")
sev.appendMessage(sev._members.kiwi._alias, "Honestly, I could kiss whoever caused the blackout. First time in weeks my skull isn't being assaulted by constant hard bass coming from the Totentanz. Fucking borgs seriously...")
sev.appendMessage(sev._members.TBug._alias, "Even corps can do good it seems... If unintenional.")
sev.appendMessage(sev._members.shade._alias, "someone let mr harford know. can't be seen doing good. itll ruin his cred ;P")
sev.appendMessage(sev._members.kiwi._alias, "Wait... Fuck... The thundering sound of rhythmic bass drums blasts through the night again... kill meeeeee")
sev.appendMessage(sev._members.kiwi._alias, "Some of their amps are bigger than a Kaukaz. Where do they find the generators to power those things on such short notice!?")
sev.appendMessage(sev._members.shade._alias, "When ur as skezzed out on chrome as they are, anything is possible")
sev.appendMessage(sev._members.vortex._alias, "Where theres power, theres voltage regulators. I'm willing to bet Fuyutsuki")
sev.appendMessage(sev._members.vortex._alias, "Maelstrom overclock their stuff so close to redline. Only a single nudge could bring the whole thing down")
sev.appendMessage(sev._members.bugbear._alias, "Yeah. Fuyutsuki sounds right. Lucky too. Widespread faults in the matrices. Could shoot you some docs?")
sev.appendMessage(sev._members.kiwi._alias, "Yeah. Nova!")
sev.appendMessage(sev._members.TBug._alias, "If you're close enough to hear it, you're close enough to get paid a visit by those psychos")
sev.appendMessage(sev._members.TBug._alias, "Maelstrom don't fuck around")
sev.appendMessage(sev._members.TBug._alias, "and for people whose brains are mostly metal, mush or hardcore drugs they've got some seriously good runners")
sev.appendMessage(sev._members.shade._alias, "Naaa. FUCK. THEM. UP. K1W1!!!1!!1")
sev.appendMessage(sev._members.kiwi._alias, "Damn...")
sev.appendMessage(sev._members.kiwi._alias, "Think you might be right bug")
sev.appendMessage(sev._members.TBug._alias, "Course I'm right :)")
sev.appendMessage(sev._members.shade._alias, "laaaaaaammmeeeeee")
sev.appendMessage(sev._members.bad._alias, "Newbie. If you wanna turn your brain to bacon go right ahead.")
sev.appendMessage(sev._members.bad._alias, "But T's right. Maelstrom practically invented the word psychotic. And they love the Totentanz more than they love drugs.")
sev.appendMessage(sev._members.TBug._alias, "and boy do they love drugs...")
sev.appendMessage(net.seventhCircle._netLocName, "[---------------------------------------------------------------------------------------------------------------------------------]")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ user [" + sev._members.shade._alias + "] has added [" + sev._members.aaaUser._alias + "] to the channel")
sev.appendMessage(sev._members.bad._alias, "???")
sev.appendMessage(sev._members.bad._alias, "Who the fuck is this?")
sev.appendMessage(sev._members.shade._alias, "got a job to babysit some wannabe runner. thought id let em learn how to walk")
sev.appendMessage(sev._members.shade._alias, "but gotta get in touch when they stumble, so dropped em here")
sev.appendMessage(sev._members.shade._alias, "why build infrastructure for secure comms when irc gets it done with like two commands")
sev.appendMessage(sev._members.bad._alias, "This aint your playground shade. Hella bad opsec to drop some rando in this SECURE CHANNEL")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ user [" + sev._members.shade._alias + "] has removed the following channel permissions from [" + sev._members.aaaUser._alias + "]: message(write/edit/delete), users(add/edit/remove)")
sev.appendMessage(sev._members.shade._alias, "chill chooom. set their config. they'll be harmless")
sev.appendMessage(sev._members.shade._alias, "besides. reggie vetted em ")
sev.appendMessage(sev._members.bad._alias, "And if Reggie told you to jump out of a megatower window cuz theres for sure a safety net at the bottom would you?")
sev.appendMessage(sev._members.shade._alias, "hell yeah. what a rush")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ user [" + sev._members.bad._alias + "] has removed the following channel permissions from [" + sev._members.shade._alias + "]: breathing, having a goddamn brain")
sev.appendMessage(sev._members.shade._alias, "XD")
sev.appendMessage(sev._members.shade._alias, "choom!!")
sev.appendMessage(sev._members.shade._alias, "take a baleperiodol")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ user [" + sev._members.TBug._alias + "] has removed the following channel permissions from [" + sev._members.shade._alias + "]: users(add/edit/remove)")
sev.appendMessage(sev._members.shade._alias, "whaaaaaaaaat! cmon!")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ user [" + sev._members.TBug._alias + "] has archived a series of channel messages") 
sev.appendMessage(sev._members.TBug._alias, "Quit screwing around shade. If you're not careful this is how motherfuckers get killed")
sev.appendMessage(sev._members.TBug._alias, "And that aint me threatening you")
sev.appendMessage(sev._members.TBug._alias, "If your newbie gets into the wrong net, you're risking us all getting scorched")
sev.appendMessage(sev._members.shade._alias, "i'm setting em up on an old ass zetatech zombie. fully airgapped and disposable. bare metals out in like pallo alto or smth")
sev.appendMessage(sev._members.shade._alias, "dw. done my homework")
sev.appendMessage(sev._members.bugbear._alias, "shade you dumbass.")
sev.appendMessage(sev._members.bugbear._alias, "I guess the damage has sorta been done already. Best we can do is play nice and push the newbie in the right direction when they show.")
sev.appendMessage(sev._members.bugbear._alias, "If not for their ass, for our own")
sev.appendMessage(sev._members.TBug._alias, "True")

