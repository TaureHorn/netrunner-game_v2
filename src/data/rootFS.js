import { File } from "../functions/classes";

export const rootFS = {
  boot: new File(
    "boot",
    "elf",
    "root systemd init storage",
    "root",
    "root",
    "permission denied",
    "permission denied"
  ),

  etc: new File(
    "etc",
    "elf",
    "root systemd storage",
    "root",
    "root",
    "permission denied",
    "permission denied"
  ),

  usr: new File(
    "usr",
    "elf",
    "storage systemd",
    "root",
    "root",
    "permission denied",
    "permission denied"
  ),
}
