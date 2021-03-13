import styled from 'styled-components';

export const Container = styled.div`
  min-height: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px #000000;
  padding: 10px;
`;

export const Label = styled.label`
  color: #686868;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: auto;
`;

export const Input =  styled.input`
  background: #F1F4FF;
  box-sizing: border-box;
  width: 300px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #3f50b5;
  padding: 0 30px;
  font-weight: 500;
  font-size: 18px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #909ad1;
  }
`;

export const Button = styled.button`
  border: ${({ type }) => type !== 'remove' ? '1px solid #3f50b5' : 0};
  border-radius: 10px;
  font-size: 18px;
  color: #3f50b5;
  background: none;
  padding: 5px 30px;
  min-width: ${({ type }) => type !== 'remove' ? '195px' : 0};
  cursor: pointer;
  display: ${({ type }) => type !== 'remove' ? 'block' : 'inline-block'};
  :focus {
    outline: none;
  }
  :hover {
    background: ${({ type }) => type !== 'remove' ? '#d7dbf5' : 'none'};
  }
  :active {
    background: ${({ type }) => type !== 'remove' ? '#bfc6f1' : 'none'};
    color: #283cad;
  }
`;

export const Select = styled.select`
  background: #F1F4FF;
  box-sizing: border-box;
  width: 300px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #3f50b5;
  padding: 0 30px;
  margin: 15px;
  font-weight: 500;
  font-size: 18px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #909ad1;
  }
`;

export const Header = styled.div`
  color: #3f50b5;
  font-size: 25px;
`;

export const Modal = styled.div`
  z-index: 100;
  display: flex;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width:100vw;
  background: rgba(0,0,0,0.5);
  transition: all 0.5s;
`;

export const Card = styled.div`
  min-width: 500px;
  min-height: 300px;
  box-sizing: border-box;
  border-radius: 44px;
  background: #fff;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const DropDown = styled.div`
  background: #F1F4FF;
  box-sizing: border-box;
  width: 300px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #3f50b5;
  padding: 0 30px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  min-width: 300px;
  z-index: 20;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  color: #3f50b5;
  font-size: 18px;
  font-weight: 500;
`;

export const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
`;

export const Col = styled.div`
  text-decoration: ${({ completed }) => completed && 'line-through'};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
