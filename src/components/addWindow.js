import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewItem } from '../store/modules/listItems';
import {
  Label, Button, Input, Modal, Card, Header, DropDown,
  DropDownListContainer, List, ListItem,
} from './styles';

export default function AddWindow() {
  const dispatch = useDispatch();
  const listItems = useSelector(state => state.listItems);
  const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState([0]);
  const [selectedText, setSelectedText] = useState('head');
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const toggling = () => setIsOpenDropDown(!isOpenDropDown);

  const handleSelectValue = (path, text) => {
    setSelectedValue(path);
    setSelectedText(text);
    toggling();
  }

  const handleAdd = (path) => {
    dispatch(addNewItem({ path, item: value }))
    setValue('');
    setSelectedText('head')
    setSelectedValue([0]);
    setModalOpen(false);
  };

  const renderOptions = (todo, path) => (
    <ListItem
      key={`todo-${path.join('')}`}
    >
      <p onClick={() => handleSelectValue(path, todo.get('title'))}>
        {todo.get('title')}
      </p>
      {path.length < 3 &&
        <List>
          {todo.get('data').map((_todo, _idx) => renderOptions(_todo, [...path, _idx]))}
        </List>
      }
      
    </ListItem>
  )

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Add Item</Button>
      <Modal
        show={modalOpen}
        onClick={() => setModalOpen(false)}
        onMouseOut={(e) => e.stopPropagation()}
      >
        <Card onClick={(e) => e.stopPropagation()}>
          <Header>Add item</Header>
          <Label>
            Parent element
            {' '}
            <div>
              <DropDown onClick={toggling}>{selectedText}</DropDown>
              {isOpenDropDown && (
                <DropDownListContainer>
                  <List>
                    {listItems.map((todo, index) => renderOptions(todo, [index]))}
                  </List>
                </DropDownListContainer>
              )}
            </div>
          </Label>
          <Label>
            Title
            {' '}
            <Input
              placeholder="Text input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Label>
          <Button onClick={() => handleAdd(selectedValue)}>add</Button>
        </Card>
      </Modal>
    </>
  )
}