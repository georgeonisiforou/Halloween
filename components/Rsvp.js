import React, { use, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  font-family: "IM Fell English";

  @media (max-width: 768px) {
    height: unset;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
`;

const FormContainer = styled.div`
  width: clamp(320px, 40vw, 650px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1rem 2rem;
  border-radius: 8px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  font-family: "IM Fell English";
  height: 40px;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
`;

const Submit = styled.button`
  width: 130px;
  font-family: "IM Fell English";
  height: 50px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  border: none;
  background-color: #8a0303;
  transition: all 0.5s ease;

  &:active {
    transform: translateY(3px);
  }

  &:hover {
    background-color: rgb(240, 107, 38);
  }
`;

const Error = styled.div`
  color: red;
`;

const SubmittedMsg = styled.p`
  font-family: "Shadows Into Light", cursive;
  font-size: 1.5rem;
`;

const CreepyContainer = styled.div`
  width: clamp(320px, 40vw, 600px);
  height: 482px;
  border-radius: 8px;
  background-image: url("/gifs/pennywise-it.gif");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Rsvp = () => {
  const [submitted, setSubmitted] = useState(false);

  const audioRef = useRef();

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (submitted === true) {
      playAudio();
    }
  }, [submitted]);

  const userSchema = yup.object({
    firstName: yup
      .string()

      .min(3, "Must be at least 3 characters long")
      .required("Required!"),
    lastName: yup
      .string()
      .required("Required!")
      .min(3, "Must be at least 3 characters long"),
    email: yup.string().email("Must be a valid email").required("Required!"),
    numOfPersons: yup
      .number()
      .typeError("Please enter a number")
      .required("Required!")
      .min(1, "You cannot enter less than 1 person")
      .max(3, "You cannot bring more than 3 persons"),
  });

  const sendData = async (values) => {
    await axios
      .post("http://localhost:3001/send", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Title>Please RSVP below:</Title>
      <audio
        ref={audioRef}
        src="/music/bill-youll-float-too-sound-effect.mp3"
      ></audio>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          numOfPersons: 0,
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          sendData(values);

          setSubmitted(true);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form>
            {submitted ? (
              <CreepyContainer>
                <SubmittedMsg>You&apos;ll float too!</SubmittedMsg>
              </CreepyContainer>
            ) : (
              <FormContainer>
                <InputContainer>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputContainer>
                {errors.firstName && touched.firstName ? (
                  <Error>{errors.firstName}</Error>
                ) : null}
                <InputContainer>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputContainer>
                {errors.lastName && touched.lastName ? (
                  <Error>{errors.lastName}</Error>
                ) : null}
                <InputContainer>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputContainer>
                {errors.email && touched.email ? (
                  <Error>{errors.email}</Error>
                ) : null}
                <InputContainer>
                  <Label>Number of Persons</Label>
                  <Input
                    type="text"
                    name="numOfPersons"
                    placeholder="Number of Persons"
                    value={values.numOfPersons}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={(e) => (e.target.value = "")}
                  />
                </InputContainer>
                {errors.numOfPersons && touched.numOfPersons ? (
                  <Error>{errors.numOfPersons}</Error>
                ) : null}
                <Submit
                  type="submit"
                  onClick={() => {
                    if (submitted === true) {
                      playAudio();
                    }
                  }}
                >
                  RSVP
                </Submit>
              </FormContainer>
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Rsvp;
