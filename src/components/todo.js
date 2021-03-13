import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddWindow from './addWindow';
import { completeItem, remove } from '../store/modules/listItems';
import {
  Container, List, ListItem, Button,
  Modal, Card, Header, Col, Row,
} from './styles';

export default function Todo() {
  const dispatch = useDispatch();
  const listItems = useSelector(state => state.listItems);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [removePayload, setRemovePayload] = useState(null);
  
  const handleComplete = (payload) => {
    dispatch(completeItem(payload));
  };

  const handleOpenRemoveModal = (e, payload) => {
    e.stopPropagation();
    setRemovePayload(payload);
    setOpenRemoveModal(true);
  };

  const handleRemove = () => {
    dispatch(remove(removePayload));
    setRemovePayload(null);
    setOpenRemoveModal(false);
  };

  const renderTodo = (todo, path) => (
    <ListItem key={`todo-${path.join('')}`}>
      {todo.get('title') === 'head'
        ? null
        : <Col
            onClick={() => handleComplete({ path, id: todo.get('id') })}
            completed={todo.get('completed')}
          >
            <input
              type="checkbox"
              checked={todo.get('completed')}
              onChange={(e) => e.stopPropagation()}
            />
            {todo.get('title')}
            {todo.get('completed') && (
              <Button
                type="remove"
                onClick={(e) => handleOpenRemoveModal(e, { path, id: todo.get('id') })}
              >
                remove
              </Button>
            )}
          </Col>
      }
      <List>
        {todo.get('data').map((_todo, _idx) => renderTodo(_todo, [...path, _idx]))}
      </List>
    </ListItem>
  )

  return (
    <Container>
      <List>
        {listItems.map((todo, x) => renderTodo(todo, [x]))}
        <AddWindow />
      </List>
      <Modal
        show={openRemoveModal}
        onClick={() => setOpenRemoveModal(false)}
        onMouseOut={(event) => event.stopPropagation()}
      >
        <Card onClick={(event) => event.stopPropagation()}>
          <Header>{`Are you sure you want to delete item?`}</Header>
            <Row>
              <Button onClick={() => setOpenRemoveModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleRemove}>
                Yes
              </Button>
            </Row>
        </Card>
      </Modal>
    </Container>
  );
};