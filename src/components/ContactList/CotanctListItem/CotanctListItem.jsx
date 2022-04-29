import PropTypes from 'prop-types';
import { ListItem, Button } from '.';
export const ContactListItem = ({ name, number, id, deleteItem }) => {
  return (
    <ListItem>
      {name} : {number}
      <Button type="button" onClick={() => deleteItem(id)}>
        Delete
      </Button>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
};
