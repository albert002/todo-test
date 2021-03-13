import { fromJS, List } from 'immutable';
import { v4 as uuid } from 'uuid';

const ADD_NEW_ITEM = 'todo/ADD_NEW_ITEM';
const COMPLETE_ITEM = 'todo/COMPLETE_ITEM';
const REMOVE_COMPLETED_ITEM = 'todo/REMOVE_COMPLETED_ITEM';

const initialState = fromJS([{
  id: uuid(),
  title: 'head',
  data: [],
  completed: false
}]);

export const addNewItem = (payload) => ({ type: ADD_NEW_ITEM, payload });
export const completeItem = (payload) => ({ type: COMPLETE_ITEM, payload });
export const remove = (payload) => ({ type: REMOVE_COMPLETED_ITEM, payload });

export default function reducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_NEW_ITEM: 
      const destination = payload.path.reduce((acc, part) => 
        acc.push(part).push('data'),
        List()
      );
      return state.updateIn(
        destination,
        data => data.push(fromJS({
          id: uuid(),
          title: payload.item,
          data: [],
          completed: false
        })));

    case COMPLETE_ITEM:
      const complete_destination = payload.path.reduce((acc, part, index) => (
        (index === payload.path.length - 1 && acc)
        || acc.push(part).push('data')
      ), List() );

      let idCompleted = false;

      const updatedState = state.updateIn(
        complete_destination,
        data => data.map((item) => {
          if (item.get('id') === payload.id) {
            idCompleted = !item.get('completed')
            return item.set('completed', idCompleted)
          }
          return item;
        })
      );

      const child_destination = payload.path.reduce((acc, part, index) => (
        acc.push(part).push('data')
      ), List() );

      const childe = updatedState.updateIn(
        child_destination,
        data => data.map((item) => item.update('completed', value => idCompleted))
      );

      const subChilde = childe.updateIn(
        child_destination,
        data => data.map((item) => 
          item.update('data', sumItem => sumItem.map(
            key => key.set('completed', idCompleted)
          ))
        )
      );

      return subChilde.updateIn(
        complete_destination,
        data => data.sort((a, b) => (
          a.get('completed') - b.get('completed')
        ))
      );

    case REMOVE_COMPLETED_ITEM:
      const remove_destination = payload.path.reduce((acc, part, index) => (
        (index === payload.path.length - 1 && acc)
        || acc.push(part).push('data')
      ), List() );
      return state.updateIn(
        remove_destination,
        data => data.filter((item) => (
          item.get('id') !== payload.id
        ))
      );

    default: return state;
  }
};
