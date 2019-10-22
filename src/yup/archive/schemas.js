import * as Yup from 'yup'

const schemas = {
  registerCompany: Yup.object().shape({
    companyName: Yup.string()
      .strict()
      .min(2, 'Company name should be at least ${min} characters.')
      .typeError('Company name should be a type of ${type}')
      .required('Company name is a required field'),
    companyRegistrationNumber: Yup.string()
      .length(14, 'Must be 14 digits long')
      .matches(/[0-9]{14}/, 'All characters must be digits from 0 to 9')
      .required('Required'),
    mobilePhone: Yup.string()
      .matches(/^([\\(]{0,1}[\\+]{0,1}[\\(]{0,1}([3][8][1]){0,1}[\\)]{0,1}[- \\.\\/]{0,1}[\\(]{0,1}[0]{0,1}[\\)]{0,1}[6]{1,1}([0-6]|[9]){1,1}[\\)]{0,1}[- \\.\\/]{0,1}(([0-9]{6,7})|([0-9]{2,3}[- \\.\\/]{0,1}[0-9]{2,4}[- \\.\\/]{0,1}[0-9]{0,3})))$/,
        {message: 'Phone number format is incorrect', excludeEmptyString: true }),
    email: Yup.string().email(),
    city: Yup.string(),
    country: Yup.string(),
    iso2Code: Yup.string().min(2).max(3),
    countryRegion: Yup.string(),
    longitude: Yup.number(),
    latitude: Yup.number(),
    about: Yup.string(),
    rating: Yup.number(),
    numberOfRatings: Yup.number(),
    username: Yup.string().min(5).max(20),
    accessRole: Yup.string()
      .oneOf(['ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST'], 'Access role must be either one of ROLE_USER, ROLE_ADMIN or ROLE_GUEST'),
    password: Yup.string(),
    confirmedPassword: Yup.string()
  })
};

export default schemas;