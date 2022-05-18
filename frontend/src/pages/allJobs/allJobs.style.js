import styled from '@emotion/styled';

export const AllJobsContainer = styled.div`
    width:100%;
    height:80vh;
    overflow-y: auto;
    h1{
        width:95%;
        margin:4vmin auto;
        font-size: 4.5vmin;
    }

    ::-webkit-scrollbar {
        width: 20px;
    }
    
    ::-webkit-scrollbar-thumb {
    background: #7FB5FF;
    border-radius: 100px;
    background-clip: padding-box;
    border: 6px solid rgba(0, 0, 0, 0);
  }
`;

export const SearchFormContainer = styled.div`
        display:flex;
        flex-direction: column;
        background: white;
        padding:4vmin;
        margin:5vmin auto 0 auto;
        width:95%;
        border-radius: 0.6rem; 
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

    & select{
        padding:0.8vmin;
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
    align-self: flex-end;
    grid-column: span 2;
    width:60%;
    justify-self: center;
`; 
    
    
    
export const JobsListContainer = styled.div`
    display:grid;
    grid-template-columns: repeat(2, minmax(min-content, 1fr));
    gap:2vmin;
    width:95%;
    margin:0 auto;

`;
    
    
    
    