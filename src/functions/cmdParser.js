export function commandParser(command) {
  const input = command.toLowerCase();
  const cmd = command.split(" ");
  const program = cmd[0].toLowerCase();
  let output = "";

  if (cmd[1] === "--help" || cmd[1] === "-h") {
    switch (program) {
      case "cat":
        output = helpAssembler(input, "Print the contents of a file");
        break;
      case "cd":
        output = helpAssembler(
          input,
          "Navigates to a directory. Append with a valid directory name"
        );
        break;
      case "clear":
        output = helpAssembler(input, "Clear the terminal");
        break;
      case "cmds":
        output = helpAssembler(input, "Lists available terminal commands");
        break;
      case "exit":
        output = helpAssembler(
          input,
          "Exits session. All virtual machine environment data is erased!"
        );
        break;
      case "file":
        output = helpAssembler(
          input,
          "Prints metadata of file. Append with a valid file name"
        );
        break;
      case "irc":
        output = helpAssembler(
          input,
          "Moves session to Internet Relay Chat client. Append with a valid IRC server IP address"
        );
        break;
      case "ls":
        output = helpAssembler(input, "List files in current directory");
        break;
      case "scp":
        output = helpAssembler(
          input,
          "Copies a file to a networked location. Append with a valid file name, ip address and password"
        );
        break;
      case "ssh":
        output = helpAssembler(
          input,
          "Securely spawn a shell session on a remote system. Append with a valid remote IP address"
        );
        break;
      case "steghide":
        output = helpAssembler(
          input,
          "Prints any information that was hidden in a file using steganography tools. Append with a valid filename"
        );
        break;
      default:
        output = helpAssembler(input, "command not found");
    }
  } else {
    switch (program) {
      case "clear":
      case "cmds":
      case "exit":
      case "ls":
        output = argumentsChecker(cmd, 1);
        break;
      case "cat":
      case "cd":
      case "file":
      case "irc":
      case "ssh":
      case "steghide":
        output = argumentsChecker(cmd, 2);
        break;
      case "scp":
        output = argumentsChecker(cmd, 4);
        break;
      default:
        output = helpAssembler(input, "command not found");
    }
  }
  return output;
}

export function ircCommandParser(command) {
  const input = command.toLowerCase();
  const cmd = command.split(" ");
  const program = cmd[0].toLowerCase();

  let output = "";
  if (cmd[1] === "--help" || cmd[1] === "-h") {
    switch (program) {
      case "cmds":
        output = helpAssembler(input, "Lists available terminal commands");
        break;
      case "exit":
        output = helpAssembler(
          input,
          "Exits irc session and returns to host terminal session"
        );
        break;
      case "messages":
        output = helpAssembler(input, "Displays window for channel messages");
        break;
      case "pm":
        output = helpAssembler(
          input,
          "start a private chat with a user. append with user alias"
        );
        break;
      case "private":
        output = helpAssembler(input, "Displays window for private messages");
        break;
      case "t":
        output = helpAssembler(
          input,
          "Send a message to the channel/user. Append with message content"
        );
        break;
      case "users":
        output = helpAssembler(input, "Displays window for channel users");
        break;
      default:
        output = helpAssembler(input, "command not found");
    }
  } else {
    switch (program) {
      case "cmds":
      case "exit":
        output = argumentsChecker(cmd, 1);
        break;
      case "messages":
        output = argumentsChecker(cmd, 1);
        break;
      case "pm":
        output = argumentsChecker(cmd, 2);
        break;
      case "private":
        output = argumentsChecker(cmd, 1);
        break;
      case "t":
        output = argumentsChecker(cmd, 100);
        break;
      case "users":
        output = argumentsChecker(cmd, 1);
        break;
      default:
        output = helpAssembler(input, "command not found");
    }
  }
  return output;
}

export function convoParser(command) {
  const input = command.toLowerCase();
  const cmd = command.split(" ");
  const program = cmd[0].toLowerCase();

  let output = "";
  if (cmd[1] === "--help" || cmd[1] === "-h") {
    switch (program) {
      case "cmds":
        output = helpAssembler(input, "Lists available terminal commands");
        break;
      case "option":
        output = helpAssembler(
          input,
          "Select conversation option. Append with number"
        );
        break;
      default:
        output = helpAssembler(input, "command not found");
    }
  } else {
    switch (program) {
      case "cmds":
        output = argumentsChecker(cmd, 1);
        break;
      case "option":
        output = argumentsChecker(cmd, 2);
        break;
      default:
        output = helpAssembler(input, "command not found");
    }
  }
  return output;
}

function argumentsChecker(command, number) {
  // check for correct number of arguments
  if (command[command.length - 1] === "") {
    return helpAssembler(command, `"" is not a valid argument`);
  } else if (number === 100) {
    // used to bypass argument length checking for inputs with variable numbers of arguments
    return cmdAssembler(command, number);
  } else if (command.length < number) {
    return helpAssembler(command, "too few arguments");
  } else if (command.length > number) {
    return helpAssembler(command, "too many arguments");
  } else {
    return cmdAssembler(command, number);
  }
}

function cmdAssembler(command, number) {
  // if arguments number is correct, output cmd and arguments as object
  if (number === 1) {
    return { cmd: command[0] };
  } else if (number === 2) {
    return { cmd: command[0], arg1: command[1] };
  } else if (number === 4) {
    return { cmd: command[0], arg1: command[1], arg2: command[2], arg3: command[3] };
  } else if (number === 100) {
    // used for commands with inputs of a string, therefore varaible number of arguments
    const message = command.slice(1).join(" ");
    return { cmd: command[0], arg1: message };
  }
}

function helpAssembler(command, statement) {
  return { cmd: command, helpStatement: statement };
}
