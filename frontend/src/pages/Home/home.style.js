import styled from '@emotion/styled';


export const LogoContainer = styled.div`
    display:flex;
    align-items:center;
    gap:1vmin;
    width: fit-content;
    margin-bottom: 30vmin;
`;

export const LogoText= styled.div`
    font-size: clamp(20px, 5vmin, 40px);
    color: #2cb1bc;
    letter-spacing:0.1vmin;
`;

export const HomeContainer= styled.div`
    min-height: 100vh;
    padding-top:6vmin;
    padding-left: 6vmin;
    position:relative;
   
`;
export const TitleAndButtonContainer= styled.div`
`;
export const MainTitle= styled.div`
    font-weight: 600;
    font-size: 8vmin;
    margin-bottom: 4vmin;
    & > span{
        color:#2cb1bc;
    }
`;
export const SubTitle= styled.div`
    font-size: 4.5vmin;
    width: 85vmin;
    margin-bottom: 4vmin;
    line-height:6.5vmin;
    /* color:white; */
    /* -webkit-text-stroke: 0.5px white; */
`;

export const Button= styled.button`
    background: #2cb1bc;
    outline:none;
    cursor: pointer;
    border:none;
    padding:2vmin 1vmin;
    font-size: 4vmin;
    color:white;
    border-radius: 0.6rem;

    transition: all 0.3s linear;
    :hover{
        transform: scale(1.04);
        box-shadow: 0.3rem 0.3rem 1.5rem rgba(0, 0, 0, 0.5);
    }
`;
export const DetectiveImage= styled.img`
   position:absolute;
   right:0;
   bottom:0;
`;

