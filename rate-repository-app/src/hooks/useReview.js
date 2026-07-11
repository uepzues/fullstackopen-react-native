import { useQuery } from "@apollo/client/react";
import { GET_REVIEWS } from "../graphql/queries";

const useReview = (id, variables = { first: 5 }) => {
    const queryVariables = { repositoryId: id, ...variables };

    const { data, loading, error, fetchMore } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: queryVariables
    })

    const reviews = data?.repository?.reviews;

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage

        if(!canFetchMore){
            return
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...queryVariables
            }
        })
    }

    return { reviews, loading, error, fetchMore: handleFetchMore };
};

export default useReview;