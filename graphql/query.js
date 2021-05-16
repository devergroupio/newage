import gql from 'graphql-tag';

export const FETCH_REWARDS = gql`
  query fetchReward {
    reward {
      id
      description
      cost
    }
  }
`;

export const FETCH_USER_BY_ID = gql`
  query fetchUserById(
    $id: String!
    $dayStart: timestamptz!
    $dayEnd: timestamptz!
  ) {
    customer_by_pk(id: $id) {
      actived_at
      created_at
      phone_number
      first_name
      current_point
      last_name
      id
    }
    customer_history(
      where: {
        customer_id: { _eq: $id }
        created_at: { _gte: $dayStart, _lte: $dayEnd }
        point: { _gt: 0 }
      }
    ) {
      id
    }
  }
`;

export const FETCH_HISTORIES = gql`
  query fetchHistories($id: String!) {
    customer_history(
      where: { customer_id: { _eq: $id } }
      limit: 20
      order_by: { id: desc }
    ) {
      id
      customer_id
      desc
      point
      created_at
    }
  }
`;

export const FETCH_PLUS_POINT = gql`
  query fetchPlusPoint {
    config {
      plus_point
    }
  }
`;
