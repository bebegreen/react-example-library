import styled from 'styled-components'; 

export const BookContainer = styled.div`
    display; flex; 
    flex-direction: column; 
    padding: 15px; 
    text-align: center; 
    background: white; 
    justify-content: space-between; 
    font-size: 13px; 
    color: #2e2ebd; 
    position: relative; 
`; 

export const Actions = styled.div`
    position: absolute; 
    right: 5px; 
    top: 5px; 
    color: red; 
    cursor: pointer;  
    &:hover{ 
        background: lightgray; 
    }
    border-radius: 5px;  
    transition: all 0.5s;     
    
`;

export const Edit = styled.div`
    position: absolute; 
    top: 5px; 
    right: 30px; 
    color: green; 
    cursor: pointer; 
    &:hover{ 
        background: lightgray; 
    }
    border-radius: 5px;  
    transition: all 0.35s;     
`; 