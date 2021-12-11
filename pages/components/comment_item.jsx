const defaultAvatarImg =
  "https://gravatar.com/avatar/6ae852fa3a8b1c79dba3f7dc883c1760?s=200&d=mp&r=x";

export function CommentItem(props) {
  return (
    <div>
      <img
        width={50}
        height={50}
        src={props.comment.avatarUrl || defaultAvatarImg}
      ></img>
      <span>{props.comment.user}</span>:<span>{props.comment.text}</span>
    </div>
  );
}
