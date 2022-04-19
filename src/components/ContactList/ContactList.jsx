import PropTypes from 'prop-types';
import { InputLabel, InputFilter, ListItem, Button, Item } from '.';

export const ContactList = ({ contacts, onDelete, value, onChangeFiter }) => {
  return (
    <>
      <InputLabel>
        Find contacts by name
        <InputFilter
          type="text"
          value={value}
          onChange={onChangeFiter}
          placeholder="Enter name"
        />
      </InputLabel>
      <Item>
        {contacts.map(({ name, number, id }) => (
          <ListItem key={id}>
            {name} : {number}
            <Button type="button" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </Item>
    </>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func,
  value: PropTypes.string.isRequired,

  onChangeFiter: PropTypes.func,
};
