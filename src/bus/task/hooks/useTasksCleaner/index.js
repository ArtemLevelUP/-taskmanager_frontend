// Core
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

// Book
import { book } from '../../../../navigation/book';

// Mutations
const removeTasks = loader('./gql/mutationRemoveAllTasks.graphql');

export const useTasksCleaner = () => {
    const [RemoveAllTasks, { error }] = useMutation(removeTasks);
    const history = useHistory();

    const removeAllTasks = async () => {
        try {
            const { data } = await RemoveAllTasks();

            if (data) {
                history.push(book.tasks);
            }
            return data;
        } catch (error) {
            console.log(error.message);
        }
    };

    return {
        error,
        removeAllTasks,
    }
}
