import React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import { Debug } from '../components/Debug';
import * as Yup from 'yup';
import { EditorState } from 'draft-js';
import { RichEditorExample } from '../components/RichEditor';

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
  editorState: new EditorState.createEmpty(),
};

const Invitation = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        friends: Yup.array().of(
          Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string()
              .email('Invalid email!')
              .required('Required'),
          })
        ),
      })}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ values, isSubmitting, handleBlur, setFieldValue }) => (
        <Form>
          <RichEditorExample
            editorState={values.editorState}
            onChange={setFieldValue}
            onBlur={handleBlur}
          />
          <FieldArray name="friends">
            {({ push, remove }) => (
              <React.Fragment>
                {values.friends &&
                  values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div className="row">
                      <div className="col">
                        <Field name={`friends[${index}].name`}>
                          {({ field, form }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Jane Doe"
                            />
                          )}
                        </Field>
                        <ErrorMessage name={`friends[${index}].name`}>
                          {msg => <div className="field-error">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="col">
                        <Field
                          name={`friends[${index}].email`}
                          type="email"
                          placeholder="jane@example.com"
                        />
                        <ErrorMessage name={`friends[${index}].email`}>
                          {msg => <div className="field-error">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="col">
                        <button type="button" onClick={() => remove(index)}>
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => push({ name: '', email: '' })}
                  className="secondary"
                >
                  Add Friend
                </button>
              </React.Fragment>
            )}
          </FieldArray>
          <button type="submit" disabled={isSubmitting}>
            Invite
          </button>
          <Debug />
        </Form>
      )}
    </Formik>
  </div>
);

export default Invitation;

// editorState: new EditorState.createEmpty(),

// Yup.object({
//   friends: Yup.array().of(
//     Yup.object({
//       name: Yup.string().required('Required'),
//       email: Yup.string()
//         .email('Invalid email')
//         .required('Required'),
//     })
//   ),
// })
