import React from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { thingsVar } from './cache';

import { DefaultButton } from '@fluentui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PrimaryButton, Panel, Stack, TextField } from '@fluentui/react';


export const GET_THING = gql`
  query GetThing($id: String!) {
    thing(id: $id) @client {
      id
      name
    }
  }
`


const Thing = () => {

  const [params] = useSearchParams()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(GET_THING, { variables: { id } });

  const [showEdit, setShowEdit] = React.useState(false)
  const [depth, setDepth] = React.useState(0)


  React.useEffect(() => {
    setShowEdit(params.get('mode') === 'edit')
  }, [params]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>ERROR: {error.message}</p>;

  const thing = data.thing
  const dismiss = () => {
    setShowEdit(false)
    navigate(-1)
  }
  
  return (<>
    <h1>Thing</h1>
    <h2>{thing?.name}</h2>
    
    <Stack horizontal tokens={{childrenGap: 7}}>
      <PrimaryButton
        text="Edit"
        onClick={() => navigate(`/things/${thing.id}?mode=edit`)}
      />
      <DefaultButton
        text="Delete"
        onClick={() => window.history.back()}
      />
    </Stack>

    <Panel
      isOpen={showEdit}
      isLightDismiss
      onDismiss={() => dismiss()}
      headerText="Edit Thing"
    >
      <Formik
       initialValues={thing}
       onSubmit={(values, { setSubmitting }) => {
          const newThing = values
          thingsVar([...thingsVar().filter(t => t.id !== thing.id), newThing])
          dismiss()
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

export default Thing
