    import { useState } from 'react';

    const GitHubImage = ({ charSkin, rarity }) => {
    const imageUrl = `https://kirka.lukeskywalk.com/static/renders/Character/${charSkin}-render.png`;
    //const defaultImageUrl = 'https://github.com/SheriffCarry/KirkaSkins/blob/main/Characters/James-render.png?raw=true';
    const defaultImageUrl = 'https://kirka.lukeskywalk.com/static/renders/Character/James-render.png';
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
    let color = 'white';
    if(rarity === 'COMMON'){
        color = '#1fd655';
    }
    else if(rarity === 'RARE'){
        color = '#ADD8E6';
    }
    else if(rarity === 'EPIC'){
        color = '#FFD700';
    }
    else if(rarity === 'LEGENDARY'){
        color = 'gold';
    }
    else if(rarity === 'MYTHICAL'){
        color = 'red';
    }

    const handleImageError = () => {
        setCurrentImageUrl(defaultImageUrl);
    };

    const imageStyle = {
        width: `${232 * 0.85}px`,
        height: `${509 * 0.85}px`,
        transform: 'scaleX(-1) translate(-30px, 80px)',
    };

    const textStyle = {
        color,
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '30px',
        fontWeight: 'bold',
        transform: 'translate(-420px, 85px)',
    };

    return (
        <div style={{ textAlign: 'center', zIndex:-2 }}>
        <img
            src={currentImageUrl}
            alt="GitHub Image"
            onError={handleImageError}
            style={imageStyle}
        />
        <div style={textStyle}>
            [{charSkin}]
        </div>
        </div>
    );
    };

    export default GitHubImage;
