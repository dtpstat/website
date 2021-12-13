import { action, observable } from "mobx";

import { Comment } from "../types";
import { RootStore } from "./rootStore";

const sampleComments: Comment[] = [
  {
    id: 1,
    text: "информация о верификации данных, если координаты изменены при обработке (координаты отличаются от заявленных ГИБДД, но прошли подтверждение модератором).",
    user: "Павел Кучерягин",
    date: new Date().toUTCString(),
    avatarUrl:
      "https://robohash.org/6ae852fa3a8b1c79dba3f7dc883c1760?set=set4&bgset=&size=200x200",
  },
  {
    id: 2,
    text: "Оставленная пользователями дополнительная/уточняющая информация",
    user: "Anna Kravtz",
    date: new Date().toUTCString(),
  },
];

export class CommentStore {
  rootStore: RootStore;
  private newCommentText = "";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  set newComment(text: string) {
    this.newCommentText = text;
  }

  @observable
  comments = sampleComments;

  @action
  addComment() {
    const comment = {
      id: this.nextId,
      user: "anon",
      date: new Date().toUTCString(),
      text: this.newCommentText,
    };
    this.comments = [...this.comments, comment];
  }

  get nextId() {
    return this.comments.length;
  }
}
