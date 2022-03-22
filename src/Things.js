import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { thingsVar } from './cache';

import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PrimaryButton, List, Panel, Stack } from '@fluentui/react';

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

  const onRenderCell = (item) => {
    return (
      <div 
        className="item"
        data-is-focusable={true}
      >
        <h2 style={{marginBottom: 7}}>{item.name}</h2>
        <Link to={`/things/${item.id}`}>View</Link>
      </div>
    )
  }
  
  return (<>
    <h1>Things</h1>
    <Stack tokens={{childrenGap: '1rem'}}>
      <p>
        <em>
          Here is a typical list of things like you will find on many views of an app. Go ahead and
          add a new thing. Note how after you do so, if you hit the Back button (in menu or browser,
          you are not taken back into the add panel, but instead are taken to wherever you came from.
        </em>
      </p>
      <List items={data?.things} onRenderCell={onRenderCell} />
      <Stack horizontal tokens={{childrenGap: '1rem'}}>
        <PrimaryButton onClick={() => setShowAdd(true)}>
          Add Thing
        </PrimaryButton>
      </Stack>
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
