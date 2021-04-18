import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from './components/Table';
import Dropdown from './components/Dropdown';
const { PureComponent } = React;
const DepartmentName = "Department"
const DesignationName = "Designation"
const DeptName = [
  {
    name: "HR",
    value: "HR",
  },
  {
    name: "Development",
    value: "Development",
  },
  {
    name: "Accounts",
    value: "Accounts",
  },
  {
    name: "IT services",
    value: "IT services",
  },
];
const Designation = [
  {
    name: "Manager",
    value: "Manager",
  },
  {
    name: "Lead",
    value: "Lead",
  },
];
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const DisableAction = (props) => {


  return (
    <div>
      <Checkbox value="ds" color="primary" onChange={(event) => props.disableActionButton(event)} />
      Disabled Delete option.
    </div>
  );
};


const Form = ({ formState, onChange, onSubmit, errors }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="12xs">
      <CssBaseline />
      <div className={classes.paper}>

        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="employeeno"
                variant="outlined"
                required
                fullWidth
                id="employeeno"
                label="Employee No"
                value={formState.employeeno}
                onChange={onChange}
                autoFocus
              />
              {<span className='error'>{errors.employeeno}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="employeename"
                label="Employee Name"
                name="employeename"
                autoComplete="lname"
                value={formState.employeename}
                onChange={onChange}
              />
              {<span className='error'>{errors.employeename}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="salary"
                label="Salary"
                name="salary"
                autoComplete="salary"
                value={formState.salary}
                onChange={onChange}
              />
              {<span className='error'>{errors.salary}</span>}
            </Grid>
            <Grid item xs={12}>
              {<Dropdown
                items={DeptName}
                deptmentname={DepartmentName}
                onChange={onChange}
              />}
              {<span className='error'>{errors.department}</span>}
            </Grid>
            <Grid item xs={12}>
              {<Dropdown
                items={Designation}
                deptmentname={DesignationName}
                onChange={onChange}
              />}
              {<span className='error'>{errors.designation}</span>}
            </Grid>

          </Grid>
          <Button
            type="submit"
            smallWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>

        </form>
      </div>
    </Container>
  )
}
const validEmailRegex = RegExp(
  /^[a-zA-Z\s]*$/
);

const validateNumericRegex = RegExp(
  /^\d+$/
);

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "salary",
      pageSizeTab: "5",
      disabledAction: false,
      formState: {
        id: '',
        employeeno: "",
        employeename: "",
        salary: "",
        department: "",
        designation: "",
        mode: "submit"
      },

      errors: {
        employeeno: '',
        employeename: '',
        salary: '',
        department: '',
        designation: '',
      },

      users: [],
    };

  };

  resetFormState = () => {

    this.setState({

      formState: {
        employeeno: "",
        employeename: "",
        salary: "",
        department: "",
        designation: "",
        mode: "submit",
        id: ""
      }

    });

  };
  onPageSizeChange = event => {
    console.log(event.target.value);
    this.setState({ pageSizeTab: event.target.value });
  };

  disableActionButton = event => {
    console.log(event.target.checked);
    this.setState({ disabledAction: event.target.checked });
    console.log(this.state.disabledAction);
  }
  onDepartmentChange = event => {
    event.preventDefault();
    let colName = event.target.value;
    let myData = [];
    if (colName == 'salary') {
      myData = [].concat(this.state.users)
        .sort((a, b) => a.salary > b.salary ? 1 : -1)
    }
    else if (colName == 'employeeno') {
      myData = [].concat(this.state.users)
        .sort((a, b) => a.employeeno > b.employeeno ? 1 : -1)
    }
    else if (colName == 'employeename') {
      myData = [].concat(this.state.users)
        .sort((a, b) => a.employeename > b.employeename ? 1 : -1)
    }
    else if (colName == 'department') {
      myData = [].concat(this.state.users)
        .sort((a, b) => a.department > b.department ? 1 : -1)
    }
    else if (colName == 'designation') {
      myData = [].concat(this.state.users)
        .sort((a, b) => a.designation > b.designation ? 1 : -1)
    }
    else {
      myData = [].concat(this.state.users)
        .sort((a, b) => a.employeeno > b.employeeno ? 1 : -1)
    }
    this.setState({ users: myData });
  };

  onChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let err = '';
    switch (name) {
      case 'employeeno':
        err = validateNumericRegex.test(value) ? '' : 'Employee number accept only numeric value';
        break;

      case 'employeename': err = validEmailRegex.test(value) ? '' : 'Employee Name is not valid!';
        break;

      case 'salary': err = validateNumericRegex.test(value) ? '' : 'Salary is not valid!';
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: err });
    this.setState({
      formState: {
        ...this.state.formState,
        [event.target.name]: event.target.value
      }
    });
  };

  onPage = () => {

    this.setState({ pageSizeTab: "25" });

  }

  onSubmit = event => {
    console.log("submit button pressed");
    const { users, formState, errors } = this.state;

    event.preventDefault();

    const employeeno = event.target.querySelector("input[name='employeeno']").value;

    const employeename = event.target.querySelector("input[name='employeename']").value;

    const salary = event.target.querySelector("input[name='salary']").value;
    const department = event.target.querySelector("select[name='Department']").value;
    const designation = event.target.querySelector("select[name='Designation']").value;
    const action = '';
    if (employeeno == '') {

      this.setState({ errors, employeeno: 'Employee number cannot be blank' });
      return;

    }
    if (employeename == '') {

      this.setState({ errors, employeename: 'Employee name cannot be blank' });
      return;

    }
    if (salary == '') {

      this.setState({ errors, salary: 'salary cannot be blank' });
      return;

    }
    if (department == '') {
      this.setState({ errors, department: 'Department number cannot be blank' });
      return;
    }
    if (designation == '') {

      this.setState({ errors, designation: 'Designation cannot be blank' });
      return;

    }

    console.log(employeeno + " " + employeename + " " + salary);
    if (formState.mode === "submit") {
      let rowId = 0;
      if (this.state.users.length == 0) {
        rowId = 1;
      } else {
        rowId = this.state.users[this.state.users.length - 1].id + 1;
      }
      this.setState({

        users: [

          ...this.state.users,

          {

            employeeno,
            employeename,
            salary,
            department,
            designation,
            action,
            updating: false,
            action: '',
            id: rowId

          }

        ]

      });
      console.log(this.state.users);
    }



    this.resetFormState();

  };



  updateUser = key => {

    let { users } = this.state;

    users[key].updating = true;



    this.setState({

      formState: { ...this.state.users[key], mode: "edit" },

      users

    });

  };



  deleteUser = key => {

    const items = this.state.users.filter(item => item.id !== key);
    this.setState({ users: items });

  };
  render() {
    const { users, formState, pageSizeTab, disabledAction } = this.state;


    return (

      <Container component="main" maxWidth="12xs">
        <Container component="main" maxWidth="xs">
          <Form
            formState={formState}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            errors={this.state}
          />
        </Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper>
              <DisableAction
                disableActionButton={this.disableActionButton}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper fullwidth>
              <NativeSelect
                onChange={this.onDepartmentChange} item xs={12} >
                <option value=""> select column for sorting</option>
                <option value="employeeno">Employee No</option>
                <option value="employeename">Employee Name</option>
                <option value="salary">Salary</option>
                <option value="department">Department</option>
                <option value="designation">Designation</option>
              </NativeSelect>
            </Paper>
          </Grid>
        </Grid>


        

        <Table
          users={users}
          updateUser={this.handleInputChange}
          deleteUser={this.deleteUser}
          pageSizeTab={pageSizeTab}
          disabledAction={disabledAction}
        />
      </Container>

    );
  }
}