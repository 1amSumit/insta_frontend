import { atom } from "recoil";

const createPostAtom = atom.createPostAtom({
  key: "createPostAtom",
  default: false,
});

export default createPostAtom;
