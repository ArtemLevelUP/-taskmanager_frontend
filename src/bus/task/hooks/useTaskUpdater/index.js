// Core
import { loader } from 'graphql.macro';
import {
    useMutation,
} from '@apollo/react-hooks';
import {book} from '../../../../navigation/book';
import { useHistory } from 'react-router-dom';

// Queries
const updateOneTask = loader('./gql/mutationUpdateTask.graphql');

export const useTaskUpdater = () => {
    const [ UpdateTask, { error }] = useMutation(updateOneTask);
    const history = useHistory();
    const updateTask = async (id, task, refetch) => {
        try {
            const { data } = await UpdateTask({
                variables: {
                    id,
                    task
                }
            });

            if (data) {
                history.push(book.tasks);
            }
            refetch();

            return data;
        } catch (error) {
            console.log(error.message);
        }
    };

    return {
        error,
        updateTask
    }
};