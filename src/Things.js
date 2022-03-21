import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { thingsVar } from './cache';

import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PrimaryButton, List, Panel, Stack, TextField } from '@fluentui/react';

export const GET_THINGS = gql`
  query GetThings {
    things @client
  }
`

const Things = () => {
  
  const [showAdd, setShowAdd] = React.useState(false)
  const { data, loading, error } = useQuery(GET_THINGS);
  
  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>ERROR: {error.message}</p>;

  console.log('data', data);

  const onRenderCell = (item) => {
    return (
      <div className="item" data-is-focusable={true}>
        <h1>{item.name}</h1>
        <Link to={`/things/${item.id}`}>View</Link>
      </div>
    )
  }
  
  return (<>
    <h1>Things</h1>
    <Stack>
      <List items={data?.things} onRenderCell={onRenderCell} />
      <PrimaryButton onClick={() => setShowAdd(true)}>
        Add Thing
      </PrimaryButton>
    </Stack>

    <Panel
      isOpen={showAdd}
      isLightDismiss
      onDismiss={() => setShowAdd(false)}
      headerText="Add Thing"
    >
      <Formik
       initialValues={{ name: '' }}
       onSubmit={(values, { setSubmitting }) => {
          const id = Math.random().toString(36).substring(2, 15)
          const newThing = { id: id, name: values.name }
          thingsVar([...thingsVar(), newThing])
          setShowAdd(false)
       }}
     >
       {({ isSubmitting }) => (
         <Form>
            <Stack tokens={{childrenGap: 10}}>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="TextField" />
              <PrimaryButton type="submit" disabled={isSubmitting}>
                Submit
              </PrimaryButton>
            </Stack>
         </Form>
       )}
     </Formik>

    </Panel>

  </>)
}

export default Things
