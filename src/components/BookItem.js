import React from 'react'
import './BookList.css';

export default function BookItem(props) {
    return (
        <div id="bookContainer">
            <div>
                <img 
                    src={props.image == null ? "Image NA" : props.thumbnail} 
                    style={{ width: 200 }} 
                    alt=""
                    />
            </div>
            <div id="textContainer">
                <a href={props.link} target="_blank">Link: {props.name}</a>
                <p>Description: {props.description}</p>
                <p>Category: {props.category == null ? "NA" : props.category}</p>
            </div>
        </div>
    )
}
