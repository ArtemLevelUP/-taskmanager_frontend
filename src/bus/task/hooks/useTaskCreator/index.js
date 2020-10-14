// Core
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import {book} from '../../../../navigation/book';
import { useHistory } from 'react-router-dom';
// Mutations
const mutationAddTask = loader('./gql/mutationCreateTask.graphql');

export const useTaskCreator = () => {

    const [_addTask, {error}] = useMutation(mutationAddTask);

    const history = useHistory();

    const createTask = async (task, refetch) => {
        try {
            const {data} = await _addTask({
                variables: {
                    task
                }
            });

            if (data) {
                history.push(book.tasks);
            }
        }
        catch (error) {
            console.log(error.message);
        }
        refetch();
    };

    return {
        error,
        createTask,
    }
};

