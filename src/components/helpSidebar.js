import { toggleElement } from "../functions/toggleElement";

function HelpSidebar(props) {
  return (
    <>
      <div id="helpSidebar" className="border sidePanel panel hover scroll">
        <p className="sidebarHeader">=== HELP ===</p>
        <div>
          <div
            className="sectionToggler border"
            onClick={() => toggleElement("helpReadme")}
          >
            <p> READ ME! </p>
          </div>
          <div id="helpReadme" className="blockText">
            <p>
              Yo! Regina told me you were new to the world of netrunning and
              wanted to get your feet wet, well not actually wet - that'll come
              later, much later. Anyway, real lucky for you that I owe her a
              favor. I set up this virtual machine for you to get the basics
              down, to stretch your cyber-legs. It's not much, not compared to -
              like - the new Raven micro-processors or whatever. But... when you
              fuck up - and you will fuck up - TraumaTeam won't be barging down
              your door to carry your braindead body to hospital or worse.
            </p>
            <p>
              To save us both a lot of hassle this machine only runs in RAM, no
              storage. So don't reload the page unless you've really messed
              something up and wanna reset. Any super burning questions, hit me
              up on irc - but plx try to work it out yourself first, k. If you
              can't work out how to get to irc, you're a lost cause. Tell Regina
              I did her good!
            </p>
            <p>
              <em> - shade </em>
            </p>
          </div>
        </div>

        <div
          className="sectionToggler border"
          onClick={() => toggleElement("helpGlossary")}
        >
          <p> glossary </p>
        </div>
        <p id="helpGlossary" className="blockText" style={{ display: "none" }}>
          meep
        </p>

        <div
          className="sectionToggler border"
          onClick={() => toggleElement("helpMap")}
        >
          <p> map </p>
        </div>

        <p id="helpMap" className="blockText" style={{ display: "none" }}>
          keep
        </p>
      </div>
    </>
  );
}

export default HelpSidebar;
