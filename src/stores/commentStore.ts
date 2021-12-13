import { RootStore } from "./rootStore";

export class CommentStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  newComment = "";
}
