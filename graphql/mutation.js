import gql from 'graphql-tag';

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomerById(
    $id: String!
    $object: customer_set_input!
    $objectHistory: customer_history_insert_input!
  ) {
    update_customer_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
    }
    insert_customer_history_one(object: $objectHistory) {
      customer_id
    }
  }
`;

export const CREATE_NEW_CUSTOMER_BEEN_DELETED = gql`
  mutation CreateNewCustomerBeenDelete(
    $object: customer_insert_input!
    $objectHistory: customer_history_insert_input!
  ) {
    insert_customer_one(object: $object) {
      id
    }
    insert_customer_history_one(object: $objectHistory) {
      customer_id
    }
  }
`;

export const BUY_BUNDLE = gql`
  mutation buyBundle(
    $id: String!
    $objectCustomer: customer_set_input!
    $objectHistory: customer_history_insert_input!
  ) {
    update_customer_by_pk(pk_columns: { id: $id }, _set: $objectCustomer) {
      id
    }
    insert_customer_history_one(object: $objectHistory) {
      id
    }
  }
`;

export const EARN_POINT_PER_DAY = gql`
  mutation earnPointPerDay(
    $id: String!
    $objectCustomer: customer_set_input!
    $objectHistory: customer_history_insert_input!
  ) {
    update_customer_by_pk(pk_columns: { id: $id }, _set: $objectCustomer) {
      id
    }
    insert_customer_history_one(object: $objectHistory) {
      id
    }
  }
`;
