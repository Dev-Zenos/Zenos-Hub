import React, { useState, useEffect } from 'react';
import GitHubImage from '../components/GitHubImage';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ProgressBar from '../components/ProgressBar';
import Stats from '../components/stats';

function ProfileViewer() {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState({});
    const [clanColor, setClanColor] = useState('white');
    const [color, setColor] = useState('white');
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id.toLocaleLowerCase() === 'zenos')
            id = '83e70787-2fcd-4fcb-9c00-811dbd548b94';
        const data = async () => {
            let parsedData = {};
            let clanDatas = {};
            try {
                setLoading(true);
                let res = await fetch(`https://backend-api-2l08.onrender.com/pv?id=${id}`);
                let data = await res.json();
                parsedData = JSON.parse(data);
                res = await fetch("https://backend-api-2l08.onrender.com/clan");
                data = await res.json(); 
                clanDatas = JSON.parse(data);
                if(parsedData.error || clanDatas.error){
                    toast.error(parsedData.error);
                    return navigate('/');
                }
            } catch(err) {
                console.error("Error Loading Data", err);
                toast.error("Error Loading Data");
                return navigate('/');
            } finally {
                if(parsedData.level >= 100){
                    setColor('#dc2626');
                }
                else if(parsedData.level >= 50){
                    setColor('#f59e0b');
                }
                else if (parsedData.level >= 25){
                    setColor('#34d399');
                }

                if(parsedData.clan){
                    let index = clanDatas.results.findIndex(clan => clan.name === parsedData.clan);
                    if(index !== -1){
                        if(index < 3){
                            setClanColor('#fcd34d'); 
                        }
                        else if(index < 8){
                            setClanColor('#9333ea');
                        }
                        else{
                            setClanColor('#3b82f6');
                        }
                    }
                }
                setProfileData(parsedData);
                setLoading(false);
            }     
        };
        data();
    }, [id, navigate]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Short ID copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
            toast.error('Failed to copy Short ID');
        });
    };


    const boxStyle = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1100px',
        height: '600px',
        backgroundColor: 'rgba(31, 41, 55, 0.7)', // Equivalent to bg-gray-800 with 70% opacity
        zIndex: -1,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'MuseoModerno', sans-serif",
    };

    const roundBoxStyle = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) translate(125px, -190px)',
        width: '750px',
        height: '150px',
        backgroundColor: 'rgba(17, 24, 39, 0.7)', // Equivalent to bg-gray-800 with 70% opacity
        zIndex: -1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '25px', // Increased value for more curved corners
    };

    const roundBoxStyle1 = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) translate(125px, 112px)',
        width: '750px',
        height:'320px',
        backgroundColor: 'rgba(17, 24, 39, 0.7)', // Equivalent to bg-gray-800 with 70% opacity
        zIndex: -1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '25px', // Increased value for more curved corners
    };

    return (
        <>
            { loading ? <Spinner /> : 
                <div style={boxStyle}>
                <div style={roundBoxStyle}>
                    <h1 className={`p-4 text-[30px] text-[white]`}>
                        {profileData.name + ` [ `}
                        <span onClick={() => copyToClipboard("#" + profileData.shortId)} style={{ cursor: 'pointer', zIndex: 12 }}>
                            #{profileData.shortId}
                        </span>
                        {` ]`}
                    </h1>
                    <div className={`p-4 text-[30px] text-[white]`}>
                        Level: <span style={{color}}>{profileData.level}</span> 
                        {profileData.clan ? <span className={`p-4`}>Clan: <span style={{color: clanColor}}>{profileData.clan}</span> </span> : <></>}
                    </div>
                </div>
                <div style={roundBoxStyle1}>
                    <Stats stats={profileData} />
                </div>
                <GitHubImage charSkin={profileData.activeBodySkin.name} rarity={profileData.activeBodySkin.rarity} />
                <ProgressBar progress={(profileData.xpSinceLastLevel/(profileData.xpUntilNextLevel)) * 100} text={`${(profileData.xpSinceLastLevel).toLocaleString('en-US')} / ${(profileData.xpUntilNextLevel).toLocaleString('en-US')}`} />
            </div>
            
            }
        </>
    );
}

export default ProfileViewer;
