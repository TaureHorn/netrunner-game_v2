import { Character } from "../functions/classes";
import { edgerunnerPass } from "./network";

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

let username = "";
function getUsername() {
  if (!window.localStorage.getItem("username")) {
    return (username = "");
  } else {
    const fetch = window.localStorage.getItem("username").split("@");
    return (username = fetch[0]);
  }
}

getUsername();

export const charsSeventhCircle = {
  aaaUser: new Character(
    username,
    username,
    "they/them",
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
    "he/him",
    "Hey newbie",
    "steghide is a really useful tool",
    "i gave you everything you need, read the help section",
    "which scop-for-brains bought all my ice!?",
    "online",
    shade
  ),
  tbug: new Character(
    "TBug",
    "TBug",
    "she/her",
    "Need something newbie?",
    "a good netrunner always knows what tools are available and what they do",
    "you'd better be just window shopping. dont fuck with the vdbs",
    "Kabuki's subnets all abuzz. Info?",
    "online",
    tbug
  ),
  bad: new Character(
    "bad",
    "b@d",
    "they/them",
    "hey fresh meat... reggies new lackey yeah?",
    "learning this stuff takes time, patience and a whole lot of caution",
    "what!? vdbs? get to a ripper, i think you got a circ loose",
    "maelstrom boys got nothin on me!",
    "online",
    bad
  ),
  bugbear: new Character(
    "bugbear",
    "8ug8ear",
    "she/her",
    "Which back alley ice box did they dredge you from?",
    "Four things not to fuck with at your stage. Corps, Corpos, Cops and the Voodoo Boys",
    "wtf! CTRL ALT fucking DELETE yourself outta this situation. Which gonk has you poking the bear?",
    "Tyger Claws moving around Cherry Blossom. Keep well away, blastin' circs!",
    "online",
    bugbear
  ),
  luce: new Character(
    "luce",
    "luce",
    "she/her",
    "sorry, don't know you...",
    "",
    "",
    "daydreaming... stargazing...",
    "online",
    luce
  ),
  vortex: new Character(
    "vortex",
    "VORTEX",
    "he/him",
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
    "he/him",
    "you seek the wise words of the loa?",
    "i am not in the business of arming the competition",
    "sa ou vle ak sot sa a",
    "Anyone else hear Lizzy Wizzy's new track!? Shit's outta-this-fuckin-world",
    "online",
    spaceboy
  ),
  ti: new Character(
    "tineptune",
    "tiNeptune",
    "he/him",
    "",
    "",
    "enteresan",
    "",
    "offline",
    mystery
  ),
  kiwi: new Character(
    "kiwi",
    "K1W1",
    "she/her",
    "heard you're playin netrunner for the day. you hit your first target yet?",
    "caution is the name of the game. one wrong move and you could end up with your brain flowing out your ears",
    edgerunnerPass,
    "I can hear the sounds of Tinnitus from all the way in Kabuki. Borgs are whacked",
    "online",
    kiwi
  ),
};
