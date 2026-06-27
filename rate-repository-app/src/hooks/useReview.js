import { useQuery } from "@apollo/client/react";
import { GET_REVIEWS } from "../graphql/queries";

const useReview = (id) => {
    const { data, loading, error } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: id }
    })
    const reviews = data?.repository?.reviews;
    return { reviews, loading, error };
};

export default useReview;