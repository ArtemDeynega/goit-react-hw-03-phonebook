import { Component } from 'react';
import shortid from 'shortid';
import { toast, ToastContainer } from 'react-toastify';
import { SectionTitle } from 'components/Title';
import { ContactEditor } from 'components/ContactEditor';
import { ContactList } from 'components/ContactList';

import { GlobalStyles } from 'GlobalStyles/GlobalStyles';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  onAddContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    contacts.find(
      contact => newContact.name.toLowerCase() === contact.name.toLowerCase()
    )
      ? toast.warn('Такой пользователь уже есть 🤪 ', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };
  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    toast.success('Контакт удален 👌', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  changeFilter = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContact = this.getVisibleContact();

    return (
      <>
        <SectionTitle title="Phonebook">
          <ContactEditor onSubmit={this.onAddContact} />
        </SectionTitle>
        <SectionTitle title="Contacts">
          <ContactList
            contacts={visibleContact}
            onDelete={this.onDeleteContact}
            value={filter}
            onChangeFiter={this.changeFilter}
          />
        </SectionTitle>
        <GlobalStyles />
        <ToastContainer />
      </>
    );
  }
}
