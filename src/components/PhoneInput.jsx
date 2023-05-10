// import React from "react";
// import ReactPhoneInput from "react-phone-input-material-ui";
// import { TextField } from "@mui/material";
// import { withStyles } from "@mui/styles";

// const styles = (theme) => ({
//   field: {
//     margin: "10px 0",
//   },
//   countryList: {
//     ...theme.typography.body1,
//   },
// });

// const PhoneField = (props) => {
//   const { value, defaultCountry, onChange, classes } = props;

//   return (
//     <React.Fragment>
//       {/* Simple usage */}
//       <ReactPhoneInput
//         value={value}
//         onChange={onChange} // passed function receives the phone value
//         component={TextField}
//       />

//       {/* Configure more */}
//       <ReactPhoneInput
//         value={value}
//         defaultCountry={defaultCountry || "gb"}
//         onChange={onChange}
//         inputClass={classes.field}
//         dropdownClass={classes.countryList}
//         component={TextField}
//       />
//     </React.Fragment>
//   );
// };

// export default withStyles(styles)(PhoneField);
