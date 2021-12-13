import { CommentStore } from "./commentStore";

export interface RootStoreProps {
  rootStore?: RootStore;
}

export class RootStore {
  static storeName = "rootStore";
  commentStore: CommentStore;

  constructor() {
    this.commentStore = new CommentStore(this);
  }
}
