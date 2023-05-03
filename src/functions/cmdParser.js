export function commandParser(command) {
  const input = command.toLowerCase()
  const cmd = command.split(" ")
  const program = cmd[0].toLowerCase()
  let output = "";

  if (cmd[1] === "--help" || cmd[1] === "-h") {
    switch (program) {
      case "cat":
        output = helpAssembler(input, "Print the contents of a file");
            break;
      case "cd":
        output = helpAssembler(input, "Navigates to a directory. Append with a valid directory name");
            break;
      case "clear":
        output = helpAssembler(input, "Clear the terminal");
            break;
      case "cmds":
        output = helpAssembler(input, "Lists available terminal commands");
            break;
      case "exit":
        output = helpAssembler(input, "Exits session. All virtual machine environment data is erased!");
            break;
      case "file":
        output = helpAssembler(input, "Prints metadata of file. Append with a valid file name");
            break;
      case "irc":
        output = helpAssembler(input, "Moves session to Internet Relay Chat client. Append with a valid IRC server IP address");
            break;
      case "ls":
        output = helpAssembler(input, "List files in current directory");
            break;
      case "scp":
        output = helpAssembler(input, "Copies a file to a networked location. Append with a valid file name and IP address");
            break;
      case "ssh":
        output = helpAssembler(input, "Securely spawn a shell session on a remote system. Append with a valid remote IP address");
            break;
      case "steghide":
        output = helpAssembler(input, "Prints any information that was hidden in a file using steganography tools. Append with a valid filename");
            break;
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
        output = argumentsChecker(cmd, 3);
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
  } else if (command.length < number) {
    return helpAssembler(command, "too few arguments");
  } else if (command.length > number) {
    return helpAssembler(command, "too many arguments");
  }
  // if arguments number is correct, output cmd and arguments as object
  if (number === 1) {
    return { cmd: command[0] };
  } else if (number === 2) {
    return { cmd: command[0], arg1: command[1] };
  } else if (number === 3) {
    return { cmd: command[0], arg1: command[1], arg2: command[2] };
  }
}

function helpAssembler(command, statement) {
  return { cmd: command, helpStatement: statement };
}
