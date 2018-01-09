import styled from 'styled-components'; 

export const BooksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(227px, 1fr));
    grid-gap: 1px;
    max-width: 1120px; 
    margin: 0 auto; 
    padding: 30px; 
`;
