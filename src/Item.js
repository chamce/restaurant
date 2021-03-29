import React, { Component } from 'react';

export default function Item(props) {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id={"flush-heading" + props.number}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + props.number} aria-expanded="false" aria-controls={"flush-collapse" + props.number}>
                        {props.item.name}</button>
                </h2>
                <div id={"flush-collapse" + props.number} className="accordion-collapse collapse" aria-labelledby={"flush-heading" + props.number} data-bs-parent="#accordionFlushExample">
                    <div className="card accordion-body mx-auto">
                        <img src="..." className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">{props.item.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}