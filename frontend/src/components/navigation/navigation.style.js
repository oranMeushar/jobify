import styled from '@emotion/styled';




export const NavigationContainer = styled.div`
    background: white;
    padding-top:6vmin;
    height:100%;
    margin-left:${({isBurgerClicked}) => isBurgerClicked ? '-25.5vmin' : '0'};
    transition:all 0.5s linear;
`;

export const LogoContainer = styled.div`
    display:flex;
    align-items:center;
    gap:1vmin;
    width: fit-content;
    margin-bottom: 10vmin;
    padding-left:3.5vmin;
`;

export const LogoText= styled.div`
    font-size: clamp(20px, 5vmin, 40px);
    color: #2cb1bc;
    letter-spacing:0.1vmin;
`;
export const NavigationLinks = styled.div`
     display: flex;
    flex-direction: column;
    gap: 4vmin;
    font-size: clamp(1.5rem, 3vmin, 2.3rem);
    list-style-type: none;
    

    & li{
        padding:1vmin;
        padding-left:4vmin;
    }

    & li:hover{
        background-color:#F5FDFF;
    }
    & li:hover > a{
        transform: translateX(0.5rem);
    }

    & a{
        text-decoration: none;
        transition:transform 0.3s linear;
        color:black;
        display:flex;
        align-items: center;
        gap:2.5vmin;
        white-space: nowrap;
    }

    & a.active{
        color:blue
    }
`;

