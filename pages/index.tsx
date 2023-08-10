import { gql, useMutation, useQuery } from "@apollo/client";

const INCREMENT_COUNTER = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input)
  }
`;
const PostQuery = gql`
  query getPosts {
    text
  }
`;

export default function Home() {
  const [mutateFunction, { data, loading, error }] =
    useMutation(INCREMENT_COUNTER);

  return (
    <div>
      <button
        onClick={() =>
          mutateFunction({
            variables: { input: { text: "hello", name: "buy" } },
          })
        }
      >
        enter
      </button>
    </div>
  );
}
