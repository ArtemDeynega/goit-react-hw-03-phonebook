import styled from '@emotion/styled';

export const Item = styled.ul`
  width: 400px;
`;

export const ListItem = styled.li`
  display: flex;
  margin: 10px;
  margin-left: 20px;
  list-style: none;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  margin-left: 20px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid gray;

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.bGcolorBlue};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const InputFilter = styled.input`
  margin-left: 10px;

  outline: 0;
  outline-offset: 0;
`;
export const InputLabel = styled.label`
  display: block;
  margin-left: 20px;
  margin-top: 20px;
`;
