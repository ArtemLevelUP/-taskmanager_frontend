// Core
import React from 'react';
import {
  MessageBar, MessageBarType,
  PrimaryButton,
  Text
} from 'office-ui-fabric-react';
import { Field, Form, Formik } from 'formik';
import { FormikTextField } from 'formik-office-ui-fabric-react';

// Hooks
import { useTaskCreator } from "../../customer/hooks/useTaskCreator";

// Validators
import { validateInput } from '../../validators/validateInput';

// Styles
import styles from './styles.module.scss';

export const TaskCreator = ({refetch}) => {
  const { createTask, error } = useTaskCreator();

  const send = (task) => {
    createTask(task, refetch);
  };

  const errorJSX = error && (
    <MessageBar messageBarType={MessageBarType.error}>
      {error.message}
    </MessageBar>
  );

  const initialValues = {
    title: '',
    description: ''
  };

  const CreateTaskForm = ({
   isValid,
  }) => (
    <Form>
      <Field
        name="title"
        component={FormikTextField}
        label='Title'
        validate={validateInput}
        required
        placeholder='Please add your task title'
      />
      <Field
        name="description"
        component={FormikTextField}
        label='Description'
        validate={validateInput}
        required
        placeholder='Please add your task description'
      />
      <PrimaryButton
        text='Send'
        type='submit'
        disabled={!isValid}
        className={styles.send}
      />
    </Form>
  )

  return (
    <section className={styles.taskCreator}>
      <Text variant='xxLarge'>
        Create new Task
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={send}
        component={CreateTaskForm}
      />
      {errorJSX}
    </section>
  )
};
