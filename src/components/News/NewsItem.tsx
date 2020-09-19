import React from 'react';
import { Colors } from 'components/ui/Colors';

type Props = { size?: string, title: string; img: string, link: string };

const NewsItem = ({ size, title, img, link }: Props) => {
    return (
        <a className={size ? `news-item-${size}` : 'news-item'} href={link}>
            <span className="img-wrap">
              <img src={img} alt={title}/>
            </span>
            <span className="h3">{title}</span>
        </a>
    );
};

export default NewsItem;
