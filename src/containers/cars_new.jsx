import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createCar } from '../actions';

class CarsNew extends Component {
	onSubmit = (values) => {
    this.props.createCar(values, (car) => {
      this.props.history.push('/');
      return car;
    }, this.props.garage);
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input  className="form-control"
                type={field.type}
          {...field.input}
        />
      </div>
    );
  }
	render() {
		return(
			<div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            label="Title"
            name="title"
            type="text"
            component={this.renderField}
          />
          <label htmlFor="content">Content</label>
          <Field
            className="form-control"
            label="Content"
            name="content"
            component="textarea"
            rows="8"
          />
          <button className="btn btn-primary"
                  type="submit"
                  disabled={this.props.pristine || this.props.submitting}>
            Create Car
          </button>
        </form>
      </div>
		)
	}
}

function mapStateToProps(state) {
  return { 
    garage: state.garage,
  };
}

export default reduxForm({ form: 'newCarForm' })(
  connect(mapStateToProps, { createCar })(CarsNew)
);