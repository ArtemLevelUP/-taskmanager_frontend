// Core
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

// Book
import { book } from '../../../../navigation/book';

const removeOneTask = loader('./gql/mutationRemoveTask.graphql');

export const useTaskCleaner = () => {
    const [ RemoveTask, { error }] = useMutation(removeOneTask);
    const history = useHistory();

    const removeTask = async (id, refetch) => {
        try {
            const { data } = await RemoveTask({
                variables: {
                    id
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
        removeTask
    }
}