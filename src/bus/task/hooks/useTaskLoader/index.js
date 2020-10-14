// Core
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
// Queries
const queryTasks = loader('./gql/queryTask.graphql');

export const useTaskLoader = () => {
    const { data, error, refetch, loading } = useQuery(queryTasks);

    return {
        loading,
        refetch,
        tasks: data && data.tasks,
    }
}
