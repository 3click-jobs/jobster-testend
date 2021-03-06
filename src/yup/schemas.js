import * as Yup from 'yup'

const schemas = {
  registerCompany: Yup.object().shape({
    companyName: Yup.string()
      .nullable()
      .matches(/^[_A-Za-z0-9-]{2,}$/, 'Company name is not valid.')
      .required('Company name must be provided.'),
    companyRegistrationNumber: Yup.string()
      .nullable()
      .matches(/^[0-9]{14}$/, 'Company registration number is not valid, can contain only numbers and must be exactly 14 numbers long.')
      .required('Company registration number must be provided.'),
    mobilePhone: Yup.string()
      .nullable()
      .matches(/^([\(]{0,1}[\+]{0,1}[\(]{0,1}([3][8][1]){0,1}[\)]{0,1}[- \.\/]{0,1}[\(]{0,1}[0]{0,1}[\)]{0,1}[6]{1,1}([0-6]|[9]){1,1}[\)]{0,1}[- \.\/]{0,1}(([0-9]{6,7})|([0-9]{2,3}[- \\.\\/]{0,1}[0-9]{2,4}[- \\.\\/]{0,1}[0-9]{0,3})))$/,
        { message: 'Mobile phone number is not valid.', excludeEmptyString: true })
      .required('Phone number must be provided.'),
    email: Yup.string()
      .nullable()
      .max(50, 'E-mail must be maximum ${max} characters long.')
      .required('E-mail must be provided.')
      .matches(/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/, 'Email is not valid.'),
    city: Yup.string()
      .nullable()
      .matches(/^[A-Za-z\s]{2,}$/, 'City name is not valid.')
      .required('City must be provided.'),
    country: Yup.string()
      .matches(/^[A-Za-z\s]{2,}$/, 'Country name is not valid.'),
    iso2Code: Yup.string()
      .matches(/^[A-Za-z]{2,3}$/, 'ISO2 code is not valid.'),
    countryRegion: Yup.string()
      .matches(/^[A-Za-zĆćČčĐđŠšŽž\.\s]{0,}$/, 'Country region name is not valid.'),
    longitude: Yup.number()
      .min(-180, 'Longitude  must be ${min} or higher!')
      .max(180, 'Longitude must be ${max} or lower!'),
    latitude: Yup.number()
      .min(-90, 'Latitude  must be ${min} or higher!')
      .max(90, 'Latitude must be ${max} or lower!'),
    about: Yup.string()
      .max(255, 'About must be maximum ${max} characters long.'),
    rating: Yup.number()
      .min(0).max(5),
    numberOfRatings: Yup.number().min(0),
    username: Yup.string()
      .nullable()
      .required('Username must be provided.')
      .min(5, 'Username must be at least ${min} characters long.')
      .max(20, 'Username must be at most ${max} characters long.'),
    accessRole: Yup.string()
      .nullable()
      .required('User role must be provided.')
      .oneOf(['ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST'], 'Role is not valid, must be ROLE_ADMIN, ROLE_USER or ROLE_GUEST"'),
    password: Yup.string()
      .nullable()
      .required('Password must be provided.')
      // .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{5,}/, 'Password is not valid, must contain at least 1 upper case letter, 1 lower case letter and 1 digit, no whitespace allowed.')
      .matches(/^[A-Za-z0-9]*$/, 'Password is not valid, must contain only letters and numbers.'),
    confirmedPassword: Yup.string()
      .min(5, 'Password must be ${min} characters long or higher.')
      .matches(/^[A-Za-z0-9]*$/, 'Password is not valid, must contain only letters and numbers.')
  }),
  registerPerson: Yup.object().shape({
    firstName: Yup.string()
      .nullable()
      .required('Please provide your first name.'),
    lastName: Yup.string()
      .nullable()
      .required('Please provide your last name.'),
    gender: Yup.string()
      .oneOf(['GENDER_MALE', 'GENDER_FEMALE']),
    birthDate: Yup.date(),
    mobilePhone: Yup.string()
      .nullable()
      .matches(/^([\(]{0,1}[\+]{0,1}[\(]{0,1}([3][8][1]){0,1}[\)]{0,1}[- \.\/]{0,1}[\(]{0,1}[0]{0,1}[\)]{0,1}[6]{1,1}([0-6]|[9]){1,1}[\)]{0,1}[- \.\/]{0,1}(([0-9]{6,7})|([0-9]{2,3}[- \\.\\/]{0,1}[0-9]{2,4}[- \\.\\/]{0,1}[0-9]{0,3})))$/,
        { message: 'Mobile phone number is not valid.', excludeEmptyString: true })
      .required('Phone number must be provided.'),
    email: Yup.string()
      .nullable()
      .max(50, 'E-mail must be maximum ${max} characters long.')
      .required('E-mail must be provided.')
      .matches(/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/, 'Email is not valid.'),
    city: Yup.string()
      .nullable()
      .matches(/^[A-Za-z\s]{2,}$/, 'City name is not valid.')
      .required('City must be provided.'),
    country: Yup.string()
      .matches(/^[A-Za-z\s]{2,}$/, 'Country name is not valid.'),
    iso2Code: Yup.string()
      .matches(/^[A-Za-z]{2,3}$/, 'ISO2 code is not valid.'),
    countryRegion: Yup.string()
      .matches(/^[A-Za-zĆćČčĐđŠšŽž\.\s]{0,}$/, 'Country region name is not valid.'),
    longitude: Yup.number()
      .min(-180, 'Longitude  must be ${min} or higher!')
      .max(180, 'Longitude must be ${max} or lower!'),
    latitude: Yup.number()
      .min(-90, 'Latitude  must be ${min} or higher!')
      .max(90, 'Latitude must be ${max} or lower!'),
    about: Yup.string()
      .max(255, 'About must be maximum ${max} characters long.'),
    rating: Yup.number()
      .min(0).max(5),
    numberOfRatings: Yup.number().min(0),
    username: Yup.string()
      .nullable()
      .required('Username must be provided.')
      .min(5, 'Username must be at least ${min} characters long.')
      .max(20, 'Username must be at most ${max} characters long.'),
    accessRole: Yup.string()
      .nullable()
      .required('User role must be provided.')
      .oneOf(['ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST'], 'Role is not valid, must be ROLE_ADMIN, ROLE_USER or ROLE_GUEST"'),
    password: Yup.string()
      .nullable()
      .required('Password must be provided.')
      // .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{5,}/, 'Password is not valid, must contain at least 1 upper case letter, 1 lower case letter and 1 digit, no whitespace allowed.')
      .matches(/^[A-Za-z0-9]*$/, 'Password is not valid, must contain only letters and numbers.'),
    confirmedPassword: Yup.string()
      .min(5, 'Password must be ${min} characters long or higher.')
      .matches(/^[A-Za-z0-9]*$/, 'Password is not valid, must contain only letters and numbers.')
  }),
  registerAccount: Yup.object().shape({
    username: Yup.string()
      .nullable()
      .required('Username must be provided.')
      .min(5, 'Username must be at least ${min} characters long.')
      .max(20, 'Username must be at most ${max} characters long.'),
    accessRole: Yup.string()
      .nullable()
      .required('User role must be provided.')
      .oneOf(['ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUEST'], 'Role is not valid, must be ROLE_ADMIN, ROLE_USER or ROLE_GUEST"'),
    password: Yup.string()
      .nullable()
      .required('Password must be provided.')
      // .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{5,}/, 'Password is not valid, must contain at least 1 upper case letter, 1 lower case letter and 1 digit, no whitespace allowed.')
      .matches(/^[A-Za-z0-9]*$/, 'Password is not valid, must contain only letters and numbers.'),
    confirmedPassword: Yup.string()
      .min(5, 'Password must be ${min} characters long or higher.')
      .matches(/^[A-Za-z0-9]*$/, 'Password is not valid, must contain only letters and numbers.')
  }),
  registerJobType: Yup.object().shape({
    jobTypeName: Yup.string()
      .nullable()
      .required('Job type name must be provided.')
      .matches(/^[A-Za-z]{2,}$/, 'Job type name is not valid.'),
  }),
  registerCity: Yup.object().shape({
    city: Yup.string()
      .nullable()
      .matches(/^[A-Za-z\s]{2,}$/, 'City name is not valid.')
      .required('City must be provided.'),
    country: Yup.string()
      .matches(/^[A-Za-z\s]{2,}$/, 'Country name is not valid.'),
    iso2Code: Yup.string()
      .matches(/^[A-Za-z]{2,3}$/, 'ISO2 code is not valid.'),
    countryRegion: Yup.string()
      .matches(/^[A-Za-zĆćČčĐđŠšŽž\.\s]{0,}$/, 'Country region name is not valid.'),
    longitude: Yup.number()
      .min(-180, 'Longitude  must be ${min} or higher!')
      .max(180, 'Longitude must be ${max} or lower!'),
    latitude: Yup.number()
      .min(-90, 'Latitude  must be ${min} or higher!')
      .max(90, 'Latitude must be ${max} or lower!'),
  }),
  registerSeek: Yup.object().shape({
    employee: Yup.object()
      .nullable()
      .required('Employee must be provided.'),
    city: Yup.string()
      .nullable()
      .matches(/^[A-Za-z\s]{2,}$/, 'City name is not valid.')
      .required('City must be provided.'),
    country: Yup.string()
      .matches(/^[A-Za-z\s]{2,}$/, 'Country name is not valid.'),
    iso2Code: Yup.string()
      .matches(/^[A-Za-z]{2,3}$/, 'ISO2 code is not valid.'),
    countryRegion: Yup.string()
      .matches(/^[A-Za-zĆćČčĐđŠšŽž\.\s]{0,}$/, 'Country region name is not valid.'),
    longitude: Yup.number()
      .min(-180, 'Longitude  must be ${min} or higher!')
      .max(180, 'Longitude must be ${max} or lower!'),
    latitude: Yup.number()
      .min(-90, 'Latitude  must be ${min} or higher!')
      .max(90, 'Latitude must be ${max} or lower!'),
    beginningDate: Yup.date()
      .nullable()
      .required('Beginning date must be provided.'),
    jobType: Yup.object()
      .nullable()
      .required('Job type must be provided.'),
    listJobDayHoursPostDto: Yup.array(),
    distanceToJob: Yup.number()
      .required('Distance to job must be provided.')
      .min(0, 'Distance to job must be ${min} or higher!'),
    endDate: Yup.date()
      .nullable()
      .required('End date must be provided.'),
    flexibileDates: Yup.boolean(),
    flexibileDays: Yup.boolean(),
    detailsLink: Yup.string()
      .nullable()
      .matches(/^.{0,255}$/, 'Details must be 255 characters or lower!.')
      .required('Details must be provided.'),
    price: Yup.number()
      .nullable()
      .required('Price must be provided.')
      .min(0, 'Price must be ${min} or higher!'),
  }),
  registerOffer: Yup.object().shape({
    employer: Yup.object()
      .nullable()
      .required('Employer must be provided.'),
    city: Yup.string()
      .nullable()
      .matches(/^[A-Za-z\s]{2,}$/, 'City name is not valid.')
      .required('City must be provided.'),
    country: Yup.string()
      .matches(/^[A-Za-z\s]{2,}$/, 'Country name is not valid.'),
    iso2Code: Yup.string()
      .matches(/^[A-Za-z]{2,3}$/, 'ISO2 code is not valid.'),
    countryRegion: Yup.string()
      .matches(/^[A-Za-zĆćČčĐđŠšŽž\.\s]{0,}$/, 'Country region name is not valid.'),
    longitude: Yup.number()
      .min(-180, 'Longitude  must be ${min} or higher!')
      .max(180, 'Longitude must be ${max} or lower!'),
    latitude: Yup.number()
      .min(-90, 'Latitude  must be ${min} or higher!')
      .max(90, 'Latitude must be ${max} or lower!'),
    beginningDate: Yup.date()
      .nullable()
      .required('Beginning date must be provided.'),
    jobType: Yup.object()
      .nullable()
      .required('Job type must be provided.'),
    listJobDayHoursPostDto: Yup.array(),
    numberOfEmployees: Yup.number()
      .nullable()
      .required('Number of employees must be provided.')
      .min(1, 'Number of employees must be ${min} or higher!'),
    endDate: Yup.date()
      .nullable() 
      .required('End date must be provided.'),
    flexibileDates: Yup.boolean(),
    flexibileDays: Yup.boolean(),
    detailsLink: Yup.string()
      .nullable()
      .matches(/^.{0,255}$/, 'Details must be 255 characters or lower!.')
      .required('Details must be provided.'),
    price: Yup.number()
      .nullable()
      .required('Price must be provided.')
      .min(0, 'Price must be ${min} or higher!'),
  }),
  registerJobType: Yup.object().shape({
    jobTypeName: Yup.string()
      .nullable()
      .matches(/^[_A-Za-z0-9-]{2,}$/, 'Job type name is not valid.')
      .required('Job type name must be provided.'),
  })
};

export default schemas;