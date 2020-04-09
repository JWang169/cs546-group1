import React from 'react';

const NameCard = (props) =>{
    return (
        <div className="ui card">
            <div className="content">{props.children}</div>
            <div className="extra content">
                <div className="ui two buttons">
                    <div className="ui basic green button">Details</div>
                    <div className="ui basic blue button">Contact</div>
                </div>
            </div>
        </div>

    )
};

export default NameCard;


