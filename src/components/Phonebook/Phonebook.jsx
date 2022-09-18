// import shortid from 'shortid';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/phonebook/filterSlice';
import SubmitForm from '../SubmitForm/SubmitForm';
import Contacts from '../Contacts/Contacts';
import Filter from '../Filter/Filter';
import {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} from '../../redux/phonebook/contactsSlice';

export function Phonebook() {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const [addContact, { isLoading }] = useAddContactMutation();
  const [deleteContact, { isLoading: isLoadindDel }] =
    useDeleteContactMutation();

  const onFormResponse = data => {
    for (const contact of contacts) {
      if (contact.name === data.name) {
        alert('This name already exist!');
        return;
      }
    }
    addContact({
      // id: shortid.generate(),
      name: data.name,
      number: data.number,
    });
  };

  const onDeleteContact = contactId => {
    deleteContact(contactId);
  };

  const onInputFilter = evt => {
    dispatch(changeFilter(evt.currentTarget.value));
  };

  const { data: contacts, isFetching } = useGetContactsQuery();

  return (
    <div>
      <h1>Phonebook</h1>
      <SubmitForm onSend={onFormResponse} />
      <h2>Contacts</h2>
      <Filter filter={filter} onInputFilter={onInputFilter} />
      {isLoadindDel && <h3>LOADING...</h3>}
      {isFetching && <h3>LOADING...</h3>}
      {isLoading && <h3>LOADING...</h3>}
      {contacts && (
        <Contacts
          contacts={contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )}
          onDeleteContact={onDeleteContact}
        />
      )}
    </div>
  );
}

export default Phonebook;
