import React, { Component } from 'react';
import Item from './Item.js';

export default function Section(props) {
    let section = props.section;
    let n = section.id * 10;
    return (
        <>
            {/* section name */}
            <h2>{props.section.name}</h2>
            {/* section is an accordion; each accordion needs a unique id */}
            <div className="accordion accordion-flush" id={"accordionFlushParent" + n}>
                {/* map all of section's items to item components; send item's parent id and make item's id unique to parent */}
                {section.items.map((item, index) => <Item item={item} parentNumber={n} number={n + index} key={index}></Item>)}
            </div>
        </>
    );
}