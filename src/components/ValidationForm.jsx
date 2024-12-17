import React, { useState } from "react";

const ValidationForm = () => {
  // ---STATE---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    age: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [submittedData, setSubmittedData] = useState(null);

  // ---COMPORTEMENTS---
  /* gérer la soumission du formulaire */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Étape 1 : Valider tous les champs et mettre à jour les erreurs
    const updatedErrors = validateAllFields();
    setErrors(updatedErrors);

    // Étape 2 : Marquer tous les champs comme touchés
    markAllFieldsAsTouched();

    // Étape 3 : Vérifier si le formulaire est valide
    const isFormValid = Object.values(updatedErrors).every(
      (error) => error === ""
    );

    if (isFormValid) {
      console.log("Form submitted successfully!", formData);
      setSubmittedData(formData); // Sauvegarde des données pour l'affichage
    } else {
      console.log("Please correct the errors before submitting.");
    }
  };

  // Fonction pour valider tous les champs
  const validateAllFields = () => {
    return Object.keys(formData).reduce((acc, name) => {
      const error = validateField(name, formData[name]);
      if (error) acc[name] = error;
      return acc;
    }, {});
  };

  // Fonction pour marquer tous les champs comme touchés
  const markAllFieldsAsTouched = () => {
    setTouched(
      Object.keys(touched).reduce((acc, name) => {
        acc[name] = true;
        return acc;
      }, {})
    );
  };

  /* gérer en direct les changements dans les champs d'input */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    /* const {name, value} = event.target */ //autre manière de faire

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    if (touched[name]) {
      setErrors((prev) => {
        return { ...prev, [name]: validateField(name, value) };
      });
    }
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    /* const {name, value} = event.target */ //autre manière de faire

    setTouched((prev) => {
      return { ...prev, [name]: true };
    });

    setErrors((prev) => {
      return { ...prev, [name]: validateField(name, value) };
    });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "This field is required." : "";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address.";
      case "password":
        return value.length >= 6
          ? ""
          : "Password must be at least 6 characters.";
      case "confirmPassword":
        return value !== formData.password || value.length < 6
          ? "Passwords do not match."
          : "";
      case "age":
        return isNaN(value) || value < 12 || value > 120
          ? "Age must be a number between 12 and 120."
          : "";
      case "phone":
        return /^\d{10,}$/.test(value)
          ? ""
          : "Phone number must be at least 10 digits.";
      default:
        return "";
    }
  };

  // ---RENDER---
  return (
    <div className="body">
      <div className="div_form">
        <h1>Form validation</h1>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.firstName && touched.firstName
                ? "notValidate"
                : touched.firstName
                ? "validate"
                : "neutre"
            }
          />
          <p>{errors.firstName}</p>

          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.lastName && touched.lastName
                ? "notValidate"
                : touched.lastName
                ? "validate"
                : "neutre"
            }
          />
          <p>{errors.lastName}</p>

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.age && touched.age
                ? "notValidate"
                : touched.age
                ? "validate"
                : "neutre"
            }
          />
          <p>{errors.age}</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? "notValidate"
                : touched.email
                ? "validate"
                : "neutre"
            }
          />
          <p>{errors.email}</p>

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.phone && touched.phone
                ? "notValidate"
                : touched.phone
                ? "validate"
                : "neutre"
            }
          />
          <p>{errors.phone}</p>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.password && touched.password
                ? "notValidate"
                : touched.password
                ? "validate"
                : "neutre"
            }
          />
          <p>{errors.password}</p>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "notValidate"
                : touched.confirmPassword
                ? "validate"
                : "neutre"
            }
          />
          <p>{errors.confirmPassword}</p>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="listData">
        {submittedData && (
          <div>
            <h2>Submitted Data</h2>
            <ul>
              {Object.entries(submittedData).map(([name, value]) => (
                <li key={name}>
                  <strong>{name}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationForm;
