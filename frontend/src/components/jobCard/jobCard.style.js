import styled from '@emotion/styled';


export const CapitalLetter = styled.div`
    font-size: clamp(20px, 6vmin, 40px);
    font-weight: 600;
    color: white;
    background: #2cb1bc;
    padding: 1vmin;
    border-radius: 0.8rem;
    width: clamp(40px, 8vmin, 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    height: clamp(30px, auto, 50px);
`;

export const JobCardContainer = styled.div`
    background-color:white;
    padding:2vmin;
    border-radius: 0.6rem;
    margin-bottom: 1vmin;
`;
export const CardTitleContainer = styled.div`
    display:flex;
    gap:3vmin;
    align-items:center;
    padding-bottom: 2vmin;
    border-bottom: 1px solid grey;
    margin-bottom: 2vmin;
`;
export const TitlesText = styled.div`
    font-size: 2.5vmin;
    line-height: 4vmin;
`;

export const CardMainContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(min-content, 1fr));
    gap:2vmin;
    font-size: 2vmin;

    & p{
        display: flex;
        align-items: center;
        gap:1vmin;
    }
    & p:nth-of-type(4){
        border-radius: 0.6rem;
        background-color:${({background}) => `${background}`};
        color:${({color}) => color}; 
        justify-self: flex-start;
        padding: 1vmin 3vmin;
        
    }


`;
export const CardFooter = styled.div`
    display:flex;
    align-items: center;
    gap:2vmin;
    margin-top:4vmin;
`;
export const Button = styled.div`
    border-radius: 0.6rem;
    font-size: 2.8vmin;
    background-color:${({background}) => background};
    padding:0.3vmin 1vmin;
    color:${({color}) => color}; 
    cursor:pointer;
`;

