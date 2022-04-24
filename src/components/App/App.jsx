import { Component } from 'react';
import shortid from 'shortid';
import { toast, ToastContainer } from 'react-toastify';
import { SectionTitle } from 'components/Title';
import { ContactEditor } from 'components/ContactEditor';
import { ContactList } from 'components/ContactList';

import { GlobalStyles } from 'GlobalStyles/GlobalStyles';

const initalState = {
  contacts: [],
  filter: '',
};
export class App extends Component {
  state = {
    ...initalState,
  };
  #localStorageContactsKey = 'contacts';
  componentDidMount() {
    const localStorageContacts = localStorage.getItem(
      this.#localStorageContactsKey
    );

    if (localStorageContacts) {
      const contacts = JSON.parse(localStorageContacts);
      this.setState({ contacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        this.#localStorageContactsKey,
        JSON.stringify(this.state.contacts)
      );
    }
  }
  onAddContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    const contactJson = JSON.stringify(newContact);
    console.log(contactJson);

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
