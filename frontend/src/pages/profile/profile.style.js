 import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
    width:100%;

    & form{
        display:flex;
        flex-direction: column;
        background: white;
        padding:4vmin;
        margin:5vmin auto 0 auto;
        width:95%;
        border-radius: 0.6rem;
    }
    
    
`;

export const FormTitle = styled.div`
    font-size: 6vmin;
    margin-bottom: 6vmin;
`;

export const FieldsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(min-content, 1fr));
    gap:2vmin;

    & label{
        display: flex;
        flex-direction: column;
        font-size: 3vmin;
        & span{
            margin-bottom:1.5vmin;
        }
    }

    @media (max-width: 1000px) {
        grid-template-columns: repeat(2, minmax(min-content, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(1, minmax(min-content, 1fr));
    }
`;

export const ButtonContainer = styled.div`
    align-self: center;
    justify-self: center;
    grid-row: 1 / span 2;
    grid-column:  3 / 4;


    @media (max-width: 1000px) {
        grid-row: 3 / 4;
        grid-column:  1 / 2;
    }

    @media (max-width: 600px) {
        grid-row: 5 / 6;
        grid-column:  1 / 2;
    }

`;
export const Button = styled.button`
    outline:none;
    font-size: 2.7vmin;
    border:1px solid black;
    padding:0.5vmin 6vmin;
    border-radius: 0.4rem;
    cursor:pointer;
    background-color:${({color}) => `#${color}`};
    color:white;
`; 
    
    
    
    
    
    
    
    