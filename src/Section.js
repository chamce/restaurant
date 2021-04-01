import React, { Component } from 'react';
import Item from './Item.js';

export default function Section(props) {
    let section = props.section;
    let n = section.id * 10;
    return (
        <>
            <h2>{props.section.name}</h2>
            <div className="accordion accordion-flush" id={"accordionFlushParent" + n}>
                {section.items.map((item, index) => <Item item={item} parentNumber={n} number={n + index} key={index}></Item>)}
            </div>
        </>
    );
}