import { useState } from 'react';
import s from './List.module.css';
import { getContacts } from '../../redux/contacts/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { delContact } from '../../redux/contacts/contactsSlice';
import { filterContact } from 'redux/filter/filterSlice';
import { getFilter } from '../../redux/contacts/selectors';

export const Filter = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  console.log(filter);
  const [onFilter, setOnFilter] = useState('');
  const dispatch = useDispatch();
  const filteredContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(onFilter.toLowerCase())
    );
  };

  const onFinder = e => {
    setOnFilter(e.target.value);
    dispatch(filterContact(e.target.value));
  };

  const deleteName = id => {
    dispatch(delContact(id));
  };

  return (
    <>
      <h3>Find contact by name</h3>
      <form className={s.finder}>
        <input type="text" onChange={onFinder} />
      </form>
      <ul className={s.list}>
        {filteredContacts().map(({ id, name, number }) => {
          return (
            <li key={id} className={s.listItem}>
              {name}: {number}
              <button
                className={s.delBtn}
                type="button"
                onClick={() => deleteName(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
