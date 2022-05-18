import styled from '@emotion/styled';

export const CardContainer = styled.div`
    background-color:white;
    padding:2vmin;
    width:50vmin;
    border-radius: 0.8rem;
    border-bottom: ${({color}) => `8px solid ${color}`};
    div{
        display: flex;
        align-items: center;
        width:100%;
        justify-content: space-between;
        padding: 0 1vmin;
        font-size: 4vmin;
        color:${({color}) => color};

        span{
            background-color:${({background}) => background};
            padding:2.4vmin 3vmin;
            border-radius: 0.5rem;
        }
    }

    p{
        font-size: 3vmin;
        margin:3vmin 0;
        transform:translateX(1.2vmin);
    }
`;




