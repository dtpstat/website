import * as React from "react";

export interface NewsItemProps {
  title: string;
  img: string;
  link: string;
  size?: string;
  text?: string;
  tags?: string[];
}

export const NewsItem: React.VoidFunctionComponent<NewsItemProps> = ({
  title,
  img,
  link,
  size,
  text,
  tags,
}) => {
  return (
    <a className={size ? `news-item-${size}` : "news-item"} href={link}>
      <span className="img-wrap">
        <img src={img} alt={title} />
      </span>
      {tags ? (
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "8px" }}>
          {tags.map((tag) => (
            <button
              key={tag}
              className="btn-rect"
              style={{
                borderRadius: "4px",
                marginRight: "8px",
                marginBottom: "8px",
              }}
            >
              <span className="subtitle3">{tag}</span>
            </button>
          ))}
        </div>
      ) : (
        ""
      )}
      <span className="h3" role="heading" aria-level={3}>
        {title}
      </span>
      {text ? <p className="body2">{text}</p> : ""}
    </a>
  );
};
