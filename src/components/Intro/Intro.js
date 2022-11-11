import ReactPlayer from "react-player";
import {VscMute, VscUnmute} from "react-icons/vsc"
import styled from "styled-components";
import { useState } from "react";
function Intro(props) {
    const [IsMuted, setIsMuted] = useState(false);
    return (
        <IntroContainer>
            <ReactPlayer
                playing={true}
                loop={true}
                width="100% "
                height="100%"
                volume={1}
                muted={IsMuted}
                url="https://vimeo.com/761577999"
                className="videoIntro"
            />
            <div className="infoIntro">
                <h1 className="headingIntro">VieWie | “Together”</h1>
                <p className="overviewIntro">Nudo collaborated with Sebastien Grainger of Death From Above 1979 to provide the music to “Together", showcasing Netflix's divers content, and that when it comes to Netflix, you’re likely to share six shows in common with any other member, anywhere in the world.</p>
            </div>
            {
                IsMuted ? (
                    <VscMute className="btnVolume"
                       onClick={() => setIsMuted(prev => !prev)}
                    />
                ) : (
                    <VscUnmute className="btnVolume"
                        onClick={() => setIsMuted(prev => !prev)}
                    />
                )
            }
            
            <div className="faceBottom"></div>
        </IntroContainer>
    )
}
export default Intro;
const IntroContainer = styled.div`
    background-color: var(--color-background);
    position: relative;
    color: var(--color-white);
    padding-top: 55%;

    .videoIntro{
        position: absolute;
        top: 0;
        left: 0;
    }

    .infoIntro{
        position: absolute;
        top: 140px;
        left: 30px;

        @media screen and (max-width: 800px){
            top: 120px;
            left: 25px;
        }
    
        @media screen and (max-width: 600px){
            top: 100px;
            left: 15px;
        }

        .headingIntro{
            font-size: 60px;
            transition: all 0.3s ease;   

            @media screen and (max-width: 800px){
                font-size: 40px;
            }
    
            @media screen and (max-width: 600px){
                font-size: 25px;
            }
        }

        .overviewIntro{
            max-width: 550px;
            width: 100%;
            line-height: 1.3;
            padding-top: 25px;
            font-size: 18px;

            @media screen and (max-width: 800px){
                font-size: 16px;
            }

            @media screen and (max-width: 600px){
                font-size: 10px;
            }
        }
    }

    .btnVolume{
        position: absolute;
        width: 40px;
        height: 40px;
        right: 10%;
        top: 50%;
        cursor: pointer;
        border-radius: 50%;
        padding: 6px;
        color: #bbb;
        border: #fff solid 1px;
        transition: all 0.3s ease;
        transform: scale(1);
        &:hover{
            color: #fff;
            transform:  scale(1.2);
        }

        @media screen and (max-width: 800px){
            width: 30px;
            height: 30px;
            padding: 4px;
        }

        @media screen and (max-width: 600px){
            width: 20px;
            height: 20px;
            padding: 1px;
        }
    }

    .faceBottom{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        background-color: linear-gradient(
            180deg,
            transparent,
            rgba(15,15,15,0.6) 40%,
            rgb(17,17,17)
        )
    }
`;