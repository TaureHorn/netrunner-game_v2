export function cmdParser(command, username) {
  const cmd = command.split(" ");
  const prependReturn = (username + command).toString();

  switch (cmd[0]) {
    //// CAT //////////////////////////////////////////////////////////
    case "cat":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result: "Print content of a file",
        };
      } else {
        return {
          cmd: prependReturn,
          result: "data goes here",
        };
      }
    //// CLEAR  //////////////////////////////////////////////////////////
    case "clear":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result: "Clear the terminal",
        };
      } else {
        return {};
      }
    //// CMDS  //////////////////////////////////////////////////////////
    case "cmds":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result: "lists available terminal commands",
        };
      } else {
        return {
          cmd: prependReturn,
          result: "cat, clear, cmds, exit, file, irc, ls, scp, ssh, steghide",
          result2:
            "Append any of these commands with --help or -h to learn what it does",
        };
      }
    //// EXIT  //////////////////////////////////////////////////////////
    case "exit":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result: "Exits session. erases all virtual machine environment data",
        };
      } else {
        shutDown();
        return {
          cmd: prependReturn,
          result: "Erasing Virtual Machine Environment",
        };
      }
    //// FILE  //////////////////////////////////////////////////////////
    case "file":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result: "Prints metadata of file. Append with file name",
        };
      } else {
        return {
          cmd: prependReturn,
          result: "data goes here",
        };
      }
    //// IRC  //////////////////////////////////////////////////////////
    case "irc":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result:
            "Moves session to Internet Relay Chat. Append with IRC server IP address",
        };
      } else {
        return {
          cmd: prependReturn,
          result: "data goes here",
        };
      }
    //// LS  //////////////////////////////////////////////////////////
    case "ls":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result: "List files in current directory",
        };
      } else {
        return {
          cmd: prependReturn,
          result: "data goes here",
        };
      }
    //// SCP  //////////////////////////////////////////////////////////
    case "scp":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result:
            "Copies a file to a networked location. Append with file name and network IP address.",
        };
      } else {
        return {
          cmd: prependReturn,
          result: (
            "moved file " +
            cmd[1] +
            " to location " +
            cmd[2]
          ).toString(),
        };
      }
    //// SSH  //////////////////////////////////////////////////////////
    case "ssh":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result:
            "Securely spawn shell session on remote system. Append with remote system IP address",
        };
      } else {
        return {
          cmd: prependReturn,
          result: "...attempting to migrate tty session to shell @" + cmd[1],
        };
      }
    //// STEGHIDE  //////////////////////////////////////////////////////////
    case "steghide":
      if (cmd[1] === "--help" || cmd[1] === "-h") {
        return {
          cmd: prependReturn,
          result:
            "Prints any infomation hidden in a file using steganography. Append with filename.",
        };
      } else {
        return {
          cmd: prependReturn,
          result: "data goes here",
        };
      }
    //// DEFAULT  //////////////////////////////////////////////////////////
    default:
      const err = (cmd[0] + ": command not found ...").toString();
      return {
        cmd: prependReturn,
        result: err,
      };
  }

  function shutDown() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("gameState");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
}
