import styled from '@emotion/styled';

export const StatsContainer = styled.div`
    padding:3vmin;
    width:100%;
    height:80vh;
    overflow-y: auto;
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

export const CardsContainer = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    justify-content:space-between;
    gap:2vmin;
`;



