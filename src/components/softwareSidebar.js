import { useEffect, useState } from "react";
import { genRand } from "../functions/randStr";
import { themer, toggleElement } from "../functions/toggleElement";

function SoftwareSidebar(props) {
  const missingAuthor = "${uname} not found";

  const [notesTemp, updateNotesTemp] = useState(props.notes);

  function notesHandler(e) {
    e.preventDefault();
    const value = e.target.value.toString();
    updateNotesTemp(value);
    window.localStorage.setItem("notes", value);
  }

  return (
    <>
      <div id="softwareSidebar" className="border sidePanel panel hover scroll">
        <p className="sidebarHeader">=== SOFTWARE ===</p>
        <div>
          {/*}///////////////////////////////////////////////////////////////////////////*/}
          <div
            className="sectionToggler border"
            onClick={() => toggleElement("softwareReadme")}
          >
            <p> READ ME!</p>
          </div>
          <div id="softwareReadme" className="blockText">
            <p>
              Yo choom! There was a load of Netwatch garbage pre-installed here.
              I cleaned it up for you - no prying eyes. In its place I've left
              you some stuff, just some creature comforts. Cyberspace isn't
              always about circ' frying and ice baths. Sometimes it's just
              chill.
            </p>
            <p>
              <em> - shade </em>
            </p>
          </div>
          {/*}///////////////////////////////////////////////////////////////////////////*/}
          <div
            className="sectionToggler border"
            onClick={() => toggleElement("softwareMusic")}
          >
            <p> MUSIC</p>
          </div>
          <div
            id="softwareMusic"
            className="blockText"
            style={{ display: "none" }}
          >
            <p>
              Netrunning is at least -like- 15% cool vibes. Without an ice bath
              or circjock chair, you've got your work cut out for you. This
              should get you about 5% of the way to cool!
            </p>
            {/* /////// LAZERHAWK MUSIC PLAYER /////*/}
            <p
              className="sidebarSubsection hover"
              onClick={() => toggleElement("skullNShark")}
            >
              LAZERHAWK - SKULL AND SHARK
            </p>
            <div id="skullNShark" style={{ display: "none" }}>
              <iframe
                style={{ border: "0", width: "100%", height: "120px" }}
                src="https://bandcamp.com/EmbeddedPlayer/album=3483895767/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/"
                seamless
              >
                <a href="https://lazerhawk.bandcamp.com/album/skull-and-shark">
                  Skull and Shark by Lazerhawk
                </a>
              </iframe>
            </div>

            {/* /////// LORN MUSIC PLAYER /////*/}
            <p
              className="sidebarSubsection hover"
              onClick={() => toggleElement("drownTheTraitorWithin")}
            >
              LORN - DROWN THE TRAITOR WITHIN
            </p>

            <div id="drownTheTraitorWithin" style={{ display: "none" }}>
              <iframe
                style={{ border: "0", width: "100%", height: "120px" }}
                src="https://bandcamp.com/EmbeddedPlayer/album=747035665/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/"
                seamless
              >
                <a href="https://lorn.bandcamp.com/album/drown-the-traitor-within">
                  DROWN THE TRAITOR WITHIN by LORN
                </a>
              </iframe>
            </div>
            {/* /////// MASTER BOOT RECORD MUSIC PLAYER /////*/}
            <p
              className="sidebarSubsection hover"
              onClick={() => toggleElement("virusDos")}
            >
              MASTER BOOT RECORD - VIRUS.DOS
            </p>
            <div id="virusDos" style={{ display: "none" }}>
              <iframe
                style={{ border: "0", width: "100%", height: "120px" }}
                src="https://bandcamp.com/EmbeddedPlayer/album=2662275744/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/"
                seamless
              >
                <a href="https://masterbootrecord.bandcamp.com/album/virus-dos">
                  VIRUS.DOS by MASTER BOOT RECORD
                </a>
              </iframe>
            </div>

            {/* /////// NEON VANDAL MUSIC PLAYER /////*/}
            <p
              className="sidebarSubsection hover"
              onClick={() => toggleElement("megalopolis")}
            >
              NEON VANDAL - MEGALOPOLIS
            </p>
            <div id="megalopolis" style={{ display: "none" }}>
              <iframe
                style={{ border: "0", width: "100%", height: "120px" }}
                src="https://bandcamp.com/EmbeddedPlayer/album=1118027304/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/"
                seamless
              >
                <a href="https://neonvandal.bandcamp.com/album/megalopolis-a-cyberpunk-soundtrack">
                  Megalopolis:A Cyberpunk Soundtrack by Neon Vandal
                </a>
              </iframe>
            </div>
            {/* /////// PERTURBATOR MUSIC PLAYER /////*/}
            <p
              className="sidebarSubsection hover"
              onClick={() => toggleElement("uncannyValley")}
            >
              PERTURBATOR - UNCANNY VALLEY
            </p>

            <div id="uncannyValley" style={{ display: "none" }}>
              <iframe
                style={{ border: "0", width: "100%", height: "120px" }}
                src="https://bandcamp.com/EmbeddedPlayer/album=99843590/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/"
                seamless
              >
                <a href="https://perturbator.bandcamp.com/album/the-uncanny-valley">
                  The Uncanny Valley by PERTURBATOR
                </a>
              </iframe>
            </div>
          </div>
          {/*}///////////////////////////////////////////////////////////////////////////*/}
          <div
            className="sectionToggler border"
            onClick={() => toggleElement("softwareNotes")}
          >
            <p>NOTES</p>
          </div>
          <div
            id="softwareNotes"
            className="blockText"
            style={{ display: "none" }}
          >
            <p>
              There's a lot to remember. If you wanna take some notes, do it
              here. Remember this VM is RAM only. Notes will not persist across
              reloads.
            </p>
            <textarea
              id="notes"
              defaultValue={notesTemp}
              placeholder="write your notes here"
              onChange={(e) =>
                setTimeout(() => {
                  notesHandler(e);
                }, 4999)
              }
              style={{ width: "97%" }}
            ></textarea>
          </div>
          {/*}///////////////////////////////////////////////////////////////////////////*/}
          <div
            className="sectionToggler border"
            onClick={() => toggleElement("softwareThemes")}
          >
            <p>THEMES</p>
          </div>
          <div
            id="softwareThemes"
            className="blockText"
            style={{ display: "none" }}
          >
            <p style={{ color: "rgb(80,80,80)" }}>
              Each netrunner has different preferences for the appearance of
              their terminal. The interface tech on this VM is kinda old so
              there's not a lot for customization. Here's what I could find.
              Click on one to try it out. Warning! Some of them are kinda
              eye-searing compared to my superior dark themes!
            </p>
            <ul>
              <li
                id="darkLowContrast"
                onClick={() => themer("darkLowContrast")}
                style={{ backgroundColor: "white", color: "black" }}
              >
                dark: low contrast (by shade)
              </li>
              <li
                id="darkHighContrast"
                style={{ color: "rgb(80,80,80)" }}
                onClick={() => themer("darkHighContrast")}
              >
                dark: high contrast (by shade)
              </li>
              <li
                id="arasaka"
                style={{ color: "rgb(80,80,80)" }}
                onClick={() => themer("arasaka")}
              >
                arasaka red (by {missingAuthor})
              </li>
              <li
                id="white"
                style={{ color: "rgb(80,80,80)" }}
                onClick={() => themer("white")}
              >
                white (by b@d){" "}
              </li>
              <li
                id="yellow"
                style={{ color: "rgb(80,80,80)" }}
                onClick={() => themer("yellow")}
              >
                yellow (by {missingAuthor}){" "}
              </li>
              <li
                id="BSOD"
                style={{ color: "rgb(80,80,80)" }}
                onClick={() => themer("BSOD")}
              >
                BSOD[legacy] (by 8ug8ear)
              </li>
            </ul>
            <p style={{ textTransform: "uppercase" }}>error: {genRand(14)}</p>
            <p>Themes unvailable. Contact system administrator</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SoftwareSidebar;
