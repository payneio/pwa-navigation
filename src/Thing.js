import React from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { thingsVar } from './cache';

import { DefaultButton, Dialog, DialogFooter, DialogType } from '@fluentui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PrimaryButton, Panel, Stack } from '@fluentui/react';


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
  const [showConfirm, setShowConfirm] = React.useState(false)


  // Having an empty array for the useEffect deps makes this block run only the first time the
  // component loads.
  React.useEffect(()  => {
    // We don't let the user start at an edit panel or a delete confirmation.
    // Either situation would be somewhat weird, and it simplifies the edge cases quite a bit.
    if (params.get('mode'))
      navigate({ replace: true })
  }, [])

  // Set our modals based on the URL query params.
  React.useEffect(() => {
    setShowEdit(params.get('mode') === 'edit')
    setShowConfirm(params.get('mode') === 'delete')
  }, [params]);

  // Alternate views for data error conditions.
  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data?.thing) return <h1>Thing not found</h1>

  const thing = data?.thing

  // A panel can be dismissed in a few ways, so we define the function here.
  const dismissEdit = () => {
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
        onClick={() => navigate(`/things/${thing.id}?mode=delete`)}
      />
    </Stack>

    <Dialog
      hidden={!showConfirm}
      onDismissEdit={() => setShowConfirm(false)}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: 'Delete Thing',
        subText: 'Are you sure you want to delete Thing?',
      }}
      modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: 450 } },
      }}
    >
      <em>
        Note: We want to be able to use the Back button to dismiss a delete confirmation, so we
        use navigate here, too. BUT we don't want anyone to deep-link to a ?mode=delete URL, so we
        strip it if found in the URL on first load.
      </em>
      <DialogFooter>
        <PrimaryButton onClick={() => {
          thingsVar([...thingsVar().filter(t => t.id !== thing.id)])
          // We navigate back twice here because we want to get back to wherever we were before we
          // viewed the (now deleted) item.
          navigate(-2)
        }} text="Yes" />
        <DefaultButton onClick={() => navigate(-1)} text="No" />
      </DialogFooter>
    </Dialog>

    <Panel
      isOpen={showEdit}
      isLightDismiss
      onDismiss={() => dismissEdit()}
      headerText="Edit Thing"
    >
      <Formik
        initialValues={thing}
        onSubmit={(values, { setSubmitting }) => {
          const newThing = values
          thingsVar([...thingsVar().filter(t => t.id !== thing.id), newThing])
          dismissEdit()
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
      <p>
        <em>
          Note: We want to be able to use the Back button to dismiss this Edit panel, so we
          use navigate here. This also allows this Edit panel to be deep-linked.
        </em>
      </p>
      <p>
        <em>
          However this panel is dismissed (canceled, confirmed, or using the Back button) it uses
          pops the navigation stack for nice, consistent behavior.
        </em>
      </p>
    </Panel>
  </>)
}

export default Thing
