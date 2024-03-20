import { atom } from "recoil";

const loggedInUserAtom = atom({
  key: "loggedInUserAtom",
  default: {},
});

export default loggedInUserAtom;
