import React from 'react';

function News(props) {

    const {data, date, url, image} = props;

    return (
        <div id="item">
            <img src={image} id="img" alt="No Image"/>
            <div id="data">{data}</div>
            <div id="date">Published On: {date}</div>
            <div><a href={url} id="button" target="_blank">Read More...</a></div>
        </div>
    )
}

export default News;