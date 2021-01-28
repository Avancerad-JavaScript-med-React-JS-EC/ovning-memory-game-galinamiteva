import React from 'react';

//TODO
//Denna komponent ska vara ett memorykort som innehåller en siffra
//Den ska ha ett klickevent som håller koll på vilket kort du har klickat på
//När man klickar på det ska du dynamiskt lägga till CSS-klassen "flip"

function MemoryCard(props) {
    return (
        <article className="memory-card">
            <span className="front"></span>
            <span className="back">Memory</span>
        </article>
    )
}

export default MemoryCard;