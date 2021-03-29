import React, { Component } from 'react';
import Item from './Item.js';

export default function Section(props) {
    return (
        <>
            <h2>{props.section.name}</h2>
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {props.section.items.map((item, index) => <Item item={item} number={props.section.id * 10 + index} key={index}></Item>)}
            </div>
        </>
    );
}