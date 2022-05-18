import styled from '@emotion/styled';


export const HeaderContainer = styled.div`
    padding:7vmin 0;
    display: flex;
    justify-content:space-around;
    align-items:baseline;
    height: fit-content;
    background-color:white;
`;

export const HeaderTitle = styled.div`
    font-size: 4vmin;
    font-weight: 500;
`;

export const ButtonContainer = styled.div`
    position:relative;
    display: flex;
    align-items:center;
    gap:1vmin;
    font-size:2vmin;
    background: #2cb1bc;
    border-radius: 0.5rem;
    padding:1vmin 0.5vmin;
    cursor:pointer;
    color:white;
    perspective: 250px;

    & >:nth-child(1){
       font-size:3vmin ;
       transform:translateY(2px);
    }
    & >:nth-child(3){
       transform:translateY(1px);
    }
`;

export const Burger = styled.img`
    width:3vmin;
    height:3vmin;
    cursor: pointer;

`;
export const LogOutButton= styled.div`
        position:absolute;
        width:100%;
        height:100%;
        top:105%;
        left:0;
        background-color: #2cb1bc;
        border-radius: 0.5rem;
        display: grid;
        place-items: center;
        transform-style: preserve-3d;
        transform-origin:center top;
        transform: rotateX(95deg);
        transition:all 0.3s linear;
        transform: ${({isClicked}) =>  isClicked ? 'rotateX(0)' : 'rotateX(90deg)'};
        opacity: ${({isClicked}) =>  isClicked ? '1' : '0'};

`;



